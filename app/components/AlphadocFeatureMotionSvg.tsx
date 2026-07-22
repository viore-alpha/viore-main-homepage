"use client";

import { memo, useId } from "react";
import type { Language } from "@/app/site-content";

const ALPHADOC_ASSET_ROOT = "https://www.alphadoc.ai";
const NOTIFICATION_ICON = `${ALPHADOC_ASSET_ROOT}/brand/feature-icons/header/notification/logo.svg`;

export type AlphadocFeatureId = "papers" | "notices" | "forms" | "translation" | "tools";

interface AlphadocFeatureMotionSvgProps {
  featureId: AlphadocFeatureId;
  icon: string;
  label: string;
  language: Language;
}

const sceneCopy = {
  ko: {
    papers: { query: "SGLT2 심부전", result: "24건의 논문", scope: ["전체", "국내", "해외"] },
    notices: { newItem: "요양급여 세부사항 일부개정", source: "HIRA 공지사항", alert: "새 의료 공지 1건" },
    forms: { query: "입퇴원확인서", selected: "입퇴원확인서", action: "문서 작성 시작", alert: "작성 화면 준비 완료" },
    translation: { file: "discharge-summary.pdf", action: "전체 번역 하기", result: "번역이 완료되었습니다", alert: "번역 완료 알림" },
    tools: { query: "CHA₂DS₂-VASc", result: "Score 3", risk: "High risk" },
  },
  en: {
    papers: { query: "SGLT2 heart failure", result: "24 papers", scope: ["All", "Korea", "Global"] },
    notices: { newItem: "Updated reimbursement criteria", source: "HIRA notices", alert: "1 new medical notice" },
    forms: { query: "Admission certificate", selected: "Admission certificate", action: "Start document", alert: "Document screen ready" },
    translation: { file: "discharge-summary.pdf", action: "Translate document", result: "Translation complete", alert: "Translation notification" },
    tools: { query: "CHA₂DS₂-VASc", result: "Score 3", risk: "High risk" },
  },
} as const;

function MotionCursor({ className }: { className: string }) {
  return (
    <g className={`ap-svg-motion-cursor ${className}`} aria-hidden="true">
      <path
        d="M1.5 1.5v23.2l6.1-5.9 4.2 9.4 5-2.3-4.2-9h8.8Z"
        fill="#171719"
        stroke="#ffffff"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </g>
  );
}

