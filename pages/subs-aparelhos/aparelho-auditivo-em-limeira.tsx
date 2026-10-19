import { CityClinicLanding } from "@components/Clinic/CityClinicLanding";
import { SUBS_APARELHOS_ROUTES } from "@lib/routes";

const MAPS_URL = "https://maps.app.goo.gl/j4sTcPKXbBirS1JUA";
const MAPS_EMBED =
  "https://maps.google.com/maps?q=Rua+Lu%C3%ADza+Meneghel+Mancine,+72,+Americana+-+SP&hl=pt&z=15&output=embed";

export default function AparelhoAuditivoEmLimeiraPage() {
  return (
    <CityClinicLanding
      path={SUBS_APARELHOS_ROUTES.limeira}
      city="Limeira"
      title="Clínica de aparelho auditivo em Limeira"
      description="Quem mora em Limeira faz avaliação e tratamento auditivo na clínica Auditik de Americana, com fonoaudiólogos e Philips HearLink."
      tracking="limeira"
      isUnit={false}
      clinicId="americana"
      nearestClinicName="Americana"
      addressLines={[
        "Unidade mais próxima: Americana",
        "Rua Luíza Meneghel Mancine, 72 - Sala 12",
        "Jardim Paulista, Americana - SP",
      ]}
      mapsUrl={MAPS_URL}
      mapsEmbed={MAPS_EMBED}
      mapTitle="Mapa da clínica Auditik em Americana, que atende Limeira"
    />
  );
}
