import { ref } from "vue";
import { getMe } from "../services/authService.js";

const user = ref(null);

// Start fetch så snart modulet importeres — deles på tværs af alle komponenter
// userReady resolver når den initielle fetch er færdig (bruges af route guard)
export const userReady = getMe()
  .then((data) => { user.value = data; })
  .catch(() => { user.value = null; });

export function useCurrentUser() {
  return { user };
}

// Kaldes efter login — henter ny bruger med den nye cookie
export async function refreshCurrentUser() {
  try {
    user.value = await getMe();
  } catch {
    user.value = null;
  }
}

// Kaldes ved logout — nulstiller state
export function clearCurrentUser() {
  user.value = null;
}
