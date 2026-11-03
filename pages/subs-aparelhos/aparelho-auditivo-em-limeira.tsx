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
      title="Aparelho auditivo para quem mora em Limeira"
      description="Quem mora em Limeira faz avaliação e tratamento auditivo na clínica Auditik de Americana, com fonoaudiólogos e Philips HearLink. Não há unidade em Limeira."
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
      travelNote="De Limeira até a clínica de Americana o trajeto de carro costuma levar cerca de 30 minutos, conforme o trânsito. Use o Google Maps para o caminho e o horário da visita."
      extraFaqs={[
        {
          question: "A avaliação para quem mora em Limeira é gratuita?",
          answer:
            "Sim. A primeira avaliação na clínica de Americana é gratuita, com fonoaudiólogo, para quem mora em Limeira ou na região.",
        },
      ]}
    />
  );
}
