import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { Header } from "@components/Header";
import {
  trackFormSubmit,
  trackConversion,
  CONVERSION_GOALS,
  trackButtonClick,
} from "@lib/analytics";
import { getSEOMeta } from "@lib/seo";
import { generateLocalBusinessSchema } from "@lib/schema";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    cidade: "",
    paraQuem: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const seo = getSEOMeta({
    title: "Contato - Auditik",
    description:
      "Entre em contato com a Auditik e agende sua avaliação auditiva. Atendimento humanizado em Piracicaba, Americana, São Pedro e Charqueada.",
  });

  const piracicabaSchema = generateLocalBusinessSchema("piracicaba");

  const locations = [
    {
      name: "Unidade Piracicaba",
      address: "Rua Samuel Neves, 1800",
      city: "Jardim Europa, Piracicaba - SP",
      maps: "https://maps.app.goo.gl/c6EiqgiPaQg3HUrK8",
    },
    {
      name: "Unidade Americana",
      address: "Rua Luisa Meneghel Mancine, 72 - Sala 12",
      city: "Jardim Paulista, Americana - SP",
      maps: "https://maps.app.goo.gl/j4sTcPKXbBirS1JUA",
    },
    {
      name: "Unidade Sao Pedro",
      address: "Rua Malaquias Guerra, 290",
      city: "Centro, Sao Pedro - SP",
      maps: "https://maps.app.goo.gl/8p4JUU1WWaR4KMNaA",
    },
    {
      name: "Unidade Charqueada",
      address: "Avenida Brasil, 151",
      city: "Centro, Charqueada - SP",
      maps: "https://maps.app.goo.gl/LUpi8CYH7kw4BYom8",
    },
  ];

  const formatPhoneNumber = (value: string): string => {
    const phoneNumber = value.replace(/\D/g, "");

    if (phoneNumber.length <= 2) {
      return phoneNumber;
    }
    if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    }
    if (phoneNumber.length <= 10) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
        2,
        6,
      )}-${phoneNumber.slice(6)}`;
    }

    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(
      7,
      11,
    )}`;
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "whatsapp") {
      setFormData((prev) => ({ ...prev, whatsapp: formatPhoneNumber(value) }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    trackFormSubmit("contact", {
      page: "contato",
      cidade: formData.cidade,
      para_quem: formData.paraQuem,
    });

    trackConversion(CONVERSION_GOALS.CONTACT_FORM_SUBMIT, {
      page: "contato",
      user_location: "unknown",
    });

    console.log("Form submitted:", formData);
    setFormData({ nome: "", whatsapp: "", cidade: "", paraQuem: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <NextSeo {...seo} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(piracicabaSchema) }}
        />
      </Head>

      <Header />

      <main>
        <section className="hero-gradient relative overflow-hidden py-20 md:py-24">
          <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-15%] right-[5%] w-96 h-96 bg-auditik-yellow/10 rounded-full blur-3xl"></div>

          <div className="container-wide relative">
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 bg-auditik-blue/10 text-auditik-blue rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Atendimento Humanizado
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                Fale com a Auditik e agende sua avaliação auditiva{" "}
                <span className="text-auditik-blue">sem custo</span>.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
                Nossa equipe esta pronta para orientar voce sobre os aparelhos auditivos
                Philips HearLink e indicar a melhor opcao para cada necessidade.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white" id="contact-form">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row gap-16 items-stretch">
              <div className="flex-1">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
                  Vamos conversar?
                </h2>
                <p className="text-slate-500 mb-10 text-lg">
                  Deixe seus dados e nossa equipe entrara em contato para agendar uma
                  conversa acolhedora.
                </p>

                {submitted && (
                  <div className="bg-green-100 text-green-700 p-4 rounded-2xl mb-6 font-semibold">
                    Sua mensagem foi enviada com sucesso. Entraremos em contato em
                    breve.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        <option value="Piracicaba">Piracicaba</option>
                        <option value="Americana">Americana</option>
                        <option value="Santa Barbara d'Oeste">
                          Santa Barbara d'Oeste
                        </option>
                        <option value="Nova Odessa">Nova Odessa</option>
                        <option value="Sumare">Sumare</option>
                        <option value="Campinas">Campinas</option>
                        <option value="Paulinia">Paulinia</option>
                        <option value="Limeira">Limeira</option>
                        <option value="Rio Claro">Rio Claro</option>
                        <option value="Sao Pedro">Sao Pedro</option>
                        <option value="Aguas de Sao Pedro">Aguas de Sao Pedro</option>
                        <option value="Charqueada">Charqueada</option>
                        <option value="Capivari">Capivari</option>
                        <option value="Saltinho">Saltinho</option>
                        <option value="Tiete">Tiete</option>
                        <option value="Outra cidade">Outra cidade</option>
                      </select>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-4">
                      Para quem sera o aparelho auditivo?
                    </label>
                    <select
                      name="paraQuem"
                      value={formData.paraQuem}
                      onChange={handleFormChange}
                      required
                      className="w-full px-8 py-5 rounded-3xl border-gray-100 bg-slate-50 focus:ring-2 focus:ring-auditik-blue/20 focus:border-auditik-blue focus:bg-white transition-all outline-none cursor-pointer"
                    >
                      <option value="">Selecione uma opcao</option>
                      <option value="Para eu mesmo(a)">Para eu mesmo(a)</option>
                      <option value="Para um amigo ou familiar">
                        Para um amigo ou familiar
                      </option>
                      <option value="Para outra pessoa">Para outra pessoa</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-extrabold py-6 rounded-3xl shadow-xl shadow-auditik-yellow/10 transition-all hover:scale-[1.01] active:scale-[0.99] uppercase tracking-widest"
                  >
                    Quero agendar minha avaliação
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

                  <h3 className="text-3xl font-extrabold mb-4">Duvidas rapidas?</h3>
                  <p className="text-blue-100 mb-10 px-6">
                    Estamos online agora mesmo para te atender pelo WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/551933776941?text=Ola%20Auditik%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20aparelhos%20auditivos%20Philips%20HearLink."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackButtonClick("whatsapp_button_contato", {
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

        <section className="pb-24 bg-white">
          <div className="container-wide">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 mb-4">
                Nossas Unidades
              </h2>
              <p className="text-center text-slate-500 text-lg max-w-2xl mx-auto">
                Visite-nos em uma de nossas unidades e conheca de perto nossa equipe de
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
                        trackButtonClick(`location_contato_${index}`, {
                          section: "locations",
                        })
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

            <div className="mt-16 bg-auditik-blue rounded-4xl p-8 md:p-10 text-white grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-blue-100/70 font-bold">
                  Redes sociais
                </p>
                <div className="flex gap-4 justify-start">
                  <a
                    className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all"
                    href="https://www.facebook.com/auditik.piracicaba"
                    onClick={() =>
                      trackButtonClick("social_facebook_contato", {
                        section: "contato",
                      })
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook Auditik"
                  >
                    <Image
                      src="/images/icons/facebook.png"
                      alt="Facebook"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </a>
                  <a
                    className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all"
                    href="https://www.instagram.com/auditik.piracicaba"
                    onClick={() =>
                      trackButtonClick("social_instagram_contato", {
                        section: "contato",
                      })
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram Auditik"
                  >
                    <Image
                      src="/images/icons/instagram.png"
                      alt="Instagram"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </a>
                  <a
                    className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all"
                    href="https://www.youtube.com/@auditik"
                    onClick={() =>
                      trackButtonClick("social_youtube_contato", { section: "contato" })
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    title="YouTube Auditik"
                  >
                    <Image
                      src="/images/icons/youtube.png"
                      alt="YouTube"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-blue-100/70 font-bold">
                  Telefone
                </p>
                <p className="text-2xl font-extrabold">(19) 3377-6941</p>
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-blue-100/70 font-bold">
                  Email
                </p>
                <p className="text-lg font-bold">atendimento@auditik.com.br</p>
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-blue-100/70 font-bold">
                  Horario de atendimento
                </p>
                <p className="text-lg font-bold">Seg - Sex: 08h as 17h</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
