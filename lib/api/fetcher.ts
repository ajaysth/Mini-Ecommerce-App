export const fetcher = async (url: string, options: RequestInit = {}) => {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const text = await res.text();
      let errorData;
      try {
          errorData = text ? JSON.parse(text) : {};
      } catch (e) {
          errorData = { message: text };
      }
      throw new Error(errorData.message || "API request failed");
    }

    const text = await res.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch (error: any) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};
