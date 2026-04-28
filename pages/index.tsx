import { NextSeo } from "next-seo";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getSEOMeta } from "@lib/seo";
import { trackFormSubmit, trackButtonClick } from "@lib/analytics";
import { submitLeadToCRM, formatBrazilPhone } from "@lib/lead-submission";
import { WHATSAPP_LEAD_CITIES } from "@lib/whatsapp-cities";
import { Header } from "@components/Header";
import { LeadSubmitSuccessModal } from "@components/Common/LeadSubmitSuccessModal";
import { WhatsAppLeadButton } from "@components/Common/WhatsAppLeadButton";

const BRAZIL_WHATSAPP_PHONE = "551933776941";
const FORM_WHATSAPP_MESSAGE =
  "Olá Auditik, acabei de preencher o formulário e gostaria de continuar pelo WhatsApp.";

export default function Home() {
  const [testimonialsIndex, setTestimonialsIndex] = useState(0);
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    cidade: "",
    paraQuem: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const testimonialsPerPage = 3;

  const seo = getSEOMeta({
    title: "Auditik - Aparelhos Auditivos Philips HearLink",
    description:
      "Aparelhos auditivos Philips HearLink com IA avançada. Atendimento humanizado em Piracicaba e Americana. Agende sua avaliação gratuita!",
    ogImage:
      "https://lh3.googleusercontent.com/aida/ADBb0ujm3IiiC80F2IAjGlY7KOs-vQWTbFnboie5svMlvTl2zKxwJAun49hElACrkIhMTyg8RQqSckVJaw84J0_M8IcVszIdffURkZbfsIBnwUJdwVJ_G9SVe858Nmi4UnYTi-9yXgEKGumKkDYmoe8JTXJqhYO13QI8d_SqZMITkA6Bfymqq6vZVnKl1pH0KxAQYO1JjXJ8Uo6ISIm4NmhrKN8m36XuY3hLbB0HyhV8WAYG4SJ5v6s-6DpjSjg",
  });

  const testimonials = [
    {
      text: "A minha experiência não poderia ter sido melhor. Excelente atendimento, equipe comprometida em ajudar, compreensão com as dificuldades. Muito satisfeito com a qualidade.",
      author: "Solange Carribeiro",
      location: "Google Review",
      image:
        "https://ui-avatars.com/api/?name=Solange+Carribeiro&background=4F46E5&color=fff&bold=true&size=96",
      color: "white",
    },
    {
      text: "Excelente experiência com a fonoaudióloga Karoline na clínica. Eu e minha mãe fomos atendidas com extrema atenção, profissionalismo e cuidado. Muito recomendo!",
      author: "Sandra Melo",
      location: "Google Review",
      image:
        "https://ui-avatars.com/api/?name=Sandra+Melo&background=06B6D4&color=fff&bold=true&size=96",
      color: "blue",
    },
    {
      text: "Fomos bem recepcionados, a dra. domina o assunto, atenciosa, com explicações simples e objetivas. Muito amável e delicada com idosos. Profissionalismo impecável!",
      author: "Antonio Carlos",
      location: "Google Review",
      image:
        "https://ui-avatars.com/api/?name=Antonio+Carlos&background=EC4899&color=fff&bold=true&size=96",
      color: "white",
    },
    {
      text: "Mais que recomendo! Não só pelo aparelho de excelente qualidade, mas pelo atendimento a minha mãe prestado sempre com muito esmero e atenção. Excelentes profissionais.",
      author: "Edi Bispo",
      location: "Google Review",
      image:
        "https://ui-avatars.com/api/?name=Edi+Bispo&background=F59E0B&color=fff&bold=true&size=96",
      color: "white",
    },
    {
      text: "Atendimento maravilhoso, a Carol muito paciente, humana, transparente. Esclarece as dúvidas com muita atenção. Eles devolveram a autoestima da minha mãe. Recomendo!",
      author: "Josiane Almeida",
      location: "Google Review",
      image:
        "https://ui-avatars.com/api/?name=Josiane+Almeida&background=8B5CF6&color=fff&bold=true&size=96",
      color: "blue",
    },
    {
      text: "Atendimento é com excelência, desde a venda e pós venda. Ambiente acolhedor. Tudo perfeito! Estou muito satisfeito com meu novo aparelho Philips.",
      author: "Meire Ribeiro de Souza",
      location: "Google Review",
      image:
        "https://ui-avatars.com/api/?name=Meire+Ribeiro&background=06B6D4&color=fff&bold=true&size=96",
      color: "white",
    },
    {
      text: "Foi uma experiência inacreditável. A atenção que recebi e o esclarecimento sobre minha deficiência auditiva foi excepcional. Recomendo de coração!",
      author: "Luiz Antonio Baldino",
      location: "Google Review",
      image:
        "https://ui-avatars.com/api/?name=Luiz+Antonio&background=EC4899&color=fff&bold=true&size=96",
      color: "white",
    },
    {
      text: "Excelentes profissionais, a Dra Carol foi extremamente cuidadosa e dedicada com minha tia idosa. Super recomendo os profissionais e os aparelhos!",
      author: "Deborah Terra",
      location: "Google Review",
      image:
        "https://ui-avatars.com/api/?name=Deborah+Terra&background=10B981&color=fff&bold=true&size=96",
      color: "blue",
    },
    {
      text: "Muito Bom Atendimento, sempre com cortesia e no horário programado. Ressalto também as orientações recebidas, muito importantes para o funcionamento do aparelho.",
      author: "Francisco A. Rodella",
      location: "Google Review",
      image:
        "https://ui-avatars.com/api/?name=Francisco+Rodella&background=F59E0B&color=fff&bold=true&size=96",
      color: "white",
    },
    {
      text: "Fui muito bem atendida na Philips Aparelhos Auditivos em Piracicaba. Desde o primeiro contato, a equipe foi extremamente atenciosa, paciente e profissional.",
      author: "Amanda Soares",
      location: "Google Review",
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjW2FtAubyO1Zhrrz7zMz24VGwyYMvM9HzosqbKjXvvXjl2YPLo=s128-c0x00000000-cc-rp-mo",
      color: "blue",
    },
    {
      text: "Atendimento desde a recepção até o final sem igual. Empresa que preza o respeito pelo indivíduo. Eu recomendo de olhos fechados.",
      author: "William Evangelista",
      location: "Google Review",
      image:
        "https://ui-avatars.com/api/?name=William+Evangelista&background=0EA5E9&color=fff&bold=true&size=96",
      color: "white",
    },
    {
      text: "Foram muito atenciosos, esclarecedores e sinceros em tudo. O equipamento é ótimo, e o atendimento ainda melhor. Recomendo!",
      author: "Marcelo Gonçalves Rosa",
      location: "Google Review",
      image:
        "https://ui-avatars.com/api/?name=Marcelo+Goncalves+Rosa&background=14B8A6&color=fff&bold=true&size=96",
      color: "white",
    },
  ];

  const locations = [
    {
      name: "Unidade Piracicaba",
      address: "Rua Samuel Neves, 1800",
      city: "Jardim Europa, Piracicaba - SP",
      maps: "https://maps.app.goo.gl/c6EiqgiPaQg3HUrK8",
    },
    {
      name: "Unidade Americana",
      address: "Rua Luísa Meneghel Mancine, 72 - Sala 12",
      city: "Jardim Paulista, Americana - SP",
      maps: "https://maps.app.goo.gl/j4sTcPKXbBirS1JUA",
    },
    {
      name: "Unidade São Pedro",
      address: "Rua Malaquias Guerra, 290",
      city: "Centro, São Pedro - SP",
      maps: "https://maps.app.goo.gl/8p4JUU1WWaR4KMNaA",
    },
    {
      name: "Unidade Charqueada",
      address: "Avenida Brasil, 151",
      city: "Centro, Charqueada - SP",
      maps: "https://maps.app.goo.gl/LUpi8CYH7kw4BYom8",
    },
  ];

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Aplicar máscara de telefone se for o campo whatsapp
    if (name === "whatsapp") {
      const maskedPhone = formatBrazilPhone(value);
      setFormData((prev) => ({ ...prev, [name]: maskedPhone }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formSubmitting) return;

    setFormSubmitting(true);
    setFormError("");

    try {
      trackFormSubmit("contact_form", {
        nome: formData.nome,
        cidade: formData.cidade,
        para_quem: formData.paraQuem,
      });

      await submitLeadToCRM({
        fullName: formData.nome,
        phone: formData.whatsapp,
        city: formData.cidade,
        paraQuem: formData.paraQuem,
        fallbackSource: "Website Home",
      });

      setFormData({ nome: "", whatsapp: "", cidade: "", paraQuem: "" });
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar seus dados agora. Tente novamente.",
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleOpenSuccessWhatsApp = () => {
    const encodedMessage = encodeURIComponent(FORM_WHATSAPP_MESSAGE);
    const whatsappUrl = `https://wa.me/${BRAZIL_WHATSAPP_PHONE}?text=${encodedMessage}`;

    trackButtonClick("form_success_whatsapp_home", {
      source: "Website Home",
      section: "form_success_modal",
    });

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleTestimonialPrev = () => {
    setTestimonialsIndex((prev) =>
      prev === 0 ? Math.ceil(testimonials.length / testimonialsPerPage) - 1 : prev - 1,
    );
  };

  const handleTestimonialNext = () => {
    setTestimonialsIndex((prev) =>
      prev === Math.ceil(testimonials.length / testimonialsPerPage) - 1 ? 0 : prev + 1,
    );
  };

  const handleScheduleClick = () => {
    trackButtonClick("schedule_button", { section: "hero_section" });
    const contactForm = document.querySelector("#contact-form") as HTMLElement;
    window.scrollTo({ top: contactForm?.offsetTop || 0, behavior: "smooth" });
  };

  const testimonialPageCount = Math.ceil(testimonials.length / testimonialsPerPage);
  const visibleTestimonials = testimonials.slice(
    testimonialsIndex * testimonialsPerPage,
    testimonialsIndex * testimonialsPerPage + testimonialsPerPage,
  );

  return (
    <>
      <NextSeo {...seo} />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="hero-gradient relative overflow-hidden py-16 md:py-28">
          <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-5%] right-[5%] w-96 h-96 bg-auditik-yellow/10 rounded-full blur-3xl"></div>

          <div className="container-wide flex flex-col md:flex-row items-center relative">
            <div className="w-full md:w-1/2 flex justify-center md:justify-start order-2 md:order-1 mb-12 md:mb-0">
              <div className="relative group w-full max-w-[520px]">
                <div className="absolute inset-0 bg-white/40 rounded-[2rem] blur-2xl scale-110 group-hover:scale-115 transition-transform duration-700"></div>
                <div className="relative z-10 overflow-hidden rounded-[2rem] border-8 border-white/80 shadow-2xl bg-white">
                  <Image
                    alt="Mulher usando aparelho auditivo Philips HearLink em um ambiente moderno"
                    src="/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_Angle90_Close-up_In-On-Ear_MS-6152_Woman_1200x800px.jpg"
                    width={1200}
                    height={800}
                    className="w-full h-[320px] md:h-[420px] object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-1000"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 md:pl-16 order-1 md:order-2">
              <span className="inline-block px-4 py-1.5 bg-auditik-blue/10 text-auditik-blue rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Inovação em Saúde Auditiva
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-8">
                Philips HearLink:{" "}
                <span className="text-auditik-blue">Sinta cada detalhe</span> da vida em
                até 21x.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
                Desenvolvemos uma experiência auditiva completa, unindo a inteligência
                artificial da Philips com o atendimento humanizado que você merece.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleScheduleClick}
                  className="min-h-12 w-full sm:w-auto bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-5 px-6 sm:px-10 rounded-full shadow-xl shadow-auditik-yellow/20 flex items-center justify-center gap-3 transition-all hover:-translate-y-1"
                >
                  Agende sua Avaliação
                  <span
                    className="material-symbols-outlined text-red-500 text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    favorite
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white relative">
          <div className="container-wide relative">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                Excelência Philips na Auditik
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                Tecnologia que se adapta ao seu estilo de vida, proporcionando clareza e
                conforto em qualquer ambiente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Feature 1: AI Technology */}
              <div className="bg-white rounded-5xl p-12 flex flex-col items-center text-center layered-card hover:-translate-y-2 transition-all duration-300 group border border-gray-50">
                <div className="w-20 h-20 mb-8 flex items-center justify-center bg-blue-50 rounded-3xl group-hover:bg-auditik-blue transition-colors duration-300">
                  <span className="material-symbols-outlined text-auditik-blue text-4xl group-hover:text-white transition-colors">
                    memory
                  </span>
                </div>
                <h3 className="font-bold text-xl text-slate-800 mb-4">Tecnologia IA</h3>
                <p className="text-slate-500 leading-relaxed">
                  Processamento de som inteligente que prioriza a fala humana em
                  ambientes ruidosos.
                </p>
              </div>

              {/* Feature 2: Discretion */}
              <div className="bg-white rounded-5xl p-12 flex flex-col items-center text-center layered-card hover:-translate-y-2 transition-all duration-300 group border border-gray-50">
                <div className="w-20 h-20 mb-8 flex items-center justify-center bg-yellow-50 rounded-3xl group-hover:bg-auditik-yellow transition-colors duration-300">
                  <span className="material-symbols-outlined text-auditik-yellow text-4xl group-hover:text-slate-900 transition-colors">
                    visibility_off
                  </span>
                </div>
                <h3 className="font-bold text-xl text-slate-800 mb-4">
                  Discrição Total
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  Designs anatômicos e ultrapequenos que desaparecem no ouvido com
                  máximo conforto.
                </p>
              </div>

              {/* Feature 3: Custom Adjustment */}
              <div className="bg-white rounded-5xl p-12 flex flex-col items-center text-center layered-card hover:-translate-y-2 transition-all duration-300 group border border-gray-50">
                <div className="w-20 h-20 mb-8 flex items-center justify-center bg-green-50 rounded-3xl group-hover:bg-green-500 transition-colors duration-300">
                  <span className="material-symbols-outlined text-green-600 text-4xl group-hover:text-white transition-colors">
                    settings_input_component
                  </span>
                </div>
                <h3 className="font-bold text-xl text-slate-800 mb-4">
                  Ajuste sob Medida
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  Calibração personalizada realizada por fonoaudiólogos experientes para
                  sua necessidade única.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-bg-light-blue overflow-hidden">
          <div className="container-wide">
            <div className="flex flex-col items-center mb-20">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 mb-4">
                Histórias que nos inspiram
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-auditik-yellow">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-400 ml-2">
                  Nota máxima no Google
                </span>
              </div>
            </div>

            <div className="relative px-4 lg:px-10">
              <button
                onClick={() => {
                  handleTestimonialPrev();
                  trackButtonClick("testimonial_prev", { section: "testimonials" });
                }}
                className="absolute left-2 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-auditik-blue shadow-lg transition-all hover:bg-auditik-blue hover:text-white lg:flex"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>

              <button
                onClick={() => {
                  handleTestimonialNext();
                  trackButtonClick("testimonial_next", { section: "testimonials" });
                }}
                className="absolute right-2 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-auditik-blue shadow-lg transition-all hover:bg-auditik-blue hover:text-white lg:flex"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
                {visibleTestimonials.map((testimonial, offset) => {
                  const colorClass =
                    testimonial.color === "blue"
                      ? "bg-auditik-blue text-white scale-105 z-20 shadow-2xl shadow-auditik-blue/30"
                      : "bg-white hover:scale-[1.02]";

                  return (
                    <div
                      key={`${testimonial.author}-${offset}`}
                      className={`rounded-4xl p-10 pt-16 shadow-xl relative transition-all duration-300 ${colorClass}`}
                    >
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                        <div className="p-1 bg-white rounded-full shadow-lg">
                          <Image
                            alt={testimonial.author}
                            src={testimonial.image}
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full object-cover"
                          />
                        </div>
                      </div>

                      <div
                        className={`text-7xl font-serif absolute top-8 left-8 leading-none select-none ${
                          testimonial.color === "blue"
                            ? "text-white/10"
                            : "text-auditik-blue/10"
                        }`}
                      >
                        "
                      </div>
                      <p
                        className={`text-center mb-8 italic leading-relaxed relative z-10 ${
                          testimonial.color === "blue" ? "text-white" : "text-slate-600"
                        }`}
                      >
                        "{testimonial.text}"
                      </p>
                      <div
                        className={`text-center border-t ${
                          testimonial.color === "blue"
                            ? "border-white/10 pt-6"
                            : "border-gray-100 pt-6"
                        }`}
                      >
                        <p
                          className={`font-extrabold ${
                            testimonial.color === "blue"
                              ? "text-white"
                              : "text-slate-800"
                          }`}
                        >
                          {testimonial.author}
                        </p>
                        <p
                          className={`text-xs uppercase tracking-widest mt-1 ${
                            testimonial.color === "blue"
                              ? "text-white/60"
                              : "text-slate-400"
                          }`}
                        >
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center gap-3 mt-16">
                {Array.from({ length: testimonialPageCount }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setTestimonialsIndex(index);
                      trackButtonClick(`testimonial_dot_${index}`, {
                        section: "testimonials",
                      });
                    }}
                    className={`min-h-11 min-w-11 rounded-full cursor-pointer transition-colors hover:bg-auditik-blue ${
                      index === testimonialsIndex
                        ? "w-8 h-2.5 bg-auditik-blue"
                        : "w-2.5 h-2.5 bg-gray-200"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-white" id="contact-form">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row gap-16 items-stretch">
              <div className="flex-1">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
                  Vamos conversar?
                </h2>
                <p className="text-slate-500 mb-10 text-lg">
                  Deixe seus dados e nossa equipe entrará em contato para agendar uma
                  conversa acolhedora.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-4">
                      Nome
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleFormChange}
                      placeholder="Como gostaria de ser chamado(a)?"
                      required
                      className="w-full px-8 py-5 rounded-3xl border-gray-100 bg-slate-50 focus:ring-2 focus:ring-auditik-blue/20 focus:border-auditik-blue focus:bg-white transition-all outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-4">
                        Seu Telefone com DDD
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleFormChange}
                        placeholder="(00) 00000-0000"
                        maxLength={15}
                        required
                        className="w-full px-8 py-5 rounded-3xl border-gray-100 bg-slate-50 focus:ring-2 focus:ring-auditik-blue/20 focus:border-auditik-blue focus:bg-white transition-all outline-none"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-4">
                        Sua Cidade
                      </label>
                      <select
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleFormChange}
                        required
                        className="w-full px-8 py-5 rounded-3xl border-gray-100 bg-slate-50 focus:ring-2 focus:ring-auditik-blue/20 focus:border-auditik-blue focus:bg-white transition-all outline-none cursor-pointer"
                      >
                        <option value="">Selecione uma cidade</option>
                        {WHATSAPP_LEAD_CITIES.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-4">
                      Para quem será o aparelho auditivo?
                    </label>
                    <select
                      name="paraQuem"
                      value={formData.paraQuem}
                      onChange={handleFormChange}
                      required
                      className="w-full px-8 py-5 rounded-3xl border-gray-100 bg-slate-50 focus:ring-2 focus:ring-auditik-blue/20 focus:border-auditik-blue focus:bg-white transition-all outline-none cursor-pointer"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="Para eu mesmo(a)">Para eu mesmo(a)</option>
                      <option value="Para um amigo ou familiar">
                        Para um amigo ou familiar
                      </option>
                      <option value="Para outra pessoa">Para outra pessoa</option>
                    </select>
                  </div>

                  {formError && (
                    <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                      {formError}
                    </p>
                  )}

                  {/* #TODO Pensar onde direcionar o formulário, talvez para um CRM ou Google Sheets */}
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full min-h-12 bg-auditik-yellow hover:bg-yellow-400 disabled:bg-gray-300 text-slate-900 font-extrabold py-6 rounded-3xl shadow-xl shadow-auditik-yellow/10 transition-all hover:scale-[1.01] active:scale-[0.99] uppercase tracking-widest disabled:cursor-not-allowed"
                  >
                    {formSubmitting ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      "Quero agendar minha avaliação"
                    )}
                  </button>
                </form>
              </div>

              <div className="lg:w-[450px]">
                <div className="bg-auditik-blue rounded-[3rem] p-12 h-full flex flex-col items-center justify-center text-center text-white relative overflow-hidden group shadow-2xl shadow-auditik-blue/20">
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-auditik-yellow/5 rounded-full blur-3xl"></div>

                  <div className="mb-10 relative">
                    <div className="w-28 h-28 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 animate-pulse">
                      <svg
                        className="w-14 h-14"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.414z"></path>
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-3xl font-extrabold mb-4">Dúvidas rápidas?</h3>
                  <p className="text-blue-100 mb-10 px-6">
                    Estamos online agora mesmo para te atender pelo WhatsApp.
                  </p>
                  <WhatsAppLeadButton
                    buttonName="whatsapp_button"
                    leadSource="Website Home"
                    trackingParams={{ section: "contact_section" }}
                    whatsappMessage="Olá Auditik, gostaria de saber mais sobre os aparelhos auditivos Philips HearLink."
                    className="min-h-12 bg-white text-auditik-blue font-bold py-5 px-10 rounded-3xl shadow-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2 group-hover:scale-105"
                  >
                    Iniciar Conversa
                    <span className="material-symbols-outlined text-sm">
                      open_in_new
                    </span>
                  </WhatsAppLeadButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="pb-24 bg-white">
          <div className="container-wide">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 mb-4">
                Nossas Unidades
              </h2>
              <p className="text-center text-slate-500 text-lg max-w-2xl mx-auto">
                Visite-nos em uma de nossas unidades e conheça de perto nossa equipe de
                especialistas.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="bg-bg-light-blue border border-blue-50 rounded-4xl p-10 flex items-start gap-8 transition-all hover:shadow-xl hover:shadow-blue-900/5 group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-auditik-blue shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-3xl">
                      location_on
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-800 mb-3">
                      {location.name}
                    </h3>
                    <p className="text-slate-500 mb-6 leading-relaxed">
                      {location.address}
                      <br />
                      {location.city}
                    </p>
                    <a
                      href={location.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackButtonClick(`location_${index}`, { section: "locations" })
                      }
                      className="inline-flex min-h-11 items-center px-2 text-auditik-blue font-bold gap-2 group-hover:gap-4 transition-all"
                    >
                      Ver no Google Maps
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <LeadSubmitSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onOpenWhatsApp={handleOpenSuccessWhatsApp}
      />

      {/* Footer */}
      <footer className="bg-auditik-blue text-white pt-20 pb-10">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-white/10">
            <div className="space-y-6">
              <div className="text-white flex items-center font-extrabold text-2xl tracking-tight select-none cursor-default">
                <span className="mr-2">
                  <Image
                    src="/images/logo-auditik-short.png"
                    alt="Auditik logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                    priority
                  />
                </span>
                Auditik
              </div>
              <p className="text-blue-100/60 text-sm leading-relaxed max-w-xs">
                Especialistas em devolver a alegria de ouvir através de tecnologia de
                ponta e cuidado humanizado.
              </p>
              <div className="flex gap-4">
                <a
                  className="min-h-11 min-w-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all"
                  href="https://www.facebook.com/auditik.piracicaba"
                  onClick={() =>
                    trackButtonClick("social_facebook", { section: "footer" })
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook Auditik"
                >
                  <Image
                    src="/images/icons/facebook.png"
                    alt="Facebook"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </a>
                <a
                  className="min-h-11 min-w-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all"
                  href="https://www.instagram.com/auditik.piracicaba"
                  onClick={() =>
                    trackButtonClick("social_instagram", { section: "footer" })
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram Auditik"
                >
                  <Image
                    src="/images/icons/instagram.png"
                    alt="Instagram"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </a>
                <a
                  className="min-h-11 min-w-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all"
                  href="https://www.youtube.com/@auditik"
                  onClick={() =>
                    trackButtonClick("social_youtube", { section: "footer" })
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  title="YouTube Auditik"
                >
                  <Image
                    src="/images/icons/youtube.png"
                    alt="YouTube"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Central de Atendimento</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+551933776941"
                    className="inline-flex min-h-11 items-center gap-3 px-2 text-blue-100/80 hover:text-white transition-colors"
                    onClick={() =>
                      trackButtonClick("phone_footer", { section: "footer" })
                    }
                    aria-label="Ligar para Auditik no número (19) 3377-6941"
                  >
                    <span className="material-symbols-outlined text-xl">call</span>
                    <span className="text-sm font-medium">(19) 3377-6941</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:atendimento@auditik.com.br"
                    className="inline-flex min-h-11 items-center gap-3 px-2 text-blue-100/80 hover:text-white transition-colors"
                    onClick={() =>
                      trackButtonClick("email_footer", { section: "footer" })
                    }
                    aria-label="Enviar e-mail para atendimento@auditik.com.br"
                  >
                    <span className="material-symbols-outlined text-xl">mail</span>
                    <span className="text-sm font-medium">
                      atendimento@auditik.com.br
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-blue-100/80 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-xl">schedule</span>
                  <span className="text-sm font-medium">Seg - Sex: 08h às 17h</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Navegação</h4>
              <ul className="grid grid-cols-2 gap-4">
                <li>
                  <Link
                    href="/nossa-clinica"
                    className="inline-flex min-h-11 items-center py-1 text-sm text-blue-100/80 hover:text-white transition-colors"
                  >
                    Nossa Clínica
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aparelhos"
                    className="inline-flex min-h-11 items-center py-1 text-sm text-blue-100/80 hover:text-white transition-colors"
                  >
                    Aparelhos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/convenios"
                    className="inline-flex min-h-11 items-center py-1 text-sm text-blue-100/80 hover:text-white transition-colors"
                  >
                    Convênios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="inline-flex min-h-11 items-center py-1 text-sm text-blue-100/80 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politica-de-privacidade"
                    className="inline-flex min-h-11 items-center py-1 text-sm text-blue-100/80 hover:text-white transition-colors"
                  >
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-10 gap-4">
            <p className="text-xs text-blue-200/40 uppercase tracking-widest font-bold">
              © Copyright Auditik 2024
            </p>
            <div className="flex gap-6">
              <span className="text-[10px] text-blue-200/30 font-bold uppercase tracking-widest">
                Sua saúde auditiva em boas mãos
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
