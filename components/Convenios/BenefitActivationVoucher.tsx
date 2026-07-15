import { forwardRef } from "react";

export interface BenefitActivationVoucherProps {
  firstName: string;
  store: string;
  partnerName: string;
  benefitSummary: string;
  partnerPhone: string;
  partnerAddress: string;
  activatedAtLabel: string;
}

/**
 * Fixed-size printable voucher for Clube de Benefícios activations.
 * Root node is ref-forwarded for html-to-image export.
 */
export const BenefitActivationVoucher = forwardRef<
  HTMLDivElement,
  BenefitActivationVoucherProps
>(function BenefitActivationVoucher(
  {
    firstName,
    store,
    partnerName,
    benefitSummary,
    partnerPhone,
    partnerAddress,
    activatedAtLabel,
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className="box-border flex w-[720px] flex-col overflow-hidden bg-[#fffcf0] font-sans text-slate-900"
      style={{ width: 720, minHeight: 960 }}
    >
      <div className="bg-auditik-blue px-10 pb-8 pt-10 text-white">
        <div className="mb-6 inline-flex rounded-2xl bg-white px-4 py-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-auditik.png"
            alt="Auditik"
            width={140}
            height={42}
            className="h-10 w-auto object-contain"
            crossOrigin="anonymous"
          />
        </div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-auditik-yellow">
          Clube de Benefícios
        </p>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight">
          Benefício ativado
        </h1>
        <p className="mt-2 text-sm text-white/80">
          Comprovante para apresentar ao parceiro
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-6 px-10 py-8">
        <div className="rounded-3xl border border-slate-200/80 bg-white px-6 py-5 shadow-soft">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Cliente
          </p>
          <p className="text-xl font-extrabold text-slate-900">{firstName}</p>
          <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Loja Philips
          </p>
          <p className="text-base font-semibold text-auditik-dark-blue">{store}</p>
          <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Ativado em
          </p>
          <p className="text-base font-semibold text-slate-700">{activatedAtLabel}</p>
        </div>

        <div className="rounded-3xl border border-auditik-blue/15 bg-[#f4f9ff] px-6 py-5">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-auditik-blue">
            Parceiro
          </p>
          <p className="text-xl font-extrabold text-slate-900">{partnerName}</p>

          <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Benefício
          </p>
          <p className="text-base leading-snug text-slate-700">{benefitSummary}</p>

          {partnerPhone ? (
            <>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Telefone do parceiro
              </p>
              <p className="text-base font-semibold text-slate-800">{partnerPhone}</p>
            </>
          ) : null}

          {partnerAddress ? (
            <>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Endereço do parceiro
              </p>
              <p className="text-sm leading-snug text-slate-700">{partnerAddress}</p>
            </>
          ) : null}
        </div>

        <p className="mt-auto text-center text-xs leading-relaxed text-slate-500">
          Este comprovante confirma a solicitação de ativação pelo Clube de Benefícios
          Auditik / Philips Aparelhos Auditivos. Em caso de dúvida, a equipe Auditik
          pode reenviar este documento.
        </p>
      </div>

      <div className="h-2 bg-gradient-to-r from-auditik-blue via-auditik-yellow to-auditik-dark-blue" />
    </div>
  );
});
