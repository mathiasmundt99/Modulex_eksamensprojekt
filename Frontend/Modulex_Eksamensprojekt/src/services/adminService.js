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

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("PUT error response:", data);
      throw new Error(data?.message || "Failed to update user");
    }

    return data;
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

// hent specifik brugers aktivitetslog
export async function getUserActivity(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/activity`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User activity not found");
      }

      if (response.status === 400) {
        throw new Error("Validation error");
      }

      throw new Error("Failed to fetch user activity");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user activity:", error);
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

// hent brugere der kræver opmærksomhed (inaktive / low progress)
export async function getUsersAttention(type = "low-progress", limit = 50) {
  try {
    const params = new URLSearchParams();

    if (type) params.append("type", type);
    if (limit) params.append("limit", limit);

    const response = await fetch(
      `${BASE_URL}/users/attention?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message || "Failed to fetch users requiring attention",
      );
    }

    return data;
  } catch (error) {
    console.error("Error fetching attention users:", error);
    throw error;
  }
}

// hent brugers tilmeldte kurser med progress
export async function getUserCourses(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User courses not found");
      }

      if (response.status === 400) {
        throw new Error(data?.message || "Validation error");
      }

      throw new Error("Failed to fetch user courses");
    }

    return data;
  } catch (error) {
    console.error("Error fetching user courses:", error);
    throw error;
  }
}
