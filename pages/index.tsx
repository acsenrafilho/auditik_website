import { NextSeo } from "next-seo";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getSEOMeta } from "@lib/seo";
import { trackFormSubmit, trackButtonClick } from "@lib/analytics";
import { Header } from "@components/Header";

export default function Home() {
  const [testimonialsIndex, setTestimonialsIndex] = useState(1);
  const [formData, setFormData] = useState({ nome: "", whatsapp: "", cidade: "" });
  const [formSubmitting, setFormSubmitting] = useState(false);

  const seo = getSEOMeta({
    title: "Auditik - Aparelhos Auditivos Philips HearLink",
    description:
      "Aparelhos auditivos Philips HearLink com IA avançada. Atendimento humanizado em Piracicaba e Americana. Agende sua avaliação gratuita!",
    ogImage:
      "https://lh3.googleusercontent.com/aida/ADBb0ujm3IiiC80F2IAjGlY7KOs-vQWTbFnboie5svMlvTl2zKxwJAun49hElACrkIhMTyg8RQqSckVJaw84J0_M8IcVszIdffURkZbfsIBnwUJdwVJ_G9SVe858Nmi4UnYTi-9yXgEKGumKkDYmoe8JTXJqhYO13QI8d_SqZMITkA6Bfymqq6vZVnKl1pH0KxAQYO1JjXJ8Uo6ISIm4NmhrKN8m36XuY3hLbB0HyhV8WAYG4SJ5v6s-6DpjSjg",
  });

  const testimonials = [
    {
      text: "O atendimento da Auditik transformou minha vida. Voltei a ouvir o canto dos pássaros e a voz dos meus netos com uma nitidez que eu já tinha esquecido.",
      author: "Maria Helena P.",
      location: "Piracicaba, SP",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDIzako-kaYanJ0VtrAlECvfDrS_s7y9u4D_XlMI_XqMOoubQ5w6NFk7zxReSAeDAqkzM1NxN_7OsVd1qI_iPYt2b0Ig9TqWzX_v7V234tx8Z9zUHtgQEkJhhCxvdaMZV0M4_AsuaxFdVT8dliBxtbmqvGZSZGuZcKLQGM6ooPqzuauOdFx1IpaYdwjuJZLUqryqrMW_L88ZvK1BaO5vCYrPe4Jll2umlaDPy-JvWSMiK1BBA2doukOwv0358fSMY2QwKn6ADslgj0",
      color: "white",
    },
    {
      text: "Estava inseguro sobre usar aparelhos, mas a tecnologia Philips é incrivelmente discreta. Hoje me sinto confiante novamente em reuniões de trabalho.",
      author: "Ricardo Sellura",
      location: "Empresário",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC4n5t4mdHF9yYQcYZFsTtdv1j5UQfpgJ6sNAQCfQK8T8aMxTN0bdEdyXJRcC3OIbA0NmhPkE7-9QFs4004MYEEIusw1szankr3JAVeRLBSvO1CYI_taCs8MH7oriNheh7ZVgaYJXkeNbgYmHNr07ceO30Tuk81Uv_Oi0VT_E4nqUpVfHs5OUwclqCq-c2DiqmHtbxc8quHw0OlkeRpKzu24MWwQUSWszhLKTeC0CyIqovSJqiiSlPyvr6cwqFIYKQ8pm4JWgxeMog",
      color: "blue",
    },
    {
      text: "O pós-venda deles é excelente. Me ajudaram em cada passo da adaptação. É nítido que eles se preocupam com o bem-estar do paciente.",
      author: "Soraia G.",
      location: "Americana, SP",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBlIhPz2h3KV6bklwJBgIqNSUEgxwULOODFXblBRELa-PgiY0xK3N_ahjl5gcpMHCyuSxVcOaU2f-5ZS2XsF2PYfiBNFWl0_qkwn090Zf3SUoLJbI3O3H-_HozuFzQ6TmbNup91YhszgRG9QsSkrJkqE95eZQ-_peS3uaGgnZyHnAWOhFexRsv6ED9lZRF9g6dfd3bbOe99z0QA15ud_BPGQfRX5kpnivqnKWsbTRXDLd2dzQ8rNv8gMzochaPNd4-D6NSaO8fLB_E",
      color: "white",
    },
  ];

  const locations = [
    {
      name: "Unidade Piracicaba",
      address: "Rua de Cavvarteira, 320",
      city: "Centro, Piracicaba - SP",
      maps: "#",
    },
    {
      name: "Unidade Americana",
      address: "Rua Praras de Carellho, 3338",
      city: "Vila Santa Catarina, Americana - SP",
      maps: "#",
    },
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      trackFormSubmit("contact_form", {
        nome: formData.nome,
        cidade: formData.cidade,
      });

      // Here you would send form data to your backend or CMS
      console.log("Form submitted:", formData);

      // Reset form
      setFormData({ nome: "", whatsapp: "", cidade: "" });
      alert("Obrigado! Nossa equipe entrará em contato em breve.");
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleTestimonialPrev = () => {
    setTestimonialsIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleTestimonialNext = () => {
    setTestimonialsIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleScheduleClick = () => {
    trackButtonClick("schedule_button", { section: "hero_section" });
    const contactForm = document.querySelector("#contact-form") as HTMLElement;
    window.scrollTo({ top: contactForm?.offsetTop || 0, behavior: "smooth" });
  };

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
              <div className="relative group">
                <div className="absolute inset-0 bg-white/40 rounded-full blur-2xl scale-110 group-hover:scale-125 transition-transform duration-700"></div>
                <div className="rounded-full overflow-hidden border-[12px] border-white/80 shadow-2xl w-72 h-72 md:w-96 md:h-96 relative z-10">
                  <Image
                    alt="Woman discovering joy of hearing with Philips HearLink"
                    src="https://lh3.googleusercontent.com/aida/ADBb0ujm3IiiC80F2IAjGlY7KOs-vQWTbFnboie5svMlvTl2zKxwJAun49hElACrkIhMTyg8RQqSckVJaw84J0_M8IcVszIdffURkZbfsIBnwUJdwVJ_G9SVe858Nmi4UnYTi-9yXgEKGumKkDYmoe8JTXJqhYO13QI8d_SqZMITkA6Bfymqq6vZVnKl1pH0KxAQYO1JjXJ8Uo6ISIm4NmhrKN8m36XuY3hLbB0HyhV8WAYG4SJ5v6s-6DpjSjg"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
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
                <span className="text-auditik-blue">Sinta cada detalhe</span> do som em
                até 21x.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
                Desenvolvemos uma experiência auditiva completa, unindo a inteligência
                artificial da Philips com o atendimento humanizado que você merece.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleScheduleClick}
                  className="bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-5 px-10 rounded-full shadow-xl shadow-auditik-yellow/20 flex items-center justify-center gap-3 transition-all hover:-translate-y-1"
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
          <div className="container-wide relative">
            <div className="flex flex-col items-center mb-16">
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
                  5.0 de 5 no Google
                </span>
              </div>
            </div>

            <div className="relative px-4">
              <button
                onClick={() => {
                  handleTestimonialPrev();
                  trackButtonClick("testimonial_prev", { section: "testimonials" });
                }}
                className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white w-14 h-14 rounded-full flex items-center justify-center text-auditik-blue shadow-lg hover:bg-auditik-blue hover:text-white transition-all hidden lg:flex"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>

              <button
                onClick={() => {
                  handleTestimonialNext();
                  trackButtonClick("testimonial_next", { section: "testimonials" });
                }}
                className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white w-14 h-14 rounded-full flex items-center justify-center text-auditik-blue shadow-lg hover:bg-auditik-blue hover:text-white transition-all hidden lg:flex"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`rounded-4xl p-10 pt-16 shadow-xl relative transition-all duration-300 ${
                      testimonial.color === "blue"
                        ? "bg-auditik-blue text-white scale-105 z-20 shadow-2xl shadow-auditik-blue/30"
                        : "bg-white hover:scale-[1.02]"
                    } ${
                      index !== testimonialsIndex ? "opacity-50 md:opacity-100" : ""
                    }`}
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
                          testimonial.color === "blue" ? "text-white" : "text-slate-800"
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
                ))}
              </div>

              <div className="flex justify-center gap-3 mt-16">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setTestimonialsIndex(index);
                      trackButtonClick(`testimonial_dot_${index}`, {
                        section: "testimonials",
                      });
                    }}
                    className={`rounded-full cursor-pointer hover:bg-auditik-blue transition-colors ${
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
                      Nome Completo
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
                        Seu WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleFormChange}
                        placeholder="(00) 00000-0000"
                        required
                        className="w-full px-8 py-5 rounded-3xl border-gray-100 bg-slate-50 focus:ring-2 focus:ring-auditik-blue/20 focus:border-auditik-blue focus:bg-white transition-all outline-none"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-4">
                        Sua Cidade
                      </label>
                      <input
                        type="text"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleFormChange}
                        placeholder="Ex: Americana"
                        required
                        className="w-full px-8 py-5 rounded-3xl border-gray-100 bg-slate-50 focus:ring-2 focus:ring-auditik-blue/20 focus:border-auditik-blue focus:bg-white transition-all outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full bg-auditik-yellow hover:bg-yellow-400 disabled:bg-gray-300 text-slate-900 font-extrabold py-6 rounded-3xl shadow-xl shadow-auditik-yellow/10 transition-all hover:scale-[1.01] active:scale-[0.99] uppercase tracking-widest"
                  >
                    {formSubmitting ? "Enviando..." : "Quero agendar minha avaliação"}
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
                  <a
                    href="https://wa.me/5591999774156"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackButtonClick("whatsapp_button", {
                        section: "contact_section",
                      })
                    }
                    className="bg-white text-auditik-blue font-bold py-5 px-10 rounded-3xl shadow-lg hover:bg-gray-50 transition-all flex items-center gap-2 group-hover:scale-105"
                  >
                    Iniciar Conversa
                    <span className="material-symbols-outlined text-sm">
                      open_in_new
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="pb-24 bg-white">
          <div className="container-wide">
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
                      onClick={() =>
                        trackButtonClick(`location_${index}`, { section: "locations" })
                      }
                      className="text-auditik-blue font-bold flex items-center gap-2 group-hover:gap-4 transition-all"
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

      {/* Footer */}
      <footer className="bg-auditik-blue text-white pt-20 pb-10">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-white/10">
            <div className="space-y-6">
              <Link
                href="/"
                className="text-white flex items-center font-extrabold text-2xl tracking-tight"
              >
                <span className="mr-2">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                    <path d="M12 6c-3.31 0-6 2.69-6 6 0 1.66.67 3.16 1.76 4.24l1.42-1.42C8.44 14.11 8 13.11 8 12c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.11-.44 2.11-1.18 2.82l1.42 1.42C17.33 15.16 18 13.66 18 12c0-3.31-2.69-6-6-6z"></path>
                  </svg>
                </span>
                Auditik
              </Link>
              <p className="text-blue-100/60 text-sm leading-relaxed max-w-xs">
                Especialistas em devolver a alegria de ouvir através de tecnologia de
                ponta e cuidado humanizado.
              </p>
              <div className="flex gap-4">
                <a
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all"
                  href="#"
                  onClick={() =>
                    trackButtonClick("social_facebook", { section: "footer" })
                  }
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z"></path>
                  </svg>
                </a>
                <a
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all"
                  href="#"
                  onClick={() =>
                    trackButtonClick("social_instagram", { section: "footer" })
                  }
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Central de Atendimento</h4>
              <ul className="space-y-4">
                <li
                  className="flex items-center gap-3 text-blue-100/80 hover:text-white transition-colors cursor-pointer"
                  onClick={() =>
                    trackButtonClick("phone_footer", { section: "footer" })
                  }
                >
                  <span className="material-symbols-outlined text-xl">call</span>
                  <span className="text-sm font-medium">(91) 9977-4156</span>
                </li>
                <li
                  className="flex items-center gap-3 text-blue-100/80 hover:text-white transition-colors cursor-pointer"
                  onClick={() =>
                    trackButtonClick("email_footer", { section: "footer" })
                  }
                >
                  <span className="material-symbols-outlined text-xl">mail</span>
                  <span className="text-sm font-medium">
                    atendimento@auditik.com.br
                  </span>
                </li>
                <li className="flex items-center gap-3 text-blue-100/80 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-xl">schedule</span>
                  <span className="text-sm font-medium">Seg - Sex: 08h às 18h</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Navegação</h4>
              <ul className="grid grid-cols-2 gap-4">
                <li>
                  <Link
                    href="/nossa-clinica"
                    className="text-sm text-blue-100/80 hover:text-white transition-colors"
                  >
                    Nossa Clínica
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aparelhos"
                    className="text-sm text-blue-100/80 hover:text-white transition-colors"
                  >
                    Aparelhos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/convenios"
                    className="text-sm text-blue-100/80 hover:text-white transition-colors"
                  >
                    Convênios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-blue-100/80 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm text-blue-100/80 hover:text-white transition-colors"
                  >
                    F.A.Q
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-blue-100/80 hover:text-white transition-colors"
                  >
                    Política
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
