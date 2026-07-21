import type { CompanyConnectionsContent } from "@/app/site-content";

export function CompanyConnections({ content }: { content: CompanyConnectionsContent }) {
  return (
    <section className="company-connections" aria-labelledby="company-connections-title">
      <header className="company-connections-heading">
        <h2 id="company-connections-title">{content.title}</h2>
        {content.description && <p>{content.description}</p>}
      </header>

      <div className="company-connections-stage">
        <ol className="company-connection-nodes">
          {content.nodes.map((node) => (
            <li key={node.title} className="company-connection-node">
              <div className="company-connection-node-copy">
                <h3>{node.title}</h3>
                {node.subtitle && <p>{node.subtitle}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
