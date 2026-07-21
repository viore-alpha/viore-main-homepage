const ALPHAEVIDENCE_SNAPSHOT_ENDPOINT =
  process.env.VIORE_ALPHAEVIDENCE_SNAPSHOT_ENDPOINT ??
  "https://texauplfngpawivaeukr.supabase.co/rest/v1/viore_alphaevidence_public_snapshot?select=schema_version,generated_at,data_as_of,counts,source_health,observation_outcomes_30d,ingestion_lag_hours_30d,observation_window_days,health_max_stale_hours";
const ALPHAEVIDENCE_SNAPSHOT_PUBLISHABLE_KEY =
  process.env.VIORE_METRICS_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_luvxrrYk1-G4PvatU1tILg__1r4aRc6";

export const ALPHAEVIDENCE_SNAPSHOT_REVALIDATE_SECONDS = 10 * 60;
export const ALPHAEVIDENCE_SNAPSHOT_STALE_AFTER_MS = 3 * 60 * 60 * 1_000;
export const ALPHAEVIDENCE_SNAPSHOT_FETCH_TIMEOUT_MS = 5_000;

type CountMap = {
  canonical_papers: number;
  papers_with_abstract: number;
  visible_guidelines: number;
  source_change_observations: number;
  managed_units: number;
};

type HealthMap = {
  healthy: number;
  degraded: number;
  failed: number;
  unknown: number;
};

type OutcomeMap = {
  unchanged: number;
  updated: number;
  conflict: number;
  unknown: number;
};

type LagMap = {
  p50: number | null;
  p95: number | null;
  max: number | null;
  unknown_count: number;
};

export type AlphaEvidencePublicSnapshotV1 = {
  schema_version: "technology.alphaevidence.snapshot.v1";
  generated_at: string;
  data_as_of: string;
  counts: CountMap;
  source_health: HealthMap;
  observation_outcomes_30d: OutcomeMap;
  ingestion_lag_hours_30d: LagMap;
  observation_window_days: 30;
  health_max_stale_hours: 48;
};

export type AlphaEvidenceSnapshotResult =
  | {
      state: "live" | "stale";
      snapshot: AlphaEvidencePublicSnapshotV1;
      lastSuccessAt: string;
    }
  | {
      state: "unavailable";
      snapshot: null;
      lastSuccessAt: string | null;
    };

type UnknownRecord = Record<string, unknown>;

let lastSuccessfulSnapshotAt: string | null = null;

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNonNegativeInteger(value: unknown): value is number {
  return Number.isSafeInteger(value) && Number(value) >= 0;
}

function isFiniteNonNegativeNumberOrNull(value: unknown): value is number | null {
  return value === null || (typeof value === "number" && Number.isFinite(value) && value >= 0);
}

function hasExactIntegerKeys(value: unknown, keys: readonly string[]): value is UnknownRecord {
  return isRecord(value) && keys.every((key) => isNonNegativeInteger(value[key]));
}

export function parseAlphaEvidenceSnapshot(value: unknown): AlphaEvidencePublicSnapshotV1 | null {
  if (!isRecord(value)) return null;

  const counts = value.counts;
  const sourceHealth = value.source_health;
  const outcomes = value.observation_outcomes_30d;
  const lag = value.ingestion_lag_hours_30d;

  if (
    value.schema_version !== "technology.alphaevidence.snapshot.v1" ||
    typeof value.generated_at !== "string" ||
    !Number.isFinite(Date.parse(value.generated_at)) ||
    typeof value.data_as_of !== "string" ||
    !Number.isFinite(Date.parse(value.data_as_of)) ||
    value.observation_window_days !== 30 ||
    value.health_max_stale_hours !== 48 ||
    !hasExactIntegerKeys(counts, [
      "canonical_papers",
      "papers_with_abstract",
      "visible_guidelines",
      "source_change_observations",
      "managed_units",
    ]) ||
    !hasExactIntegerKeys(sourceHealth, ["healthy", "degraded", "failed", "unknown"]) ||
    !hasExactIntegerKeys(outcomes, ["unchanged", "updated", "conflict", "unknown"]) ||
    !isRecord(lag) ||
    !isFiniteNonNegativeNumberOrNull(lag.p50) ||
    !isFiniteNonNegativeNumberOrNull(lag.p95) ||
    !isFiniteNonNegativeNumberOrNull(lag.max) ||
    !isNonNegativeInteger(lag.unknown_count)
  ) {
    return null;
  }

  return value as AlphaEvidencePublicSnapshotV1;
}

export function snapshotStateAt(
  snapshot: AlphaEvidencePublicSnapshotV1,
  nowMs = Date.now(),
): "live" | "stale" {
  return nowMs - Date.parse(snapshot.generated_at) > ALPHAEVIDENCE_SNAPSHOT_STALE_AFTER_MS
    ? "stale"
    : "live";
}

export async function getAlphaEvidencePublicSnapshot(): Promise<AlphaEvidenceSnapshotResult> {
  try {
    const response = await fetch(ALPHAEVIDENCE_SNAPSHOT_ENDPOINT, {
      headers: { apikey: ALPHAEVIDENCE_SNAPSHOT_PUBLISHABLE_KEY },
      next: { revalidate: ALPHAEVIDENCE_SNAPSHOT_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(ALPHAEVIDENCE_SNAPSHOT_FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`AlphaEvidence snapshot request failed with status ${response.status}`);
    }

    const payload: unknown = await response.json();
    const snapshot = Array.isArray(payload) ? parseAlphaEvidenceSnapshot(payload[0]) : null;
    if (!snapshot) throw new Error("AlphaEvidence snapshot did not match the public contract");

    lastSuccessfulSnapshotAt = snapshot.generated_at;
    return {
      state: snapshotStateAt(snapshot),
      snapshot,
      lastSuccessAt: snapshot.generated_at,
    };
  } catch (error) {
    console.error("[alphaevidence-snapshot] aggregate unavailable", error);
    return {
      state: "unavailable",
      snapshot: null,
      lastSuccessAt: lastSuccessfulSnapshotAt,
    };
  }
}
