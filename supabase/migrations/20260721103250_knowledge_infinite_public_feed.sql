create table public.viore_knowledge_public_papers (
  paper_id uuid primary key,
  published_date date not null,
  title text not null,
  title_ko text,
  brief text not null,
  brief_kind text not null,
  authors text[] not null default array[]::text[],
  author_count integer not null default 0,
  journal text,
  published_year integer not null,
  source text not null,
  scope text not null,
  href text not null,
  data_as_of timestamptz not null,
  refreshed_at timestamptz not null,
  constraint viore_knowledge_public_papers_title_length
    check (char_length(title) between 8 and 500),
  constraint viore_knowledge_public_papers_title_ko_length
    check (title_ko is null or char_length(title_ko) between 1 and 500),
  constraint viore_knowledge_public_papers_brief_length
    check (char_length(brief) between 20 and 500),
  constraint viore_knowledge_public_papers_brief_korean
    check (brief ~ '[가-힣]'),
  constraint viore_knowledge_public_papers_brief_kind
    check (brief_kind in ('generated', 'abstract')),
  constraint viore_knowledge_public_papers_authors
    check (cardinality(authors) <= 3),
  constraint viore_knowledge_public_papers_author_count
    check (author_count >= cardinality(authors)),
  constraint viore_knowledge_public_papers_journal_length
    check (journal is null or char_length(journal) between 1 and 300),
  constraint viore_knowledge_public_papers_published_year
    check (published_year between 1800 and 2100),
  constraint viore_knowledge_public_papers_source
    check (source in (
      'kci',
      'pubmed',
      'pmc',
      'europepmc',
      'kmbase_publicdata',
      'kamje',
      'doaj',
      'medrxiv',
      'manual'
    )),
  constraint viore_knowledge_public_papers_scope
    check (scope in ('domestic', 'overseas')),
  constraint viore_knowledge_public_papers_https_href
    check (href ~ '^https://[^[:space:]]+$' and char_length(href) <= 2048)
);

comment on table public.viore_knowledge_public_papers is
  'Read-only, license-filtered literature feed for the public Viore Knowledge page.';

create index viore_knowledge_public_papers_all_page_idx
  on public.viore_knowledge_public_papers (published_date desc, paper_id desc);

create index viore_knowledge_public_papers_scope_page_idx
  on public.viore_knowledge_public_papers (scope, published_date desc, paper_id desc);

alter table public.viore_knowledge_public_papers enable row level security;

revoke all on table public.viore_knowledge_public_papers from public, anon, authenticated;
grant select on table public.viore_knowledge_public_papers to anon, authenticated;

create policy "Public can read curated Knowledge papers"
  on public.viore_knowledge_public_papers
  for select
  to anon, authenticated
  using (true);

create or replace function private.viore_knowledge_excerpt(source_text text)
returns text
language plpgsql
immutable
strict
set search_path = ''
as $$
declare
  cleaned text;
  clipped text;
  sentence text;
begin
  cleaned := regexp_replace(source_text, '<[^>]+>', ' ', 'g');
  cleaned := replace(cleaned, '&nbsp;', ' ');
  cleaned := replace(cleaned, '&amp;', '&');
  cleaned := replace(cleaned, '&lt;', '<');
  cleaned := replace(cleaned, '&gt;', '>');
  cleaned := regexp_replace(cleaned, '[[:space:]]+', ' ', 'g');
  cleaned := trim(cleaned);

  if char_length(cleaned) <= 480 then
    return cleaned;
  end if;

  clipped := left(cleaned, 480);
  sentence := substring(clipped from '^(.{180,}[.!?。！？])');
  if sentence is not null then
    return trim(sentence);
  end if;

  clipped := regexp_replace(left(cleaned, 476), '[[:space:]][^[:space:]]*$', '');
  if char_length(clipped) < 180 then
    clipped := left(cleaned, 476);
  end if;
  return rtrim(clipped) || '…';
end;
$$;

create or replace function private.viore_knowledge_abstract_allowed(license_value text)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select not (
    lower(coalesce(license_value, '')) like '%-nc%'
    or lower(coalesce(license_value, '')) like '%non-commercial%'
    or lower(coalesce(license_value, '')) like '%noncommercial%'
    or coalesce(license_value, '') like '%비영리%'
    or lower(coalesce(license_value, '')) like '%blocked%'
    or lower(coalesce(license_value, '')) like '%takedown%'
    or lower(coalesce(license_value, '')) like '%no-redistribution%'
    or lower(coalesce(license_value, '')) like '%no redistribution%'
    or lower(coalesce(license_value, '')) like '%all-rights-reserved%'
    or lower(coalesce(license_value, '')) like '%all rights reserved%'
  );
