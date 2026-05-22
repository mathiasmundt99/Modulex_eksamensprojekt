const BASE_URL = "http://localhost:3000/api/content";

// uploadpdf
export async function uploadPdf(file) {
  try {
    const formData = new FormData();

    formData.append("pdfFile", file);

    const response = await fetch(`${BASE_URL}/upload/pdf`, {
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
