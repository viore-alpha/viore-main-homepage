import type { CompanyMetric, Language } from "@/app/site-content";

const COMPANY_METRICS_ENDPOINT = process.env.VIORE_COMPANY_METRICS_ENDPOINT ??
  "https://texauplfngpawivaeukr.supabase.co/rest/v1/viore_company_metrics?select=generated_at,rolling_window_days,medical_documents_added_30d,standardized_medical_documents,clinical_guidelines";
const COMPANY_METRICS_PUBLISHABLE_KEY = process.env.VIORE_METRICS_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_luvxrrYk1-G4PvatU1tILg__1r4aRc6";
const COMPANY_METRICS_REVALIDATE_SECONDS = 10 * 60;

type CompanyMetricsRow = {
  generated_at: string;
  rolling_window_days: number;
  medical_documents_added_30d: number;
  standardized_medical_documents: number;
  clinical_guidelines: number;
};

export type CompanyMetricsResult = {
  metrics: CompanyMetric[];
  generatedAt: string | null;
  source: "live" | "snapshot";
};

function isCount(value: unknown): value is number {
  return Number.isSafeInteger(value) && Number(value) >= 0;
}

function parseMetricsRow(value: unknown): CompanyMetricsRow | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Partial<CompanyMetricsRow>;

  if (
    typeof row.generated_at !== "string" ||
    row.rolling_window_days !== 30 ||
    !isCount(row.medical_documents_added_30d) ||
    !isCount(row.standardized_medical_documents) ||
    !isCount(row.clinical_guidelines)
  ) {
    return null;
  }

  return row as CompanyMetricsRow;
}

function ariaLabel(language: Language, kind: CompanyMetric["kind"], value: number) {
  const formatted = new Intl.NumberFormat(language === "ko" ? "ko-KR" : "en-US").format(value);

  if (language === "ko") {
    if (kind === "monthly") return `최근 30일 신규 정규화 의료 문헌 ${formatted}건 이상`;
    if (kind === "documents") return `누적 정규화 의료 문헌 ${formatted}건 이상`;
    return `누적 공개 국내외 가이드라인과 지침 문헌 ${formatted}건 이상`;
  }

  if (kind === "monthly") return `More than ${formatted} medical documents normalized in the last 30 days`;
  if (kind === "documents") return `More than ${formatted} normalized medical documents`;
  return `More than ${formatted} visible Korean and global clinical guidelines`;
}

export function applyCompanyMetricsRow(
  language: Language,
  fallbackMetrics: CompanyMetric[],
  row: CompanyMetricsRow,
): CompanyMetric[] {
  if (fallbackMetrics.length !== 3) return fallbackMetrics;

  const values: Record<CompanyMetric["kind"], number> = {
    monthly: row.medical_documents_added_30d,
    documents: row.standardized_medical_documents,
    guidelines: row.clinical_guidelines,
  };

  return fallbackMetrics.map((metric) => ({
    ...metric,
    value: values[metric.kind],
    ariaLabel: ariaLabel(language, metric.kind, values[metric.kind]),
  }));
}

export async function getCompanyMetrics(
  language: Language,
  fallbackMetrics: CompanyMetric[],
): Promise<CompanyMetricsResult> {
  try {
    const response = await fetch(COMPANY_METRICS_ENDPOINT, {
      headers: {
        apikey: COMPANY_METRICS_PUBLISHABLE_KEY,
      },
      next: { revalidate: COMPANY_METRICS_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`Company metrics request failed with status ${response.status}`);
    }

    const payload: unknown = await response.json();
    const row = Array.isArray(payload) ? parseMetricsRow(payload[0]) : null;
    if (!row) throw new Error("Company metrics response did not match the public contract");

    return {
      metrics: applyCompanyMetricsRow(language, fallbackMetrics, row),
      generatedAt: row.generated_at,
      source: "live",
    };
  } catch (error) {
    console.error("[company-metrics] using verified snapshot fallback", error);
    return {
      metrics: fallbackMetrics,
      generatedAt: null,
      source: "snapshot",
    };
  }
}
