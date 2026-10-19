import { CityClinicLanding } from "@components/Clinic/CityClinicLanding";
import { SUBS_APARELHOS_ROUTES } from "@lib/routes";

const MAPS_URL = "https://maps.app.goo.gl/HAKJ6zmwJ3JjvhseA";
const MAPS_EMBED =
  "https://maps.google.com/maps?q=Rua+Malaquias+Guerra,+290,+S%C3%A3o+Pedro+-+SP&hl=pt&z=15&output=embed";

export default function AparelhosAuditivosEmSaoPedroPage() {
  return (
    <CityClinicLanding
      path={SUBS_APARELHOS_ROUTES.saoPedro}
      city="São Pedro"
      title="Clínica de aparelho auditivo em São Pedro"
      description="Avaliação e tratamento auditivo em São Pedro, com fonoaudiólogos e Philips HearLink. Unidade na Rua Malaquias Guerra, 290."
      tracking="sao-pedro"
      isUnit
      clinicId="sao-pedro"
      addressLines={["Rua Malaquias Guerra, 290", "Centro, São Pedro - SP"]}
      mapsUrl={MAPS_URL}
      mapsEmbed={MAPS_EMBED}
      mapTitle="Mapa da clínica Auditik em São Pedro"
    />
  );
}
