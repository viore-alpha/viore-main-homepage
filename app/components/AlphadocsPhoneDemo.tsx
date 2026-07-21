/* eslint-disable @next/next/no-img-element -- The community photograph is an authored demo asset with fixed crop behavior. */
"use client";

import { useEffect, useRef, useState } from "react";
import type { Language } from "@/app/site-content";

const communityCopy = {
  ko: {
    aria: "아이폰 안에서 사진 글과 익명 대화, 투표가 이어지는 알파닥스 커뮤니티 데모",
    filter: "핫 포스트",
    panel: "알파닥스",
    posts: {
      photo: {
        author: "새벽두시라떼",
        time: "7분",
        body: "내일 컨퍼런스 전에 흉통 프로토콜 다시 보는 중입니다. 저희는 0/1시간 경로로 바꿨는데, 야간에도 그대로 적용하시나요?",
        likes: "24",
        comments: "11",
      },
      text: {
        author: "개원한지2년",
        time: "13분",
        body: "직원 면담을 월 1회로 잡아봤는데 생각보다 할 이야기가 많네요. 원장님들은 정기 면담을 따로 하시나요?",
        replyAuthor: "동네소아과",
        reply: "저희는 분기마다 해요. 대신 면담 전에 질문 두 개만 미리 받습니다.",
        reply2Author: "문서정리중",
        reply2: "면담 뒤에 합의한 한 가지만 적어두니 다음 대화가 훨씬 수월했습니다.",
        likes: "18",
        comments: "9",
      },
      poll: {
        author: "로딩중인전공의",
        time: "21분",
        body: "수련병원 고를 때 결국 제일 크게 본 건 뭐였나요? 후배가 물어보는데 하나만 고르라니 어렵네요.",
        question: "내 선택을 가장 많이 바꾼 조건은?",
        total: "90명",
        options: [
          ["교육 분위기", "42% · 38", "42%"],
          ["당직 강도", "31% · 28", "31%"],
          ["급여·복지", "17% · 15", "17%"],
          ["지역", "10% · 9", "10%"],
        ],
        likes: "31",
        comments: "26",
      },
      last: {
        author: "청진기두고옴",
        time: "32분",
        body: "오늘 외래 끝나고 다들 뭐 드시나요. 10분 안에 먹고 다시 들어가야 합니다.",
        likes: "7",
        comments: "14",
      },
    },
  },
  en: {
    aria: "An iPhone demo of the AlphaDocs community moving through photo posts, anonymous conversations, and a poll",
    filter: "Hot posts",
    panel: "AlphaDocs",
    posts: {
      photo: {
        author: "LatteAt2AM",
        time: "7m",
        body: "Reviewing our chest-pain protocol before tomorrow's conference. We moved to a 0/1-hour pathway—do you keep it unchanged overnight?",
        likes: "24",
        comments: "11",
      },
      text: {
        author: "ClinicYearTwo",
        time: "13m",
        body: "Monthly staff check-ins are bringing up far more than I expected. Do other clinic owners schedule regular one-on-ones?",
        replyAuthor: "NeighborhoodPeds",
        reply: "We meet quarterly and collect two questions in advance.",
        reply2Author: "ClosingCharts",
        reply2: "Writing down one agreed action made the next conversation much easier.",
        likes: "18",
        comments: "9",
      },
      poll: {
        author: "ResidentLoading",
        time: "21m",
        body: "What ultimately mattered most when you chose a training hospital? A junior asked me to pick just one.",
        question: "What changed your decision most?",
        total: "90 votes",
        options: [
          ["Teaching culture", "42% · 38", "42%"],
          ["Call intensity", "31% · 28", "31%"],
          ["Pay and benefits", "17% · 15", "17%"],
          ["Location", "10% · 9", "10%"],
        ],
        likes: "31",
        comments: "26",
      },
      last: {
        author: "LeftMyStethoscope",
        time: "32m",
        body: "What is everyone eating after clinic today? I have ten minutes before I need to go back in.",
        likes: "7",
        comments: "14",
      },
    },
  },
} as const;

function PostHeader({ author, time }: { author: string; time: string }) {
  return (
    <div className="ap-community-post-head">
      <span><strong>{author}</strong><small>· {time}</small></span>
      <i>•••</i>
    </div>
  );
}

