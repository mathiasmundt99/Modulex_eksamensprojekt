const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// hent alle virksomheder
export async function getCompanies() {
  try {
    const response = await fetch(`${BASE_URL}/companies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to get companies");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
}
