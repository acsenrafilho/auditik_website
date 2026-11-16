import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { isIndexablePath } from "../scripts/lib/content-index.mjs";

function read(relativePath: string): string {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

test("aparelhos page keeps FAQ schema and drops the invalid product price", () => {
  const source = read("pages/aparelhos.tsx");
  assert.match(source, /generateFAQSchema/);
  assert.doesNotMatch(source, /generateProductSchema/);
  assert.doesNotMatch(source, /Sob consulta/);
  assert.doesNotMatch(source, /"price"/);
});

test("page titles leave the Auditik suffix to the app template", () => {
  const home = read("pages/index.tsx");
  const aparelhos = read("pages/aparelhos.tsx");
  const philips = read(
    "pages/subs-aparelhos/aparelhos-auditivos-philips-hearing-solutions.tsx",
  );

  assert.match(home, /Aparelhos auditivos em Piracicaba \| Philips HearLink/);
  assert.match(aparelhos, /Aparelhos auditivos Philips HearLink em Piracicaba/);
  assert.match(
    philips,
    /Aparelhos auditivos Philips HearLink em Piracicaba e região/,
  );
  assert.match(philips, /Quanto custa o Philips HearLink\?/);
  assert.doesNotMatch(home, /\| Auditik"/);
  assert.doesNotMatch(aparelhos, /\| Auditik"/);
  assert.doesNotMatch(philips, /\| Auditik"/);
});

test("blog template route is not an indexable URL", () => {
  assert.equal(isIndexablePath("/blog/[slug]"), false);
  assert.equal(isIndexablePath("/blog/[slug]/"), false);
  assert.equal(isIndexablePath("/blog/%5Bslug%5D/"), false);
  assert.equal(
    isIndexablePath(
      "/blog/ajustando-o-som-do-seu-aparelho-auditivo-um-guia-completo/",
    ),
    true,
  );

  const robots = read("public/robots.txt");
  const sitemap = read("public/sitemap.xml");
  assert.match(robots, /Disallow: \/blog\/\[slug\]/);
  assert.doesNotMatch(sitemap, /\[slug\]/);
  assert.doesNotMatch(sitemap, /%5Bslug%5D/i);
});

test("sound and cochlea posts use direct snippet copy without changing the title slug", () => {
  const sound = read("content/blog/20260811-140606-0006.md");
  const cochlea = read("content/blog/20260609-162324-0001.md");

  assert.match(sound, /title: "Ajustando o som do seu aparelho auditivo: um guia completo"/);
  assert.match(sound, /seoTitle: "Como ajustar o som do aparelho auditivo"/);
  assert.match(sound, /Volume baixo, chiado ou fala abafada\?/);

  assert.match(
    cochlea,
    /title: "A Importância da Cóclea na Audição e Como a Auditik Pode Ajudar"/,
  );
  assert.match(cochlea, /seoTitle: "O que a cóclea faz na audição"/);
  assert.match(cochlea, /A cóclea transforma som em sinal para o cérebro/);
  assert.doesNotMatch(cochlea, /restaurar sua qualidade de vida/);
});
