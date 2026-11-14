import type { CancelProgrammeInput, CancelProgrammeResult } from "@/lib/types";

// Stub from the Chief Architect. Owned by Lane A (F9 and F10), who replaces the body.
// Lane B (admin, F15 and F16) calls this function and must not change it.
export async function cancelProgramme(input: CancelProgrammeInput): Promise<CancelProgrammeResult> {
  void input;
  throw new Error("cancelProgramme is not implemented yet (Lane A, F9).");
}
