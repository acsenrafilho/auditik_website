import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js/max";

const REGION = "BR";
const BRAZIL_CC = "55";

export const stripBrazilDigits = (value: string): string =>
  String(value || "").replace(/\D/g, "");

/**
 * National 10–11 digits for the conversion-sheet payload.
 * Empty when the number is not a valid Brazilian phone.
 */
export const normalizeBrazilPhone = (value: string): string => {
  const parsed = parsePhoneNumberFromString(String(value || "").trim(), REGION);
  if (!parsed || !parsed.isValid() || parsed.country !== REGION) {
    return "";
  }
  return String(parsed.nationalNumber || "");
};

export const isValidBrazilPhone = (value: string): boolean =>
  Boolean(normalizeBrazilPhone(value));

export const formatBrazilPhone = (value: string): string => {
  const digits = stripBrazilDigits(value).slice(0, 13);
  if (!digits) return "";

  const formatter = new AsYouType(REGION);
  if (digits.startsWith(BRAZIL_CC) && digits.length > BRAZIL_CC.length + 2) {
    return formatter.input(`+${digits}`);
  }
  return formatter.input(digits);
};
