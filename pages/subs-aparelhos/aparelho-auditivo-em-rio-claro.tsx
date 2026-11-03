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
      title="Aparelho auditivo para quem mora em Rio Claro"
      description="Quem mora em Rio Claro faz avaliação e tratamento auditivo na clínica Auditik de Piracicaba, com fonoaudiólogos e Philips HearLink. Não há unidade em Rio Claro."
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
      travelNote="De Rio Claro até a clínica de Piracicaba o trajeto de carro costuma levar cerca de 40 minutos, conforme o trânsito. Use o Google Maps para o caminho e o horário da visita."
      extraFaqs={[
        {
          question: "A avaliação para quem mora em Rio Claro é gratuita?",
          answer:
            "Sim. A primeira avaliação na clínica de Piracicaba é gratuita, com fonoaudiólogo, para quem mora em Rio Claro ou na região.",
        },
      ]}
    />
  );
}
