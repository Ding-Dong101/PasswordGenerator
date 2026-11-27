import React from "react";

export default function GenButn({ loading = false }) {
  return (
    <button type="submit" className="genbtn" disabled={loading}>
      {loading ? "Generating..." : "Generate ➡️"}
    </button>
  );
}
