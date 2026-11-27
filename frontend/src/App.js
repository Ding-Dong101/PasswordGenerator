import { useState } from "react";
import "./App.css";
import Slider from "./Components/Slider";
import PasswordBox from "./Components/PasswordBox";

const API_URL = (
  process.env.REACT_APP_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

function App() {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({ score: 0, label: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleToggleOption = (key) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          length: Number(length),
          ...options,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        let message = "Failed to generate password.";
        if (data && data.detail) {
          if (Array.isArray(data.detail)) {
            message = data.detail
              .map((item) => item.msg || String(item))
              .join(" ");
          } else {
            message = String(data.detail);
          }
        }
        throw new Error(message);
      }

      setPassword(data.password);
      setStrength({ score: data.score, label: data.label });
    } catch (err) {
      if (err instanceof TypeError) {
        setError(
          `Cannot reach backend at ${API_URL}. Make sure the FastAPI server is running.`
        );
      } else {
        setError(err.message || "Failed to generate password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <PasswordBox password={password} />
      <Slider
        length={length}
        onLengthChange={setLength}
        options={options}
        onToggleOption={handleToggleOption}
        strength={strength}
        onGenerate={handleGenerate}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;
