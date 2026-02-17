const API_BASE = import.meta.env.VITE_API_BASE

console.log("API BASE:", API_BASE);

export async function shortenUrl(url: string) {
  const res = await fetch(`${API_BASE}/api/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  const data = await res.json();

  if (!res.ok) {
    if (res.status === 429) {
      throw new Error("Too many requests. Please try again later.");
    }
    throw new Error(data.error || "Failed to shorten URL");
  }
  return data;
}
