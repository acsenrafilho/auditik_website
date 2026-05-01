export interface ConvenioTagOption {
  value: string;
  label: string;
}

export const CONVENIO_CITIES = [
  { value: "piracicaba", label: "Piracicaba" },
  { value: "americana", label: "Americana" },
  { value: "santa-barbara-d-oeste", label: "Santa Bárbara d'Oeste" },
  { value: "limeira", label: "Limeira" },
  { value: "rio-claro", label: "Rio Claro" },
  { value: "sao-pedro", label: "São Pedro" },
  { value: "aguas-de-sao-pedro", label: "Águas de São Pedro" },
  { value: "charqueada", label: "Charqueada" },
] as const satisfies readonly ConvenioTagOption[];

export const CONVENIO_AREAS = [
  { value: "saude", label: "Saúde" },
  { value: "tecnologia", label: "Tecnologia" },
  { value: "servicos-empresariais", label: "Serviços Empresariais" },
  { value: "alimentacao", label: "Alimentação" },
  { value: "servicos-pessoais", label: "Serviços Pessoais" },
  { value: "educacao", label: "Educação" },
  { value: "bem-estar", label: "Bem-estar" },
] as const satisfies readonly ConvenioTagOption[];

export const CONVENIO_BENEFIT_TYPES = [
  { value: "desconto", label: "Desconto" },
  { value: "cashback", label: "Cashback" },
  { value: "servico-gratuito", label: "Serviço gratuito" },
  { value: "upgrade", label: "Upgrade" },
  { value: "beneficio-exclusivo", label: "Benefício exclusivo" },
] as const satisfies readonly ConvenioTagOption[];

export const CONVENIO_CLIENT_PROFILES = [
  { value: "idosos", label: "Idosos" },
  { value: "familias", label: "Famílias" },
  { value: "estudantes", label: "Estudantes" },
  { value: "empresas", label: "Empresas" },
  { value: "publico-geral", label: "Público geral" },
] as const satisfies readonly ConvenioTagOption[];
