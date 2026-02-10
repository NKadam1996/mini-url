const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function shortenUrl(url: string) {
  const res = await fetch(`${API_BASE}/api/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to shorten URL");
  }
  return res.json();
}
