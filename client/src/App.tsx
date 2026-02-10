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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Mini URL</h1>
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring"
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !url}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        {shortUrl && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Short URL:</p>
            <div className="flex gap-2">
              <input
                value={shortUrl}
                readOnly
                onClick={(e) => e.currentTarget.select()}
                className="flex-1 border rounded-lg px-2 py-1"
              />
              <button
                onClick={copyToClipboard}
                className="bg-gray-200 px-3 rounded-lg hover:bg-gray-300"
              >
                Copy
              </button>
            </div>
          </div>
        )}
        {copied && <p className="text-green-600 text-sm mt-2">Copied!</p>}
      </div>
    </div>
  );
}

export default App;