function PostActions({ likes, comments, animated = false }: { likes: string; comments: string; animated?: boolean }) {
  return (
    <div className="ap-community-actions">
      <span className={animated ? "ap-community-like is-animated" : "ap-community-like"}><i className="ap-action-heart" /><b>{likes}</b></span>
      <span><i className="ap-action-dislike" /><b>0</b></span>
      <span><i className="ap-action-comment" /><b>{comments}</b></span>
      <span className="ap-community-save"><i className="ap-action-bookmark" /></span>
    </div>
  );
}

export function AlphadocsPhoneDemo({ language }: { language: Language }) {
  const copy = communityCopy[language];
  const rootRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting),
      { threshold: 0.24 },
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  const { photo, text, poll, last } = copy.posts;

  return (
    <div
      ref={rootRef}
      className={`ap-alphadocs-demo ${playing && !reducedMotion ? "is-playing" : ""} ${reducedMotion ? "is-reduced" : ""}`}
      role="img"
      aria-label={copy.aria}
    >
      <div className="ap-community-aura" aria-hidden="true" />
      <div className="ap-alphadocs-phone" aria-hidden="true">
        <span className="ap-phone-side ap-phone-side--left-one" />
        <span className="ap-phone-side ap-phone-side--left-two" />
        <span className="ap-phone-side ap-phone-side--right" />

        <div className="ap-phone-screen">
          <div className="ap-phone-status">
            <strong>9:41</strong>
            <div>
              <span className="ap-phone-signal"><i /><i /><i /><i /></span>
              <span className="ap-phone-wifi">◒</span>
              <span className="ap-phone-battery"><i /></span>
            </div>
          </div>
          <span className="ap-phone-island" />

          <div className="ap-community-panel-switcher">
            <img src="https://www.alphadoc.ai/brand/feature-icons/panel/news/logo.svg" alt="" />
            <img src="https://www.alphadoc.ai/brand/feature-icons/panel/literature/logo.svg" alt="" />
            <img src="https://www.alphadoc.ai/brand/feature-icons/panel/community/logo.svg" alt="" />
            <strong>{copy.panel}</strong>
          </div>

          <div className="ap-community-topbar">
            <span />
            <strong>🔥 {copy.filter}<i>⌄</i></strong>
            <span className="ap-community-search">🔍</span>
          </div>

          <div className="ap-community-viewport">
            <div className="ap-community-feed-track">
              <article className="ap-community-post ap-community-text-post">
                <PostHeader author={text.author} time={text.time} />
                <p>{text.body}</p>
                <div className="ap-community-replies">
                  <p><strong>{text.replyAuthor}</strong><span>{text.reply}</span></p>
                  <p><strong>{text.reply2Author}</strong><span>{text.reply2}</span></p>
                </div>
                <PostActions likes={text.likes} comments={text.comments} />
              </article>

              <article className="ap-community-post ap-community-photo-post">
                <PostHeader author={photo.author} time={photo.time} />
                <p>{photo.body}</p>
                <img
                  src="/assets/product/alphadoc/generated/community-chest-pain-handoff.jpg"
                  alt=""
                  width="1120"
                  height="840"
                  loading="lazy"
                />
                <PostActions likes={photo.likes} comments={photo.comments} animated />
              </article>

              <article className="ap-community-post ap-community-poll-post">
                <PostHeader author={poll.author} time={poll.time} />
                <p>{poll.body}</p>
                <div className="ap-community-poll">
                  <header><strong>{poll.question}</strong><span>▥ {poll.total}</span></header>
                  <div>
                    {poll.options.map(([label, value, width], index) => (
                      <div className={index === 0 ? "ap-community-poll-option is-selected" : "ap-community-poll-option"} key={label}>
                        <i style={{ width }} />
                        <span>{label}</span>
                        <b>{index === 0 ? "✓ " : ""}{value}</b>
                      </div>
                    ))}
                  </div>
                </div>
                <PostActions likes={poll.likes} comments={poll.comments} />
              </article>

              <article className="ap-community-post ap-community-last-post">
                <PostHeader author={last.author} time={last.time} />
                <p>{last.body}</p>
                <PostActions likes={last.likes} comments={last.comments} />
              </article>
            </div>
          </div>

          <nav className="ap-community-bottom-nav">
            <span className="is-active">🏠</span>
            <span>✉️</span>
            <span>✏️</span>
            <span>❤️</span>
            <span>👤</span>
          </nav>
          <span className="ap-community-touch" />
          <span className="ap-phone-home-indicator" />
        </div>
      </div>
    </div>
  );
}
