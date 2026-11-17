import assert from "node:assert/strict";
import { test } from "node:test";
import {
  composeTriagemParaQuem,
  TRIAGEM_HEARWHO_STATUS_OPTIONS,
  TRIAGEM_PARA_QUEM_OPTIONS,
} from "./triagem-lead.ts";

test("composeTriagemParaQuem joins audience and hearWHO status", () => {
  assert.equal(
    composeTriagemParaQuem("Para eu mesmo(a)", "Sim"),
    "Para eu mesmo(a) · Triagem hearWHO: Sim",
  );
  assert.equal(
    composeTriagemParaQuem("Para um amigo ou familiar", "Ainda não"),
    "Para um amigo ou familiar · Triagem hearWHO: Ainda não",
  );
  assert.equal(
    composeTriagemParaQuem(
      "Para outra pessoa",
      "Prefiro fazer direto na clínica",
    ),
    "Para outra pessoa · Triagem hearWHO: Prefiro fazer direto na clínica",
  );
});

test("composeTriagemParaQuem tolerates missing parts", () => {
  assert.equal(composeTriagemParaQuem("", "Sim"), "Triagem hearWHO: Sim");
  assert.equal(composeTriagemParaQuem("Para eu mesmo(a)", ""), "Para eu mesmo(a)");
  assert.equal(composeTriagemParaQuem("  ", "  "), "");
});

test("triagem form option catalogs stay stable for the sheet", () => {
  assert.deepEqual([...TRIAGEM_PARA_QUEM_OPTIONS], [
    "Para eu mesmo(a)",
    "Para um amigo ou familiar",
    "Para outra pessoa",
  ]);
  assert.deepEqual([...TRIAGEM_HEARWHO_STATUS_OPTIONS], [
    "Sim",
    "Ainda não",
    "Prefiro fazer direto na clínica",
  ]);
});
