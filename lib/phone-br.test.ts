import assert from "node:assert/strict";
import { test } from "node:test";
import {
  formatBrazilPhone,
  isValidBrazilPhone,
  normalizeBrazilPhone,
} from "./phone-br.ts";

test("rejects incomplete mobile missing the leading 9", () => {
  assert.equal(isValidBrazilPhone("(11) 9876-5432"), false);
  assert.equal(isValidBrazilPhone("1198765432"), false);
});

test("rejects invalid DDD and repeated digits", () => {
  assert.equal(isValidBrazilPhone("(00) 12345-6789"), false);
  assert.equal(isValidBrazilPhone("(11) 11111-1111"), false);
});

test("accepts valid mobile and landline", () => {
  assert.equal(isValidBrazilPhone("(11) 98765-4321"), true);
  assert.equal(isValidBrazilPhone("(19) 3377-6941"), true);
  assert.equal(normalizeBrazilPhone("(11) 98765-4321"), "11987654321");
  assert.equal(normalizeBrazilPhone("(19) 3377-6941"), "1933776941");
});

test("masks eleven-digit mobile as (DD) NNNNN-NNNN", () => {
  assert.equal(formatBrazilPhone("11987654321"), "(11) 98765-4321");
});
