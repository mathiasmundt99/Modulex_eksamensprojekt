const BASE_URL = `${import.meta.env.VITE_API_URL}/surveys`;

// hent alle spørgsmål
export async function getSurveyQuestions() {
  try {
    const response = await fetch(`${BASE_URL}/questions`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch survey questions");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// indsend survey svar
export async function submitSurveyAnswers(payload) {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to submit survey");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// hent survey svar for en bruger
export async function getUserSurveyAnswers(userId) {
  try {
    const response = await fetch(
      `${BASE_URL}/user/${userId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch survey answers");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}