export const AlphadocFeatureMotionSvg = memo(function AlphadocFeatureMotionSvg({ featureId, icon, label, language }: AlphadocFeatureMotionSvgProps) {
  const clipId = `ap-feature-clip-${useId().replaceAll(":", "")}`;
  const copy = sceneCopy[language];
  const featureIcon = `${ALPHADOC_ASSET_ROOT}${icon}`;
  const ariaLabel = language === "ko" ? `${label} 실제 UI 흐름 애니메이션` : `${label} real UI flow animation`;

  return (
    <svg className={`ap-feature-svg ap-feature-svg--${featureId}`} viewBox="0 0 560 360" role="img" aria-label={ariaLabel} preserveAspectRatio="xMidYMid meet">
      <title>{ariaLabel}</title>
      <defs>
        <clipPath id={clipId}><rect width="560" height="360" rx="28" /></clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <rect width="560" height="360" fill="#f5f6f8" />
        <rect x="12" y="12" width="536" height="44" rx="18" fill="#ffffff" stroke="#e7e9ed" />
        <image href={featureIcon} x="26" y="22" width="24" height="24" preserveAspectRatio="xMidYMid meet" />
        <text x="60" y="41" className="ap-svg-title">{label}</text>
        <g className="ap-svg-close" aria-hidden="true">
          <circle cx="526" cy="34" r="13" fill="#f4f5f7" />
          <path d="M522 30l8 8m0-8-8 8" stroke="#8d9299" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {featureId === "papers" ? (
          <g className="ap-svg-scene ap-svg-scene--papers">
            <g className="ap-svg-paper-search">
              <rect x="14" y="13" width="500" height="42" rx="17" fill="#ffffff" />
              <circle cx="34" cy="34" r="7" fill="none" stroke="#69717b" strokeWidth="1.7" />
              <path d="M39 39l5 5" stroke="#69717b" strokeWidth="1.7" strokeLinecap="round" />
              <text x="54" y="39" className="ap-svg-input-text ap-svg-query-text">{copy.papers.query}</text>
              <rect className="ap-svg-typing-caret" x="151" y="26" width="1.5" height="16" rx="1" fill="#2f6edb" />
            </g>

            <g className="ap-svg-paper-scopes">
              <rect x="18" y="70" width="70" height="28" rx="14" fill="#ffffff" stroke="#dfe3e8" />
              <rect className="ap-svg-paper-scope-active" x="18" y="70" width="70" height="28" rx="14" fill="#eef4ff" />
              <text x="53" y="88" textAnchor="middle" className="ap-svg-chip-text">{copy.papers.scope[0]}</text>
              <text x="122" y="88" textAnchor="middle" className="ap-svg-chip-text">{copy.papers.scope[1]}</text>
              <text x="190" y="88" textAnchor="middle" className="ap-svg-chip-text">{copy.papers.scope[2]}</text>
              <text x="528" y="88" textAnchor="end" className="ap-svg-caption">{copy.papers.result}</text>
            </g>

            <g className="ap-svg-paper-grid">
              <g transform="translate(16 110)">
                <g className="ap-svg-paper-card is-match">
                  <rect width="124" height="104" rx="16" fill="#ffffff" stroke="#e6e8ec" />
                  <text x="12" y="20" className="ap-svg-card-date">2026.07.19</text>
                  <text x="12" y="40" className="ap-svg-card-heading">SGLT2 inhibitors</text>
                  <text x="12" y="55" className="ap-svg-card-heading">in heart failure</text>
                  <rect x="12" y="68" width="92" height="5" rx="2.5" fill="#d9dde3" />
                  <rect x="12" y="79" width="72" height="5" rx="2.5" fill="#e4e7eb" />
                  <rect x="12" y="91" width="34" height="7" rx="3.5" fill="#eaf2ff" />
                </g>
              </g>
              <g transform="translate(150 110)">
                <g className="ap-svg-paper-card is-match">
                  <rect width="124" height="104" rx="16" fill="#ffffff" stroke="#e6e8ec" />
                  <text x="12" y="20" className="ap-svg-card-date">2026.07.18</text>
                  <text x="12" y="40" className="ap-svg-card-heading">Outcome evidence</text>
                  <text x="12" y="55" className="ap-svg-card-heading">for HFrEF</text>
                  <rect x="12" y="68" width="96" height="5" rx="2.5" fill="#d9dde3" />
                  <rect x="12" y="79" width="68" height="5" rx="2.5" fill="#e4e7eb" />
                  <rect x="12" y="91" width="38" height="7" rx="3.5" fill="#eaf2ff" />
                </g>
              </g>
              <g transform="translate(284 110)">
                <g className="ap-svg-paper-card is-muted">
                  <rect width="124" height="104" rx="16" fill="#ffffff" stroke="#e6e8ec" />
                  <text x="12" y="20" className="ap-svg-card-date">2026.07.17</text>
                  <text x="12" y="40" className="ap-svg-card-heading">Clinical review</text>
                  <text x="12" y="55" className="ap-svg-card-heading">and biomarkers</text>
                  <rect x="12" y="68" width="88" height="5" rx="2.5" fill="#d9dde3" />
                  <rect x="12" y="79" width="78" height="5" rx="2.5" fill="#e4e7eb" />
                </g>
              </g>
              <g transform="translate(418 110)">
                <g className="ap-svg-paper-card is-muted">
                  <rect width="124" height="104" rx="16" fill="#ffffff" stroke="#e6e8ec" />
                  <text x="12" y="20" className="ap-svg-card-date">2026.07.16</text>
                  <text x="12" y="40" className="ap-svg-card-heading">Long-term care</text>
                  <text x="12" y="55" className="ap-svg-card-heading">cohort study</text>
                  <rect x="12" y="68" width="94" height="5" rx="2.5" fill="#d9dde3" />
                  <rect x="12" y="79" width="64" height="5" rx="2.5" fill="#e4e7eb" />
                </g>
              </g>
              <g transform="translate(16 226)"><g className="ap-svg-paper-card is-lower"><rect width="124" height="96" rx="16" fill="#ffffff" stroke="#e6e8ec" /><rect x="12" y="16" width="54" height="6" rx="3" fill="#d7dbe1" /><rect x="12" y="36" width="96" height="7" rx="3.5" fill="#cfd4da" /><rect x="12" y="50" width="80" height="7" rx="3.5" fill="#dfe3e8" /></g></g>
              <g transform="translate(150 226)"><g className="ap-svg-paper-card is-lower"><rect width="124" height="96" rx="16" fill="#ffffff" stroke="#e6e8ec" /><rect x="12" y="16" width="48" height="6" rx="3" fill="#d7dbe1" /><rect x="12" y="36" width="92" height="7" rx="3.5" fill="#cfd4da" /><rect x="12" y="50" width="72" height="7" rx="3.5" fill="#dfe3e8" /></g></g>
              <g transform="translate(284 226)"><g className="ap-svg-paper-card is-lower"><rect width="124" height="96" rx="16" fill="#ffffff" stroke="#e6e8ec" /><rect x="12" y="16" width="52" height="6" rx="3" fill="#d7dbe1" /><rect x="12" y="36" width="88" height="7" rx="3.5" fill="#cfd4da" /><rect x="12" y="50" width="76" height="7" rx="3.5" fill="#dfe3e8" /></g></g>
              <g transform="translate(418 226)"><g className="ap-svg-paper-card is-lower"><rect width="124" height="96" rx="16" fill="#ffffff" stroke="#e6e8ec" /><rect x="12" y="16" width="50" height="6" rx="3" fill="#d7dbe1" /><rect x="12" y="36" width="90" height="7" rx="3.5" fill="#cfd4da" /><rect x="12" y="50" width="68" height="7" rx="3.5" fill="#dfe3e8" /></g></g>
            </g>
            <MotionCursor className="ap-svg-cursor--papers" />
          </g>
        ) : null}

        {featureId === "notices" ? (
          <g className="ap-svg-scene ap-svg-scene--notices">
            <rect x="14" y="66" width="112" height="280" rx="16" fill="#eef0f3" />
            <text x="28" y="88" className="ap-svg-caption-strong">전체</text><text x="108" y="88" textAnchor="end" className="ap-svg-caption">210</text>
            <rect x="22" y="99" width="96" height="30" rx="11" fill="#ffffff" />
            <text x="30" y="118" className="ap-svg-caption-strong">오늘</text><text x="108" y="118" textAnchor="end" className="ap-svg-caption">8</text>
            <text x="28" y="153" className="ap-svg-caption">저장됨</text><text x="108" y="153" textAnchor="end" className="ap-svg-caption">0</text>
            <text x="28" y="182" className="ap-svg-caption">출처</text>
            <rect x="22" y="194" width="96" height="30" rx="11" fill="#f7f8fa" />
            <text x="30" y="213" className="ap-svg-caption-strong">HIRA</text><text x="108" y="213" textAnchor="end" className="ap-svg-caption">5</text>

            <rect x="136" y="66" width="190" height="280" rx="16" fill="#ffffff" stroke="#e4e7eb" />
            <rect x="148" y="76" width="166" height="32" rx="13" fill="#f4f5f7" />
            <circle cx="162" cy="92" r="5" fill="none" stroke="#8a9098" strokeWidth="1.5" /><path d="M166 96l4 4" stroke="#8a9098" strokeWidth="1.5" />
            <text x="178" y="96" className="ap-svg-caption">출처, 제목, 유형 검색</text>
            <g className="ap-svg-notice-row ap-svg-notice-row--new">
              <rect x="146" y="118" width="170" height="72" rx="13" fill="#edf4ff" />
              <text x="156" y="136" className="ap-svg-card-date">{copy.notices.source}</text>
              <text x="156" y="154" className="ap-svg-card-heading">{copy.notices.newItem}</text>
              <text x="156" y="170" className="ap-svg-card-heading">안내</text>
              <path d="M299 139v13l-5-3-5 3v-13z" fill="none" stroke="#5d6570" strokeWidth="1.4" strokeLinejoin="round" />
            </g>
            <g className="ap-svg-notice-row"><rect x="146" y="196" width="170" height="62" rx="13" fill="#f7f8fa" /><text x="156" y="216" className="ap-svg-card-date">대한신경정신의학회</text><text x="156" y="235" className="ap-svg-card-heading">2026년도 학술행사 안내</text></g>
            <g className="ap-svg-notice-row"><rect x="146" y="264" width="170" height="62" rx="13" fill="#f7f8fa" /><text x="156" y="284" className="ap-svg-card-date">대한병원협회</text><text x="156" y="303" className="ap-svg-card-heading">응급의료 법률 개정안</text></g>

            <g className="ap-svg-notice-detail">
              <rect x="336" y="66" width="210" height="280" rx="16" fill="#ffffff" stroke="#e4e7eb" />
              <rect x="350" y="82" width="54" height="18" rx="9" fill="#eef4ff" />
              <text x="377" y="94" textAnchor="middle" className="ap-svg-badge-text">HIRA</text>
              <text x="350" y="124" className="ap-svg-detail-title">요양급여 세부사항</text>
              <text x="350" y="143" className="ap-svg-detail-title">일부개정 안내</text>
              <rect x="350" y="164" width="172" height="6" rx="3" fill="#d9dde3" /><rect x="350" y="177" width="158" height="6" rx="3" fill="#e2e5e9" /><rect x="350" y="190" width="180" height="6" rx="3" fill="#e2e5e9" /><rect x="350" y="203" width="143" height="6" rx="3" fill="#e2e5e9" />
              <rect x="350" y="226" width="86" height="28" rx="14" fill="#f2f4f6" /><text x="393" y="244" textAnchor="middle" className="ap-svg-chip-text">원문보기 ↗</text>
            </g>
            <g className="ap-svg-notification-toast">
              <rect x="370" y="276" width="154" height="50" rx="18" fill="#ffffff" stroke="#e0e4e9" />
              <image href={NOTIFICATION_ICON} x="382" y="286" width="28" height="28" />
              <text x="418" y="298" className="ap-svg-toast-title">{copy.notices.alert}</text>
              <text x="418" y="313" className="ap-svg-toast-caption">{copy.notices.source}</text>
            </g>
            <MotionCursor className="ap-svg-cursor--notices" />
          </g>
        ) : null}

        {featureId === "forms" ? (
          <g className="ap-svg-scene ap-svg-scene--forms">
            <g className="ap-svg-form-catalog">
              <rect x="18" y="70" width="524" height="36" rx="15" fill="#ffffff" stroke="#e3e6ea" />
              <circle cx="36" cy="88" r="6" fill="none" stroke="#727983" strokeWidth="1.6" /><path d="M40 92l5 5" stroke="#727983" strokeWidth="1.6" />
              <text x="54" y="93" className="ap-svg-input-text ap-svg-query-text">{copy.forms.query}</text>
              <g className="ap-svg-form-grid">
                <g transform="translate(18 120)"><g className="ap-svg-form-card is-selected"><rect width="164" height="82" rx="15" fill="#ffffff" stroke="#dfe3e8" /><rect x="12" y="12" width="34" height="16" rx="8" fill="#eaf2ff" /><text x="29" y="23" textAnchor="middle" className="ap-svg-badge-text">법정</text><text x="12" y="48" className="ap-svg-card-heading">{copy.forms.selected}</text><text x="12" y="65" className="ap-svg-card-date">입원·퇴원 확인</text></g></g>
                <g className="ap-svg-form-card" transform="translate(198 120)"><rect width="164" height="82" rx="15" fill="#ffffff" stroke="#dfe3e8" /><rect x="12" y="12" width="34" height="16" rx="8" fill="#eaf2ff" /><text x="29" y="23" textAnchor="middle" className="ap-svg-badge-text">법정</text><text x="12" y="48" className="ap-svg-card-heading">근로능력평가용</text><text x="12" y="65" className="ap-svg-card-date">진단서</text></g>
                <g className="ap-svg-form-card" transform="translate(378 120)"><rect width="164" height="82" rx="15" fill="#ffffff" stroke="#dfe3e8" /><rect x="12" y="12" width="34" height="16" rx="8" fill="#eaf2ff" /><text x="29" y="23" textAnchor="middle" className="ap-svg-badge-text">법정</text><text x="12" y="48" className="ap-svg-card-heading">사망진단서</text><text x="12" y="65" className="ap-svg-card-date">사망진단서</text></g>
                <g className="ap-svg-form-card" transform="translate(18 214)"><rect width="164" height="82" rx="15" fill="#ffffff" stroke="#dfe3e8" /><text x="12" y="31" className="ap-svg-card-heading">장애 정도 심사용</text><text x="12" y="49" className="ap-svg-card-heading">진단서</text><rect x="116" y="56" width="36" height="16" rx="8" fill="#f0f2f5" /></g>
                <g className="ap-svg-form-card" transform="translate(198 214)"><rect width="164" height="82" rx="15" fill="#ffffff" stroke="#dfe3e8" /><text x="12" y="31" className="ap-svg-card-heading">병무용 진단서</text><rect x="116" y="56" width="36" height="16" rx="8" fill="#f0f2f5" /></g>
                <g className="ap-svg-form-card" transform="translate(378 214)"><rect width="164" height="82" rx="15" fill="#ffffff" stroke="#dfe3e8" /><text x="12" y="31" className="ap-svg-card-heading">상해진단서</text><rect x="116" y="56" width="36" height="16" rx="8" fill="#f0f2f5" /></g>
              </g>
            </g>

            <g className="ap-svg-form-editor">
              <rect x="18" y="70" width="524" height="272" rx="20" fill="#ffffff" stroke="#e1e5e9" />
              <text x="36" y="96" className="ap-svg-detail-title">{copy.forms.selected}</text>
              <text x="36" y="116" className="ap-svg-caption">환자 및 진료 정보를 확인해 주세요.</text>
              <rect x="36" y="132" width="232" height="42" rx="12" fill="#f5f6f8" /><text x="49" y="149" className="ap-svg-card-date">환자명</text><text x="49" y="165" className="ap-svg-card-heading">김알파</text>
              <rect x="282" y="132" width="242" height="42" rx="12" fill="#f5f6f8" /><text x="295" y="149" className="ap-svg-card-date">진료과</text><text x="295" y="165" className="ap-svg-card-heading">내과</text>
              <rect x="36" y="188" width="488" height="68" rx="12" fill="#f5f6f8" /><text x="49" y="207" className="ap-svg-card-date">입원 기간</text><rect className="ap-svg-form-field-fill" x="49" y="220" width="198" height="8" rx="4" fill="#cfdcf2" /><rect className="ap-svg-form-field-fill is-second" x="263" y="220" width="174" height="8" rx="4" fill="#cfdcf2" />
              <rect x="350" y="277" width="174" height="44" rx="17" fill="#25272a" /><text x="437" y="304" textAnchor="middle" className="ap-svg-button-text">{copy.forms.action}</text>
              <g className="ap-svg-form-ready"><circle cx="327" cy="299" r="14" fill="#e8f6ee" /><path d="M320 299l5 5 10-12" fill="none" stroke="#2f9d68" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></g>
            </g>
            <g className="ap-svg-notification-toast ap-svg-form-toast">
              <rect x="352" y="278" width="172" height="48" rx="17" fill="#ffffff" stroke="#e0e4e9" />
              <image href={NOTIFICATION_ICON} x="364" y="288" width="28" height="28" />
              <text x="400" y="298" className="ap-svg-toast-title">{copy.forms.alert}</text>
              <text x="400" y="313" className="ap-svg-toast-caption">{copy.forms.selected}</text>
            </g>
            <MotionCursor className="ap-svg-cursor--forms" />
          </g>
        ) : null}

        {featureId === "translation" ? (
          <g className="ap-svg-scene ap-svg-scene--translation">
            <rect x="18" y="70" width="244" height="108" rx="18" fill="#ffffff" stroke="#aebdce" strokeWidth="1.2" strokeDasharray="5 5" />
            <path d="M116 105h48v33h-48z" fill="#e8f1ff" /><path d="M140 92v33m-12-12 12 12 12-12" fill="none" stroke="#4d82d8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <text x="140" y="153" textAnchor="middle" className="ap-svg-card-heading">첨부하기</text>
            <g className="ap-svg-translation-file"><rect x="32" y="118" width="216" height="46" rx="14" fill="#eef4ff" /><path d="M47 129h18v24H47z" fill="#ffffff" stroke="#86a4cf" /><text x="75" y="139" className="ap-svg-card-heading">{copy.translation.file}</text><text x="75" y="153" className="ap-svg-card-date">PDF · 2.4 MB</text></g>

            <rect x="276" y="70" width="124" height="108" rx="18" fill="#edf0f4" />
            <circle cx="338" cy="121" r="32" fill="#f8f9fb" stroke="#ffffff" strokeWidth="8" />
            <circle className="ap-svg-translation-ring" cx="338" cy="121" r="32" fill="none" stroke="#6f95cf" strokeWidth="8" strokeLinecap="round" strokeDasharray="201" strokeDashoffset="201" transform="rotate(-90 338 121)" />
            <text x="338" y="124" textAnchor="middle" className="ap-svg-detail-title ap-svg-translation-percent ap-svg-translation-percent--zero">0%</text>
            <text x="338" y="124" textAnchor="middle" className="ap-svg-detail-title ap-svg-translation-percent ap-svg-translation-percent--done">100%</text>
            <text x="338" y="143" textAnchor="middle" className="ap-svg-card-date">사용</text>

            <rect x="414" y="70" width="128" height="108" rx="18" fill="#ffffff" stroke="#e1e5e9" />
            <text x="430" y="93" className="ap-svg-caption-strong">번역 설정</text><rect x="430" y="107" width="68" height="20" rx="10" fill="#eef4ff" /><text x="464" y="121" textAnchor="middle" className="ap-svg-badge-text">전체 번역</text><text x="430" y="146" className="ap-svg-caption">한국어 → 영어</text>

            <rect x="18" y="192" width="244" height="34" rx="15" fill="#ffffff" stroke="#e2e5e9" /><rect className="ap-svg-translation-mode" x="20" y="194" width="118" height="30" rx="14" fill="#eef4ff" /><text x="79" y="214" textAnchor="middle" className="ap-svg-chip-text">전체 번역</text><text x="201" y="214" textAnchor="middle" className="ap-svg-chip-text">요약 번역</text>
            <g className="ap-svg-translation-languages"><rect x="18" y="238" width="524" height="36" rx="15" fill="#ffffff" stroke="#e2e5e9" /><rect x="24" y="243" width="68" height="26" rx="13" fill="#eef4ff" /><text x="58" y="260" textAnchor="middle" className="ap-svg-chip-text">한국어</text><text x="126" y="260" textAnchor="middle" className="ap-svg-chip-text">영어</text><text x="188" y="260" textAnchor="middle" className="ap-svg-chip-text">일본어</text><text x="254" y="260" textAnchor="middle" className="ap-svg-chip-text">중국어</text></g>
            <rect x="18" y="288" width="524" height="46" rx="17" fill="#25272a" /><text x="280" y="316" textAnchor="middle" className="ap-svg-button-text">{copy.translation.action}</text>
            <g className="ap-svg-translation-result"><rect x="18" y="238" width="524" height="96" rx="18" fill="#ffffff" stroke="#dfe4ea" /><circle cx="44" cy="264" r="13" fill="#e8f6ee" /><path d="M38 264l4 4 8-10" fill="none" stroke="#2f9d68" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><text x="66" y="260" className="ap-svg-detail-title">{copy.translation.result}</text><rect x="66" y="274" width="346" height="6" rx="3" fill="#dce1e7" /><rect x="66" y="288" width="298" height="6" rx="3" fill="#e5e8ec" /></g>
            <g className="ap-svg-notification-toast ap-svg-translation-toast"><rect x="342" y="278" width="182" height="48" rx="17" fill="#ffffff" stroke="#e0e4e9" /><image href={NOTIFICATION_ICON} x="354" y="288" width="28" height="28" /><text x="390" y="298" className="ap-svg-toast-title">{copy.translation.alert}</text><text x="390" y="313" className="ap-svg-toast-caption">{copy.translation.file}</text></g>
            <MotionCursor className="ap-svg-cursor--translation" />
          </g>
        ) : null}

        {featureId === "tools" ? (
          <g className="ap-svg-scene ap-svg-scene--tools">
            <g className="ap-svg-tools-catalog">
              <rect x="18" y="68" width="524" height="36" rx="15" fill="#ffffff" stroke="#e3e6ea" />
              <circle cx="36" cy="86" r="6" fill="none" stroke="#727983" strokeWidth="1.6" /><path d="M40 90l5 5" stroke="#727983" strokeWidth="1.6" />
              <text x="54" y="91" className="ap-svg-input-text ap-svg-query-text">{copy.tools.query}</text>
              <g className="ap-svg-tools-chips"><rect x="18" y="114" width="48" height="26" rx="13" fill="#2d2f33" /><text x="42" y="131" textAnchor="middle" className="ap-svg-chip-text-light">전체</text><text x="92" y="131" textAnchor="middle" className="ap-svg-chip-text">심혈관</text><text x="151" y="131" textAnchor="middle" className="ap-svg-chip-text">호흡기</text><text x="210" y="131" textAnchor="middle" className="ap-svg-chip-text">응급</text><text x="263" y="131" textAnchor="middle" className="ap-svg-chip-text">대사</text></g>
              <g className="ap-svg-tool-card" transform="translate(18 154)"><rect width="252" height="76" rx="17" fill="#ffffff" stroke="#e1e5e9" /><circle cx="34" cy="30" r="15" fill="#eaf2ff" /><path d="M29 30c4-10 10-10 10 0s-6 10-10 0Z" fill="none" stroke="#5a87c8" strokeWidth="1.6" /><text x="58" y="29" className="ap-svg-card-heading">eGFR</text><text x="58" y="47" className="ap-svg-card-date">신장</text></g>
              <g transform="translate(288 154)"><g className="ap-svg-tool-card is-selected"><rect width="254" height="76" rx="17" fill="#edf4ff" stroke="#d7e2f3" /><circle cx="34" cy="30" r="15" fill="#ffffff" /><path d="M27 30h14M34 23v14" stroke="#678ec8" strokeWidth="1.6" strokeLinecap="round" /><text x="58" y="29" className="ap-svg-card-heading">CHA₂DS₂-VASc</text><text x="58" y="47" className="ap-svg-card-date">심혈관</text></g></g>
              <g className="ap-svg-tool-card" transform="translate(18 244)"><rect width="252" height="76" rx="17" fill="#ffffff" stroke="#e1e5e9" /><circle cx="34" cy="30" r="15" fill="#f5eef0" /><text x="58" y="29" className="ap-svg-card-heading">HAS-BLED</text><text x="58" y="47" className="ap-svg-card-date">심혈관</text></g>
              <g className="ap-svg-tool-card" transform="translate(288 244)"><rect width="254" height="76" rx="17" fill="#ffffff" stroke="#e1e5e9" /><circle cx="34" cy="30" r="15" fill="#edf5ed" /><text x="58" y="29" className="ap-svg-card-heading">CURB-65</text><text x="58" y="47" className="ap-svg-card-date">호흡기</text></g>
            </g>

            <g className="ap-svg-tool-calculator">
              <rect x="18" y="68" width="524" height="274" rx="20" fill="#ffffff" stroke="#dfe4e9" />
              <text x="36" y="95" className="ap-svg-detail-title">CHA₂DS₂-VASc</text><text x="36" y="114" className="ap-svg-caption">심방세동 환자의 뇌졸중 위험 평가</text>
              <g className="ap-svg-tool-options"><rect x="36" y="132" width="148" height="38" rx="12" fill="#f4f6f8" /><text x="50" y="155" className="ap-svg-card-heading">Age 65–74</text><rect className="ap-svg-tool-check" x="154" y="141" width="18" height="18" rx="6" fill="#dbe8fa" /><path d="M158 150l4 4 7-9" fill="none" stroke="#4e7fbf" strokeWidth="1.8" /></g>
              <g className="ap-svg-tool-options is-second"><rect x="198" y="132" width="148" height="38" rx="12" fill="#f4f6f8" /><text x="212" y="155" className="ap-svg-card-heading">Hypertension</text><rect className="ap-svg-tool-check" x="316" y="141" width="18" height="18" rx="6" fill="#dbe8fa" /><path d="M320 150l4 4 7-9" fill="none" stroke="#4e7fbf" strokeWidth="1.8" /></g>
              <g className="ap-svg-tool-options is-third"><rect x="360" y="132" width="164" height="38" rx="12" fill="#f4f6f8" /><text x="374" y="155" className="ap-svg-card-heading">Diabetes</text><rect className="ap-svg-tool-check" x="494" y="141" width="18" height="18" rx="6" fill="#dbe8fa" /><path d="M498 150l4 4 7-9" fill="none" stroke="#4e7fbf" strokeWidth="1.8" /></g>
              <rect x="36" y="190" width="488" height="118" rx="18" fill="#eef4ff" />
              <text x="60" y="219" className="ap-svg-caption-strong">Risk score</text><text x="60" y="267" className="ap-svg-score-text">{copy.tools.result}</text><rect x="380" y="218" width="116" height="38" rx="19" fill="#ffffff" /><text x="438" y="242" textAnchor="middle" className="ap-svg-chip-text">{copy.tools.risk}</text><rect className="ap-svg-tool-score-bar" x="60" y="283" width="324" height="7" rx="3.5" fill="#6f95cf" />
            </g>
            <MotionCursor className="ap-svg-cursor--tools" />
          </g>
        ) : null}
      </g>
    </svg>
  );
});