$$;

create or replace function private.refresh_viore_knowledge_public_papers()
returns void
language plpgsql
security definer
set search_path = ''
set statement_timeout = '180s'
as $$
begin
  delete from public.viore_knowledge_public_papers;

  insert into public.viore_knowledge_public_papers (
    paper_id,
    published_date,
    title,
    title_ko,
    brief,
    brief_kind,
    authors,
    author_count,
    journal,
    published_year,
    source,
    scope,
    href,
    data_as_of,
    refreshed_at
  )
  with latest_ready_summary as (
    select distinct on (summary.document_id)
      summary.document_id,
      summary.card_summary,
      summary.updated_at as summary_updated_at
    from public.document_card_summaries as summary
    where summary.document_kind = 'paper'
      and summary.status = 'ready'
      and summary.license_tier in ('safe_open', 'metadata_only')
    order by summary.document_id, summary.updated_at desc
  ), prepared as (
    select
      paper.id as paper_id,
      paper.published_date,
      trim(paper.title) as title,
      left(nullif(trim(paper.title_ko), ''), 500) as title_ko,
      case
        when char_length(trim(summary.card_summary)) between 60 and 4000
          and left(summary.card_summary, 240) ~ '[가-힣]'
          and summary.card_summary not ilike '%준비 중%'
          then summary.card_summary
        when private.viore_knowledge_abstract_allowed(paper.license)
          and nullif(trim(paper.abstract_ko), '') is not null
          and paper.abstract_ko ~ '[가-힣]'
          then paper.abstract_ko
        when private.viore_knowledge_abstract_allowed(paper.license)
          and nullif(trim(paper.abstract), '') is not null
          and paper.abstract ~ '[가-힣]'
          then paper.abstract
        else null
      end as raw_brief,
      case
        when char_length(trim(summary.card_summary)) between 60 and 4000
          and left(summary.card_summary, 240) ~ '[가-힣]'
          and summary.card_summary not ilike '%준비 중%'
          then 'generated'
        else 'abstract'
      end as brief_kind,
      coalesce(
        array(
          select left(trim(author_name), 200)
          from unnest(coalesce(paper.authors[1:3], array[]::text[]))
            with ordinality as listed_author(author_name, author_order)
          where nullif(trim(author_name), '') is not null
          order by author_order
        ),
        array[]::text[]
      ) as authors,
      coalesce(cardinality(paper.authors), 0) as author_count,
      left(nullif(trim(paper.journal), ''), 300) as journal,
      extract(year from paper.published_date)::integer as published_year,
      paper.source,
      case
        when paper.source in ('kci', 'kmbase_publicdata', 'kamje')
          or paper.language in ('ko', 'kor')
          or nullif(trim(paper.title_ko), '') is not null
          then 'domestic'
        else 'overseas'
      end as scope,
      case
        when paper.source_url ~ '^https://[^[:space:]]+$' then paper.source_url
        when paper.pmid ~ '^[0-9]+$' then 'https://pubmed.ncbi.nlm.nih.gov/' || paper.pmid || '/'
        when paper.pmcid ~ '^PMC[0-9]+$' then 'https://pmc.ncbi.nlm.nih.gov/articles/' || paper.pmcid || '/'
        when paper.doi is not null and paper.doi !~ '[[:space:]]' then 'https://doi.org/' || paper.doi
        else null
      end as href,
      lower(
        regexp_replace(
          trim(coalesce(nullif(paper.title_ko, ''), paper.title)),
          '[[:space:]]+',
          ' ',
          'g'
        )
      ) as title_key,
      greatest(
        coalesce(paper.last_synced_at, paper.created_at),
        coalesce(summary.summary_updated_at, 'epoch'::timestamptz)
      ) as data_as_of,
      paper.created_at,
      summary.summary_updated_at
    from public.papers as paper
    left join latest_ready_summary as summary
      on summary.document_id = paper.id
    where paper.source in (
        'kci',
        'pubmed',
        'pmc',
        'europepmc',
        'kmbase_publicdata',
        'kamje',
        'doaj',
        'medrxiv',
        'manual'
      )
      and paper.specialty is not null
      and (
        paper.source <> 'kci'
        or (
          coalesce(paper.subject_area, '') ~ '(의학|내과|외과|간호|치의학|한의학|보건|병리|해부|생리학|재활|작업치료|물리치료|방사선|응급|감염|소아|산부인|정신과|신경|임상|약학|약품학|건강증진|의료|운동.*처방|(^|/)역학($|/))'
          and coalesce(paper.subject_area, '') !~ '(수의학|농학)'
        )
      )
      and coalesce(paper.date_status, 'normal') not in ('future', 'invalid')
      and paper.published_date is not null
      and paper.published_date <= current_date
      and char_length(trim(paper.title)) between 8 and 500
      and lower(paper.title) !~ '(farmyard|manure|cotton|gossypium|armyworm|spodoptera|veterinary|canine|dog breed|alfalfa|wheatgrass|bovine|beef)'
  ), excerpted as (
    select
      prepared.*,
      private.viore_knowledge_excerpt(prepared.raw_brief) as brief
    from prepared
    where prepared.raw_brief is not null
  ), title_ranked as (
    select
      excerpted.*,
      row_number() over (
        partition by title_key
        order by published_date desc, summary_updated_at desc, created_at desc, paper_id desc
      ) as title_rank
    from excerpted
    where href is not null
      and char_length(href) <= 2048
      and char_length(brief) between 60 and 500
      and brief ~ '[가-힣]'
  )
  select
    paper_id,
    published_date,
    title,
    title_ko,
    brief,
    brief_kind,
    authors,
    author_count,
    journal,
    published_year,
    source,
    scope,
    href,
    data_as_of,
    statement_timestamp()
  from title_ranked
  where title_rank = 1;
