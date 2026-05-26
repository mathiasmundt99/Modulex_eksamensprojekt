const BASE_URL = "http://localhost:3000/api/content";

// hent alle kurser
export async function getAllCourses() {
  try {
    const response = await fetch(`${BASE_URL}/courses`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
}

// hent et enkelt kurus
export async function getCourseById(courseId) {
  try {
    const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch course");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
}

// Opret nyt kursus
export async function createCourse(courseData) {
  try {
    const response = await fetch(`${BASE_URL}/courses`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) throw new Error("Failed to create course");
    return await response.json();
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
}

// Opdater kursus
export async function updateCourse(courseId, courseData) {
  try {
    const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) throw new Error("Failed to update course");
    return await response.json();
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
}

// slet kursus
export async function deleteCourse(courseId) {
  try {
    const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to delete course");
    return true;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
}

// link content til kursus
export async function linkContentToCourse(courseId, contentId) {
  try {
    const response = await fetch(
      `${BASE_URL}/courses/${courseId}/content/link`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contentId }),
      },
    );

    if (!response.ok) throw new Error("Failed to link content");
    return await response.json();
  } catch (error) {
    console.error("Error linking content:", error);
    throw error;
  }
}

// opdater rækkefølgen af content på et kursus
export async function reorderCourseContent(courseId, contentIds) {
  try {
    const response = await fetch(
      `${BASE_URL}/courses/${courseId}/content/reorder`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contentIds }),
      },
    );
    if (!response.ok) throw new Error("Failed to reorder content");
    return await response.json();
  } catch (error) {
    console.error("Error reordering content:", error);
    throw error;
  }
}

// fjern content fra kursus
export async function unlinkContentFromCourse(courseId, contentId) {
  try {
    const response = await fetch(
      `${BASE_URL}/courses/${courseId}/content/${contentId}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );
    if (!response.ok) throw new Error("Failed to unlink content");
    return await response.json();
  } catch (error) {
    console.error("Error unlinking content:", error);
    throw error;
  }
}
