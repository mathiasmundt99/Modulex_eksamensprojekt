const BASE_URL = "http://localhost:3000/api/content";

// upload pdf og opret library item i ét request
export async function uploadPdfToLibrary(formData) {
  try {
    const response = await fetch(`${BASE_URL}/library`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload PDF");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// hent pdf
export async function getPdfs() {
  try {
    const response = await fetch(`${BASE_URL}/pdfs`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch PDFs");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// opret nyt læringsmateriale
export async function createLibraryContent(contentData) {
  try {
    const response = await fetch(`${BASE_URL}/library`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contentData),
    });

    if (!response.ok) {
      throw new Error("Failed to create library content");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// hent alt læringsmateriale
export async function getLibraryContent() {
  try {
    const response = await fetch(`${BASE_URL}/library`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch library content");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// hent specifikt læringsmateriale
export async function getLibraryContentById(contentId) {
  try {
    const response = await fetch(`${BASE_URL}/library/${contentId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Content not found");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// opdater specifikt læringsmateriale
export async function updateLibraryContent(contentId, updateData) {
  try {
    const url = `${BASE_URL}/library/${contentId}`;

    const response = await fetch(url, {
      method: "PATCH",
      mode: "cors",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updateData.title,
        description: updateData.description,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `Failed to update content: ${response.status} - ${errorData}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Update error details:", error);
    throw error;
  }
}

// slet specifikt læringsmateriale
export async function deleteLibraryContent(contentId) {
  try {
    const response = await fetch(`${BASE_URL}/library/${contentId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete content");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
