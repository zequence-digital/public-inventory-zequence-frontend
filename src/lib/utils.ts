import { type ClassValue, clsx } from "clsx";
import { formatDistance } from "date-fns";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatNumber(number: number) {
  return new Intl.NumberFormat().format(number);
}

function formatDateDifference(inputDate: string): string {
  if (!inputDate) return "";
  const date = new Date(inputDate);
  return formatDistance(date, new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });
}

const formatNumberInput = (value: string): string => {
  return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatName = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// format date like this 12 Dec 2023, 9:30AM or PM

function formatDate(date: string) {
  if (!date) return "";
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.toLocaleString("default", { month: "short" });
  const year = newDate.getFullYear();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${day} ${month} ${year}, ${formattedHours}:${formattedMinutes}${ampm}`;
}

function formatCurrency(amount: number) {
  const formattedAmount = parseFloat(amount?.toFixed(2));

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(formattedAmount);
}

export {
  cn,
  formatCurrency,
  formatDate,
  formatDateDifference,
  formatName,
  formatNumber,
  formatNumberInput,
};
