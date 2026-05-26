const BASE_URL = "http://localhost:3000/api/progress";

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

export async function updateProgress(userId, courseId, contentId, completed) {
  const response = await fetch(`${BASE_URL}/${userId}/update`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ courseId, moduleId: contentId, completed }),
  });
  if (!response.ok) throw new Error("Failed to update progress");
  return await response.json();
}
