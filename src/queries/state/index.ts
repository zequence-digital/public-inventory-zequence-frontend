import type { AllCountries, AllStates, LgaByState } from "@/types";
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { getAllCountries, getAllLgaByState, getAllStates } from "./actions";

import stateKeys from "./state-keys";

function useCountries(
  options?: Omit<
    UndefinedInitialDataOptions<AllCountries, Error, AllCountries, string[]>,
    "queryKey"
  >,
) {
  const hash = [stateKeys.read];
  return useQuery({
    queryKey: hash,
    queryFn: getAllCountries,
    ...options,
  });
}

function useAllStates(
  countryCode: string,
  options?: Omit<
    UndefinedInitialDataOptions<AllStates, Error, AllStates, string[]>,
    "queryKey"
  >,
) {
  const hash = [stateKeys.read, countryCode];
  return useQuery({
    queryKey: hash,
    queryFn: () => getAllStates(countryCode),
    staleTime: 1000 * 60 * 60 * 24 * 7,
    enabled: !!countryCode,
    ...options,
  });
}

function useAllStatesLga(
  countryCode: string,
  state: string,
  options?: Omit<
    UndefinedInitialDataOptions<LgaByState, Error, LgaByState, string[]>,
    "queryKey"
  >,
) {
  const hash = [stateKeys.readOne, state];
  return useQuery({
    queryKey: hash,
    queryFn: () => getAllLgaByState(countryCode, state),
    enabled: !!state,
    ...options,
  });
}

export { useAllStates, useAllStatesLga, useCountries };
