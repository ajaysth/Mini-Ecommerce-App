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
      const errorData = await res.json();
      throw new Error(errorData.message || "API request failed");
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};
