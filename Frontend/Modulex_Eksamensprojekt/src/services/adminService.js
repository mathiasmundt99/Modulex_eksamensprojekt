const BASE_URL = "http://localhost:3000/api/admin";

// hent alle brugere
export async function getAllUsers(search = "", limit = 50) {
  try {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    params.append("limit", limit);

    const response = await fetch(`${BASE_URL}/users?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// hent specifik bruger
export async function getUserById(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User not found");
      }

      throw new Error("Failed to fetch user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

// opdater bruger
export async function updateUser(userId, userData) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

// hent dashboard statistik
export async function getDashboardStatistics() {
  try {
    const response = await fetch(`${BASE_URL}/stats/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to get statistics");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching dashboard statistics:", error);
    throw error;
  }
}

// hent seneste aktiviteter
export async function getRecentActivity(limit = 10) {
  try {
    const response = await fetch(`${BASE_URL}/activity/recent?limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recent activity");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    throw error;
  }
}

// slet bruger permanent
export async function deleteUser(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User not found");
      }

      if (response.status === 400) {
        throw new Error("Validation error");
      }

      throw new Error("Failed to delete user");
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
