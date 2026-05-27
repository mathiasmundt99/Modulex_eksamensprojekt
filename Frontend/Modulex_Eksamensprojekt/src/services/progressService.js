const BASE_URL = `${import.meta.env.VITE_API_URL}/progress`;

export async function getUserCourses(userId) {
  const response = await fetch(`${BASE_URL}/${userId}/courses`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch user courses");
  return await response.json();
}

export async function getUserCourseProgress(userId, courseId) {
  const response = await fetch(`${BASE_URL}/${userId}/course/${courseId}`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch course progress");
  return await response.json();
}

export async function getUserProgress(userId) {
  const response = await fetch(`${BASE_URL}/${userId}`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch user progress");
  return await response.json();
}

export async function getOnboardingProgress(userId) {
  const response = await fetch(`${BASE_URL}/${userId}/onboarding`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch onboarding progress");
  return await response.json();
}

export async function getUserStats(userId) {
  const response = await fetch(`${BASE_URL}/${userId}/stats`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch user stats");
  return await response.json();
}

export async function getUserActivity(userId, limit = 5) {
  const response = await fetch(`${BASE_URL}/${userId}/activity?limit=${limit}`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch user activity");
  return await response.json();
}

export async function updateProgress(userId, courseId, contentId, completed) {
  const response = await fetch(`${BASE_URL}/${userId}/update`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ courseId, contentId, completed }),
  });
  if (!response.ok) throw new Error("Failed to update progress");
  return await response.json();
}
