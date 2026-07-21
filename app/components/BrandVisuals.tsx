import { AlphaDocIntelligenceLens } from "@/app/components/AlphaDocIntelligenceLens";

export function AlphaDocOrchestrationVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`orchestration-visual${compact ? " is-compact" : ""}`} aria-hidden="true">
      <div className="orchestration-symbol">
        <AlphaDocIntelligenceLens />
        <div className="orchestration-conductor"><b /><img src="/brand/alphadoc-alpha.png" alt="" /></div>
      </div>
    </div>
  );
}

export function AlphaEvidenceVisual() {
  return (
    <div className="technology-visual evidence-visual" aria-hidden="true">
      <div className="evidence-field">
        <i className="evidence-ring evidence-ring-a" />
        <i className="evidence-ring evidence-ring-b" />
        <span className="evidence-source evidence-source-a"><i /><b /></span>
        <span className="evidence-source evidence-source-b"><i /><b /></span>
        <span className="evidence-source evidence-source-c"><i /><b /></span>
        <span className="evidence-source evidence-source-d"><i /><b /></span>
        <span className="evidence-connector evidence-connector-a" />
        <span className="evidence-connector evidence-connector-b" />
        <span className="evidence-connector evidence-connector-c" />
        <span className="evidence-connector evidence-connector-d" />
        <div className="evidence-core"><b>AE</b><span /><i /></div>
        <span className="evidence-claim evidence-claim-a"><i /><b /><b /></span>
        <span className="evidence-claim evidence-claim-b"><i /><b /><b /></span>
        <span className="evidence-claim evidence-claim-c"><i /><b /><b /></span>
      </div>
    </div>
  );
}

export function AlphaDocumentVisual() {
  return (
    <div className="technology-visual document-visual" aria-hidden="true">
      <div className="document-field">
        <span className="document-thread"><i /></span>
        <div className="document-sheet document-sheet-back"><i /><b /><b /><b /></div>
        <div className="document-sheet document-sheet-mid"><i /><b /><b /><b /></div>
        <div className="document-sheet document-sheet-front">
          <span className="document-mark">AD</span>
          <i /><b /><b /><b /><b />
          <div className="document-review"><span /><span /><span /></div>
        </div>
        <span className="document-pin"><i /><b /></span>
      </div>
    </div>
  );
}

export function KnowledgeGrowthVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`insight-motion knowledge-motion${compact ? " is-compact" : ""}`} aria-hidden="true">
      <i className="knowledge-stream stream-left"><b /></i>
      <i className="knowledge-stream stream-center"><b /></i>
      <i className="knowledge-stream stream-right"><b /></i>
      <div className="knowledge-stack"><span /><span /><span /><span /><span /></div>
      <div className="knowledge-spine"><i /><i /><i /></div>
    </div>
  );
}

export function CouncilPartnersVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`insight-motion partners-motion${compact ? " is-compact" : ""}`} aria-hidden="true">
      <i className="partner-link partner-link-a"><b /></i>
      <i className="partner-link partner-link-b"><b /></i>
      <i className="partner-link partner-link-c"><b /></i>
      <i className="partner-link partner-link-d"><b /></i>
      <i className="partner-link partner-link-e"><b /></i>

      <span className="partner-node partner-node-a"><i /></span>
      <span className="partner-node partner-node-b"><i /></span>
      <span className="partner-node partner-node-c"><i /></span>
      <span className="partner-node partner-node-d"><i /></span>
      <span className="partner-node partner-node-e"><i /></span>
      <span className="partner-node partner-node-f"><i /></span>

      <div className="partner-bridge"><i /><span /><b /></div>
    </div>
  );
}

export function CompanyLinearityVisual() {
  return (
    <div className="company-linearity-visual" aria-hidden="true">
      <span className="linearity-line line-01"><i /><b /></span>
      <span className="linearity-line line-02"><i /><b /></span>
      <span className="linearity-line line-03"><i /><b /></span>
      <span className="linearity-line line-04"><i /><b /></span>
      <span className="linearity-line line-05"><i /><b /></span>
      <span className="linearity-line line-06"><i /><b /></span>
      <div className="linearity-core"><i /><span /><b /></div>
      <div className="linearity-signature">VIORE <span>·</span> MEDICAL INTELLIGENCE</div>
    </div>
  );
}

export function ContactLineVisual() {
  return (
    <div className="contact-line-visual" aria-hidden="true">
      <i className="contact-line" />
      <span className="contact-pin"><i /><b /></span>
      <small>THE LINE CONTINUES</small>
    </div>
  );
}
