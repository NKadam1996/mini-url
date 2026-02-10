import { useState } from "react";
import { shortenUrl } from "./lib/api";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!url) return;

    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const data = await shortenUrl(url);
      setShortUrl(`${window.location.origin}/${data.shortCode}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  return (
    <div style={{ maxWidth: 500, margin: "4rem auto", textAlign: "center" }}>
      <h1>Mini</h1>
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", padding: "0.5rem" }}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Shortening..." : "Shorten"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {shortUrl && (
        <div style={{ marginTop: "1rem" }}>
          <p>Short URL:</p>
          <div
            style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}
          >
            <input
              value={shortUrl}
              type="text"
              placeholder="https://example.com"
              readOnly
              style={{ width: "70%", padding: "0.5rem" }}
              onClick={(e) => e.currentTarget.select()}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <button onClick={copyToClipboard}>Copy</button>
          </div>
        </div>
      )}
    </div>
  );
}
