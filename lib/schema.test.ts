import assert from "node:assert/strict";
import { test } from "node:test";
import {
  AUDITIK_SAME_AS,
  CLINIC_OPENING_HOURS,
  generateLocalBusinessSchema,
  generateOrganizationSchema,
  type ClinicLocationId,
} from "./schema.ts";

const EXPECTED_WIKIDATA: Record<
  ClinicLocationId,
  Array<{ name: string; id: string }>
> = {
  piracicaba: [
    { name: "Piracicaba", id: "Q330175" },
    { name: "Rio Claro", id: "Q291277" },
  ],
  americana: [
    { name: "Americana", id: "Q467421" },
    { name: "Limeira", id: "Q841241" },
  ],
  "sao-pedro": [{ name: "São Pedro", id: "Q924342" }],
  charqueada: [{ name: "Charqueada", id: "Q983515" }],
};

test("Organization uses a single @id and points to the four clinics", () => {
  const org = generateOrganizationSchema();
  assert.equal(org["@id"], "https://auditik.com.br#organization");
  assert.deepEqual(org.sameAs, [...AUDITIK_SAME_AS]);
  assert.deepEqual(org.location, [
    { "@id": "https://auditik.com.br#piracicaba" },
    { "@id": "https://auditik.com.br#americana" },
    { "@id": "https://auditik.com.br#sao-pedro" },
    { "@id": "https://auditik.com.br#charqueada" },
  ]);
});

test("MedicalClinic schemas use Wikidata IDs, hours and shared sameAs", () => {
  for (const location of Object.keys(EXPECTED_WIKIDATA) as ClinicLocationId[]) {
    const cities = EXPECTED_WIKIDATA[location];
    const schema = generateLocalBusinessSchema(location);
    assert.equal(schema["@type"], "MedicalClinic");
    assert.equal(schema["@id"], `https://auditik.com.br#${location}`);
    assert.deepEqual(schema.sameAs, [...AUDITIK_SAME_AS]);
    assert.equal(
      schema.openingHoursSpecification.opens,
      CLINIC_OPENING_HOURS.opens,
    );
    assert.equal(
      schema.openingHoursSpecification.closes,
      CLINIC_OPENING_HOURS.closes,
    );
    assert.deepEqual(
      schema.areaServed.map((city: { name: string; "@id": string }) => ({
        name: city.name,
        id: city["@id"].replace("https://www.wikidata.org/wiki/", ""),
      })),
      cities,
    );
  }
});

test("Organization and Piracicaba MedicalClinic list the YouTube channel", () => {
  const youtube = "https://www.youtube.com/@auditik";
  assert.ok(AUDITIK_SAME_AS.includes(youtube));
  assert.ok(generateOrganizationSchema().sameAs.includes(youtube));
  assert.ok(generateLocalBusinessSchema("piracicaba").sameAs.includes(youtube));
  assert.equal(generateLocalBusinessSchema("piracicaba")["@type"], "MedicalClinic");
});

test("Americana street uses Luíza spelling", () => {
  const schema = generateLocalBusinessSchema("americana");
  assert.match(schema.address.streetAddress, /Luíza/);
  assert.doesNotMatch(schema.address.streetAddress, /Luísa/);
});
