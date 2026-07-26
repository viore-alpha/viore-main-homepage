# Viore Public Architecture Claim Contract

**Contract version:** `2026-07-26.2`
**Distribution profile:** public-safe

## Public-safe portfolio

- AlphaEvidence: 의료 근거의 출처·권리·버전·검색 기반
- AlphaDoc Engine: 근거와 사용자 맥락을 제품 workflow로 연결하는 실행 계층
- AlphaDocument: 문서를 일관된 구조로 변환하는 결정론적 artifact engine
- AlphaImage: 이미지 기반 입력을 구조화하기 위한 계획된 기술 경계
- AlphaLayer: 외부 AI 실행 전 보호와 통제를 담당하는 protected inference gateway

## Claim rules

1. 저장소 구현, 제품 통합, 배포와 운영 상태를 서로 섞지 않는다.
2. AlphaImage를 현재 배포 기능으로 표현하지 않는다.
3. AlphaDoc Engine을 자체 LLM 또는 완성된 범용 provider platform으로 표현하지 않는다.
4. 기반 오픈소스·인프라·외부 모델을 Viore 자체 기술로 재분류하지 않는다.
5. 공급자, 모델, prompt, routing, token, 평가 임계값을 공개하지 않는다.
6. 공개 수치에는 기준일과 정의를 붙이고 live 증거 없이 갱신하지 않는다.
7. 환자정보, 파트너 연동, 완전한 익명화·무위험 표현은 검증과 승인이 없으면 사용하지 않는다.

Public copy may describe Viore-owned contracts, provenance, workflow controls and
evaluation discipline without disclosing internal implementation details.
