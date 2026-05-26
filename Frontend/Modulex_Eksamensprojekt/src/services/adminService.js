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

// hent en bruger
export async function getUserById(userId) {
  try {
    const response = await getAllUsers();
    const user = response.data?.find((u) => u.id === userId);

    if (!user) {
      throw new Error("User not found");
    }

    return { success: true, data: user };
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
