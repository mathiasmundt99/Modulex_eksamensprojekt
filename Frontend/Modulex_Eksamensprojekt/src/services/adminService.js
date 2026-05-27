const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const BASE_URL = `${API_URL}/admin`;

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

// tilmeld en bruger til et onboadring kursus via id
export async function enrollUserInCourse(
  userId,
  courseId
) {
  try {
    const response = await fetch(
      `${BASE_URL}/users/${userId}/enroll/${courseId}`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data?.message ||
        "Failed to enroll user in course"
      );
    }

    return data;
  } catch (error) {
    console.error(
      "Error enrolling user in course:",
      error
    );
    throw error;
  }
}

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

// opret ny bruger
export async function createUser(userData) {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(
          data?.message || "Validerings-fejl eller email allerede i brug",
        );
      }
      throw new Error(data?.message || "Server-fejl");
    }

    return data;
  } catch (error) {
    console.error("Error creating user:", error);
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

// hent al progress
export async function getAllProgress(courseId = null, limit = 50, skip = 0) {
  try {
    const params = new URLSearchParams();
    if (courseId) params.append("courseId", courseId);
    params.append("limit", limit);
    params.append("skip", skip);

    const response = await fetch(`${BASE_URL}/progress?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error(
          data?.message || "Server-fejl ved hentning af al progress",
        );
      }
      throw new Error(data?.message || "Fejl ved hentning af al progress");
    }

    return data;
  } catch (error) {
    console.error("Error fetching all progress:", error);
    throw error;
  }
}

// hent brugere der kræver opmærksomhed (inaktive / low progress)
export async function getUsersAttention(limit = 50, skip = 0) {
  try {
    const params = new URLSearchParams();

    params.append("limit", limit);
    params.append("skip", skip);

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

// hent brugers progress detaljer
export async function getUserProgressDetails(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/progress`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          data?.error || data?.message || "Bruger progress ikke fundet",
        );
      }

      if (response.status === 400) {
        throw new Error(data?.message || "Validerings-fejl");
      }

      throw new Error(data?.message || "Server-fejl");
    }

    return data;
  } catch (error) {
    console.error("Error fetching user progress details:", error);
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
        throw new Error(data?.message || "Validerings-fejl");
      }

      throw new Error(data?.message || "Server-fejl");
    }

    return data;
  } catch (error) {
    console.error("Error fetching user courses:", error);
    throw error;
  }
}

// Hent brugerens kurser
export async function getUserProgressCourses(
  userId
) {
  try {

    const response = await fetch(
      `${API_URL}/progress/${userId}/courses`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message ||
        "Failed to fetch user progress courses"
      );
    }

    return data;

  } catch (error) {

    console.error(
      "Error fetching user progress courses:",
      error
    );

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

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(data?.message || "Aktivitetslog ikke fundet");
      }

      if (response.status === 400) {
        throw new Error(data?.message || "Validerings-fejl");
      }

      throw new Error(data?.message || "Server-fejl");
    }

    return data;
  } catch (error) {
    console.error("Error fetching user activity:", error);
    throw error;
  }
}

/**
 * Henter statistik for et specifikt kursus (Admin view).
 */
export async function getCourseStats(courseId) {
  try {
    const response = await fetch(`${BASE_URL}/courses/${courseId}/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(data?.error || data?.message || "Kursus ikke fundet");
      }
      throw new Error(data?.message || "Server-fejl");
    }

    return data;
  } catch (error) {
    console.error("Error fetching course stats:", error);
    throw error;
  }
}
