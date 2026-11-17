/**
 * Compose the conversion-sheet `paraQuem` field for the triage page without
 * adding a new ingest column. Keeps the existing audience values and appends
 * the hearWHO status in a stable suffix.
 */

export const TRIAGEM_PARA_QUEM_OPTIONS = [
  "Para eu mesmo(a)",
  "Para um amigo ou familiar",
  "Para outra pessoa",
] as const;

export const TRIAGEM_HEARWHO_STATUS_OPTIONS = [
  "Sim",
  "Ainda não",
  "Prefiro fazer direto na clínica",
] as const;

export type TriagemParaQuem = (typeof TRIAGEM_PARA_QUEM_OPTIONS)[number];
export type TriagemHearWhoStatus =
  (typeof TRIAGEM_HEARWHO_STATUS_OPTIONS)[number];

export const composeTriagemParaQuem = (
  paraQuem: string,
  hearWhoStatus: string,
): string => {
  const audience = paraQuem.trim();
  const status = hearWhoStatus.trim();

  if (!audience) {
    return status ? `Triagem hearWHO: ${status}` : "";
  }

  if (!status) {
    return audience;
  }

  return `${audience} · Triagem hearWHO: ${status}`;
};
