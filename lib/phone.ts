import { getLocales } from "expo-localization";
import {
  CountryCode,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";

const FALLBACK_COUNTRY = "NG" as CountryCode;

function isCountryCode(value?: string | null): value is CountryCode {
  if (!value || !/^[A-Z]{2}$/.test(value)) {
    return false;
  }

  try {
    getCountryCallingCode(value as CountryCode);
    return true;
  } catch {
    return false;
  }
}

function extractCountryFromLanguageTag(languageTag?: string | null) {
  if (!languageTag) {
    return null;
  }

  const parts = languageTag.split(/[-_]/);
  for (const part of parts.slice(1)) {
    const normalizedPart = part.toUpperCase();
    if (isCountryCode(normalizedPart)) {
      return normalizedPart;
    }
  }

  return null;
}

export function resolveDeviceCountryCode() {
  const locale = getLocales().find((entry) => {
    const regionCandidate =
      entry.regionCode ?? extractCountryFromLanguageTag(entry.languageTag);

    return isCountryCode(regionCandidate);
  });

  const regionCandidate =
    locale?.regionCode ?? extractCountryFromLanguageTag(locale?.languageTag);

  if (isCountryCode(regionCandidate)) {
    return regionCandidate;
  }

  return FALLBACK_COUNTRY;
}

export function getPhoneCountryConfig(country = resolveDeviceCountryCode()) {
  return {
    country,
    dialCode: `+${getCountryCallingCode(country)}`,
  };
}

export function formatNationalNumberToE164(
  nationalNumber: string,
  country = resolveDeviceCountryCode(),
) {
  const parsedPhoneNumber = parsePhoneNumberFromString(nationalNumber, country);

  if (parsedPhoneNumber?.number) {
    return parsedPhoneNumber.number;
  }

  const digitsOnly = nationalNumber.replace(/\D/g, "");
  if (!digitsOnly) {
    return null;
  }

  return `+${getCountryCallingCode(country)}${digitsOnly.replace(/^0+/, "")}`;
}

export function getNationalNumberFromE164(
  phoneE164: string,
  country = resolveDeviceCountryCode(),
) {
  const parsedPhoneNumber = parsePhoneNumberFromString(phoneE164);

  if (parsedPhoneNumber?.country === country) {
    return parsedPhoneNumber.nationalNumber;
  }

  const dialCode = `+${getCountryCallingCode(country)}`;
  if (phoneE164.startsWith(dialCode)) {
    return phoneE164.slice(dialCode.length);
  }

  return phoneE164.replace(/\D/g, "");
}

export function sanitizeNationalPhoneInput(value: string) {
  return value.replace(/[^\d]/g, "");
}
