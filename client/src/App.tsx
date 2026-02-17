import { useState, useEffect } from "react";
import { shortenUrl } from "./lib/api";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const isValidUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!isValidUrl(url)) {
      setError("Please enter a valid URL (include https://)");
      return;
    }

    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const data = await shortenUrl(url);
      console.log("Shortened URL data:", data);
      setShortUrl(`${data.shortUrl}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 transition-colors duration-500">
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-5 right-5 text-sm px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 dark:text-white transition"
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      <div className="bg-white dark:bg-gray-900 dark:text-white backdrop-blur p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <h1 className="text-3xl font-extrabold mb-6 tracking-tight">Mini URL</h1>
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className={`w-full border rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 transition
            ${
              url && !isValidUrl(url)
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            }`}
        />
        {url && !isValidUrl(url) && (
          <p className="text-red-500 text-sm mb-3">Invalid URL format</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !url}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Shortening...
            </>
          ) : (
            "Shorten"
          )}
        </button>

        {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}

        {shortUrl && (
          <div className="mt-6 text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Short URL:
            </p>
            <div className="flex gap-2 sm:flex-row gap-2">
              <input
                value={shortUrl}
                readOnly
                onClick={(e) => e.currentTarget.select()}
                className="flex-1 border rounded-lg px-2 py-2 text-sm dark:bg-gray-800 dark:border-gray-700"
              />
              <button
                onClick={copyToClipboard}
                className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100px-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                {copied ? (
                  <span className="text-green-500 animate-bounce">✔</span>
                ) : (
                  "Copy"
                )}
              </button>
            </div>
          </div>
        )}
        {copied && (
          <p className="text-green-600 text-sm mt-2 animate-pulse">Copied!</p>
        )}
      </div>
    </div>
  );
}

export default App;
