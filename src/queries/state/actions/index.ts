import type { AllCountries, AllStates, LgaByState } from "@/types";

import { apiClient } from "@/services/api";

// get all states in Nigerian

// /generic/states?countryCode=NG'

export async function getAllStates(countryCode: string): Promise<AllStates> {
  const data = await apiClient.get({
    url: `/generic/states?countryCode=${countryCode}`,
    auth: false,
  });
  return data as AllStates;
}

// /generic/state-lga?state=state

export async function getAllLgaByState(
  countryCode: string,
  state: string,
): Promise<LgaByState> {
  const data = await apiClient.get({
    url: `/generic/state-lga?state=${state}&countryCode=${countryCode}`,
    auth: false,
  });
  return data as LgaByState;
}

// /generic/countries

export async function getAllCountries(): Promise<AllCountries> {
  const data = await apiClient.get({
    url: `/generic/countries`,
    auth: false,
  });

  return data as AllCountries;
}
