import { useState } from "react";
import { shortenUrl } from "./lib/api";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

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
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "5rem auto",
        padding: "2rem",
        borderRadius: "8px",
        border: "1px solid #ddd",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "1.5rem" }}>Mini URL</h1>
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", padding: "0.5rem" }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !url}
        style={{ marginTop: "1rem" }}
      >
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
      {copied && <p style={{ color: "green" }}>Copied!</p>}
    </div>
  );
}
