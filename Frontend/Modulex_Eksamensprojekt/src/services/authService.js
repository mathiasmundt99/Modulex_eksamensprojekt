const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Opret bruger
export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phone,
        companyName: userData.companyName,
        cvr: userData.cvr,
        companyAdress: userData.companyAddress,
        country: userData.country,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      }),
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

// login bruger
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Login failed: ${response.statusText}`,
      );
    }

    const data = await response.json();

    // Gem bruger data (token er automatisk i HttpOnly cookie)
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// anmod om nulstiling af passwords
export async function forgotPassword(email) {
  try {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `Forgot password request failed: ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
}

// Nustil password med en gyldig token
export async function resetPassword(token, password) {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Password reset failed: ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Password reset error:", error);
    throw error;
  }
}

// log ud af systemet
export async function logoutUser() {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Logout failed: ${response.statusText}`,
      );
    }

    // Slet bruger data fra localStorage
    localStorage.removeItem("user");

    return await response.json();
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}
