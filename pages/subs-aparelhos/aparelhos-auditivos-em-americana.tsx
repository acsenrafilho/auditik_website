import { CityClinicLanding } from "@components/Clinic/CityClinicLanding";
import { SUBS_APARELHOS_ROUTES } from "@lib/routes";

const MAPS_URL = "https://maps.app.goo.gl/j4sTcPKXbBirS1JUA";
const MAPS_EMBED =
  "https://maps.google.com/maps?q=Rua+Lu%C3%ADza+Meneghel+Mancine,+72,+Americana+-+SP&hl=pt&z=15&output=embed";

export default function AparelhosAuditivosEmAmericanaPage() {
  return (
    <CityClinicLanding
      path={SUBS_APARELHOS_ROUTES.americana}
      city="Americana"
      title="Clínica de aparelho auditivo em Americana"
      description="Avaliação e tratamento auditivo em Americana, com fonoaudiólogos e Philips HearLink. Unidade na Rua Luíza Meneghel Mancine, 72."
      tracking="americana"
      isUnit
      clinicId="americana"
      addressLines={[
        "Rua Luíza Meneghel Mancine, 72 - Sala 12",
        "Jardim Paulista, Americana - SP",
      ]}
      mapsUrl={MAPS_URL}
      mapsEmbed={MAPS_EMBED}
      mapTitle="Mapa da clínica Auditik em Americana"
    />
  );
}
