import { ShipmentStatus } from "@/gql/graphql";

export function toMinorNumber(value: unknown): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : 0;
  }

  if (typeof value === "bigint") {
    return Number(value);
  }

  return 0;
}

export function formatMinorCurrency(value: unknown, currency: string): string {
  const amount = toMinorNumber(value) / 100;

  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export function getTimestamp(dateValue?: string | null): number {
  if (!dateValue) {
    return 0;
  }

  const parsedDate = new Date(dateValue).getTime();
  return Number.isNaN(parsedDate) ? 0 : parsedDate;
}

export function isDateToday(dateValue?: string | null): boolean {
  if (!dateValue) {
    return false;
  }

  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) {
    return false;
  }

  const today = new Date();

  return (
    parsedDate.getFullYear() === today.getFullYear() &&
    parsedDate.getMonth() === today.getMonth() &&
    parsedDate.getDate() === today.getDate()
  );
}

export function formatShipmentStatus(status: ShipmentStatus): string {
  return status
    .toLowerCase()
    .split("_")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export function formatEnumLabel(value?: string | null) {
  if (!value) {
    return "-";
  }

  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatDateTime(value: unknown) {
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString();
}