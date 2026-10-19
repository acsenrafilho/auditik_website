import { CityClinicLanding } from "@components/Clinic/CityClinicLanding";
import { SUBS_APARELHOS_ROUTES } from "@lib/routes";

const MAPS_URL = "https://maps.app.goo.gl/c6EiqgiPaQg3HUrK8";
const MAPS_EMBED =
  "https://maps.google.com/maps?q=Rua+Samuel+Neves,+1800,+Piracicaba+-+SP&hl=pt&z=15&output=embed";

export default function AparelhoAuditivoEmRioClaroPage() {
  return (
    <CityClinicLanding
      path={SUBS_APARELHOS_ROUTES.rioClaro}
      city="Rio Claro"
      title="Clínica de aparelho auditivo em Rio Claro"
      description="Quem mora em Rio Claro faz avaliação e tratamento auditivo na clínica Auditik de Piracicaba, com fonoaudiólogos e Philips HearLink."
      tracking="rio-claro"
      isUnit={false}
      clinicId="piracicaba"
      nearestClinicName="Piracicaba"
      addressLines={[
        "Unidade mais próxima: Piracicaba",
        "Rua Samuel Neves, 1800",
        "Jardim Europa, Piracicaba - SP",
      ]}
      mapsUrl={MAPS_URL}
      mapsEmbed={MAPS_EMBED}
      mapTitle="Mapa da clínica Auditik em Piracicaba, que atende Rio Claro"
    />
  );
}
