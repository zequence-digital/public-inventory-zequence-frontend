import { useReducer } from "react";

const initialState = {
  standard: 5,
  premium: 10,
  enterprise: 129,
};

type Action = {
  type: "standard" | "premium" | "enterprise";
  payload: number;
};

function reducerFn(state: typeof initialState, action: Action) {
  switch (action.type) {
    case "standard":
      return { ...state, standard: action.payload };
    case "premium":
      return { ...state, premium: action.payload };
    case "enterprise":
      return { ...state, enterprise: action.payload };
    default:
      return state;
  }
}
export function useProductBilling() {
  const [{ standard, premium, enterprise }, dispatch] = useReducer(
    reducerFn,
    initialState,
  );

  return {
    standard,
    premium,
    enterprise,
    dispatch,
  };
}
