const BASE_URL = "http://localhost:3000/api/content";

// hent alle kurser
export async function getAllCourses() {
  try {
    const response = await fetch(`${BASE_URL}/courses`, {
      method: "GET",
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
    });

    if (!response.ok) throw new Error("Failed to delete course");
    return true;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
}

// link modul til kursus
export async function linkModuleToCourse(courseId, moduleId) {
  try {
    const response = await fetch(
      `${BASE_URL}/courses/${courseId}/modules/link`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ moduleId }),
      },
    );

    if (!response.ok) throw new Error("Failed to link module");
    return await response.json();
  } catch (error) {
    console.error("Error linking module:", error);
    throw error;
  }
}
