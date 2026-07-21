import { isKnowledgeCursor, type KnowledgeFilter } from "@/app/knowledge-contract";
import { getKnowledgePaperPage } from "@/app/knowledge-feed";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const scope = url.searchParams.get("scope") ?? "all";
  const cursor = url.searchParams.get("cursor");

  if (scope !== "all" && scope !== "domestic" && scope !== "overseas") {
    return Response.json({ error: "invalid_scope" }, { status: 400 });
  }
  if (cursor !== null && !isKnowledgeCursor(cursor)) {
    return Response.json({ error: "invalid_cursor" }, { status: 400 });
  }

  try {
    const page = await getKnowledgePaperPage({
      scope: scope as KnowledgeFilter,
      cursor,
    });
    return Response.json(page, {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("[knowledge-api] paper page unavailable", error);
    return Response.json({ error: "feed_unavailable" }, { status: 503 });
  }
}