end;
$$;

revoke all on function private.viore_knowledge_excerpt(text) from public, anon, authenticated;
revoke all on function private.viore_knowledge_abstract_allowed(text) from public, anon, authenticated;
revoke all on function private.refresh_viore_knowledge_public_papers() from public, anon, authenticated;
grant execute on function private.refresh_viore_knowledge_public_papers() to service_role;

create or replace function private.refresh_viore_knowledge_public_snapshot()
returns void
language sql
security definer
set search_path = ''
set statement_timeout = '15s'
as $$
  with scope_ranked as (
    select
      paper.*,
      row_number() over (
        partition by paper.scope
        order by paper.published_date desc, paper.paper_id desc
      ) as scope_rank
    from public.viore_knowledge_public_papers as paper
  ), linked as (
    select *
    from scope_ranked
    where scope_rank <= 24
  ), payload as (
    select
      coalesce(
        jsonb_agg(
          jsonb_build_object(
            'paper_id', paper_id,
            'published_date', published_date,
            'title', title,
            'title_ko', title_ko,
            'brief', brief,
            'authors', to_jsonb(authors),
            'author_count', author_count,
            'journal', journal,
            'published_year', published_year,
            'source', source,
            'is_korean_source', scope = 'domestic',
            'scope', scope,
            'href', href
          )
          order by published_date desc, paper_id desc
        ),
        '[]'::jsonb
      ) as items,
      count(*)::smallint as item_count,
      max(data_as_of) as data_as_of
    from linked
  )
  insert into public.viore_knowledge_public_snapshot (
    singleton,
    schema_version,
    generated_at,
    data_as_of,
    item_count,
    items
  )
  select
    true,
    'knowledge.literature.snapshot.v1',
    statement_timestamp(),
    coalesce(payload.data_as_of, statement_timestamp()),
    payload.item_count,
    payload.items
  from payload
  on conflict (singleton) do update
  set
    schema_version = excluded.schema_version,
    generated_at = excluded.generated_at,
    data_as_of = excluded.data_as_of,
    item_count = excluded.item_count,
    items = excluded.items;
$$;

revoke all on function private.refresh_viore_knowledge_public_snapshot() from public, anon, authenticated;
grant execute on function private.refresh_viore_knowledge_public_snapshot() to service_role;

select private.refresh_viore_knowledge_public_papers();
select private.refresh_viore_knowledge_public_snapshot();

do $$
declare
  existing_job record;
begin
  for existing_job in
    select jobid
    from cron.job
    where jobname = 'viore-knowledge-public-papers-hourly'
  loop
    perform cron.unschedule(existing_job.jobid);
  end loop;

  perform cron.schedule(
    'viore-knowledge-public-papers-hourly',
    '34 * * * *',
    'select private.refresh_viore_knowledge_public_papers()'
  );
end;
$$;
