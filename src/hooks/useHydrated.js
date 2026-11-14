import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// false during the server prerender and the hydrating client render, true
// afterwards. Use it for UI that depends on localStorage (cart, account) so
// the hydrated markup matches the prerendered HTML.
export default function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
