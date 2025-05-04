// lib/api.ts
export async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  const accessToken = localStorage.getItem("access_token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401 && localStorage.getItem("refresh_token")) {
    // Try refreshing token
    const refreshRes = await fetch("http://localhost:8000/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh_token: localStorage.getItem("refresh_token"),
      }),
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      localStorage.setItem("access_token", data.access_token);

      // Retry original request with new token
      return apiFetch(url, options);
    } else {
      throw new Error("Session expired. Please sign in again.");
    }
  }

  return response;
}

