import React, { useEffect, useState } from "react";
// import Copy from "../Images/copy.svg";

export default function PasswordBox({ password }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [password]);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <div className="bg pass">
      <div className={`genPassword ${password ? "" : "placeholder"}`}>
        {password || "P4$5W0rD!"}
      </div>
      <div className="copy-wrapper">
        {copied && <span className="copied-text">COPIED</span>}
        <button
          type="button"
          className="copy-button"
          onClick={handleCopy}
          disabled={!password}
          aria-label="Copy password"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="copy-image"
          >
            <path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
