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

// hent en specifik virksomhed ud fra ID
export async function getCompanyById(companyId) {
  try {
    const response = await fetch(`${BASE_URL}/companies/${companyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Company not found");
      }
      if (response.status === 403) {
        throw new Error(
          "Access denied - You cannot access other companies' data",
        );
      }
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      throw new Error("Could not fetch company");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching company:", error);
    throw error;
  }
}
