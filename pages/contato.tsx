import { NextSeo } from "next-seo";
import { getSEOMeta } from "@lib/seo";
import { generateLocalBusinessSchema } from "@lib/schema";
import { trackFormSubmit, trackConversion, CONVERSION_GOALS } from "@lib/analytics";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { Header } from "@components/Header";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const seo = getSEOMeta({
    title: "Contato - Auditik",
    description:
      "Entre em contato com a Auditik. Tire suas dúvidas sobre aparelhos auditivos, agende uma avaliação gratuita ou visite nossas unidades em Piracicaba e Americana.",
  });

  const piracicabaSchema = generateLocalBusinessSchema("piracicaba");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Track form submission
    trackFormSubmit("contact", {
      page: "contato",
      fields: Object.keys(formData).length,
    });

    // Track conversion goal
    trackConversion(CONVERSION_GOALS.CONTACT_FORM_SUBMIT, {
      page: "contato",
      user_location: "unknown",
    });

    console.log("Form submitted:", formData);
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
        <section className="page-section hero-gradient">
          <div className="container-wide">
            <h1>Entrar em Contato</h1>
            <p>Tire suas dúvidas e agende uma avaliação gratuita</p>
          </div>
        </section>

        <section className="page-section">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2>Envie uma Mensagem</h2>
                {submitted && (
                  <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                    ✓ Mensagem enviada com sucesso! Entraremos em contato em breve.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Nome</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Telefone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="(XX) XXXXX-XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Mensagem</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Sua mensagem..."
                      rows={5}
                    />
                  </div>
                  <button type="submit" className="cta-button-primary w-full">
                    Enviar Mensagem
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <h2>Informações de Contato</h2>
                <div className="space-y-8 mt-8">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Piracicaba</h3>
                    <p className="text-gray-600 mb-2">
                      Rua de Cavvarteira, 320
                      <br />
                      Centro, Piracicaba - SP
                    </p>
                    <p className="text-auditik-blue font-bold">(91) 9977-4156</p>
                    <a
                      href="https://wa.me/5591399774156"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 font-bold mt-2 inline-block"
                    >
                      💬 Abrir WhatsApp
                    </a>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">Americana</h3>
                    <p className="text-gray-600 mb-2">
                      Rua Praras de Carellho, 3338
                      <br />
                      Vila Santa Catarina, Americana - SP
                    </p>
                    <p className="text-auditik-blue font-bold">(91) 9977-4156</p>
                    <a
                      href="https://wa.me/5591399774156"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 font-bold mt-2 inline-block"
                    >
                      💬 Abrir WhatsApp
                    </a>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">Horário de Atendimento</h3>
                    <p className="text-gray-600">
                      Segunda a Sexta: 08:00 - 18:00
                      <br />
                      Sábado: 09:00 - 13:00
                      <br />
                      Domingo: Fechado
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2">Email</h3>
                    <a
                      href="mailto:atendimento@auditik.com.br"
                      className="text-auditik-blue font-bold"
                    >
                      atendimento@auditik.com.br
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
