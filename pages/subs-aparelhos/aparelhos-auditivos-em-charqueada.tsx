import { CityClinicLanding } from "@components/Clinic/CityClinicLanding";
import { SUBS_APARELHOS_ROUTES } from "@lib/routes";

const MAPS_URL = "https://maps.app.goo.gl/PcWnKA3BTexc2FFm9";
const MAPS_EMBED =
  "https://maps.google.com/maps?q=Avenida+Brasil,+151,+Charqueada+-+SP&hl=pt&z=15&output=embed";

export default function AparelhosAuditivosEmCharqueadaPage() {
  return (
    <CityClinicLanding
      path={SUBS_APARELHOS_ROUTES.charqueada}
      city="Charqueada"
      title="Clínica de aparelho auditivo em Charqueada"
      description="Avaliação e tratamento auditivo em Charqueada, com fonoaudiólogos e Philips HearLink. Unidade na Avenida Brasil, 151."
      tracking="charqueada"
      isUnit
      clinicId="charqueada"
      addressLines={["Avenida Brasil, 151", "Centro, Charqueada - SP"]}
      mapsUrl={MAPS_URL}
      mapsEmbed={MAPS_EMBED}
      mapTitle="Mapa da clínica Auditik em Charqueada"
    />
  );
}
