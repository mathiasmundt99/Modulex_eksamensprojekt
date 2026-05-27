import { ref } from "vue";
import { getMe } from "../services/authService.js";

const user = ref(null);

// Start fetch så snart modulet importeres — deles på tværs af alle komponenter
getMe()
  .then((data) => { user.value = data; })
  .catch(() => { user.value = null; });

export function useCurrentUser() {
  return { user };
}

export function clearCurrentUser() {
  user.value = null;
}
