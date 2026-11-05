import "./App.css";
import CheckContainer from "./Components/CheckContainer";
import Slider from "./Components/Slider";
import PasswordBox from "./Components/PasswordBox";
import StrengthTestBox from "./Components/StrengthTestBox";

function App() {
  return (
    <div className="App">
      <h1>Password Generator</h1>
      <PasswordBox />
      <Slider />

      {/* <StrengthTestBox /> */}
    </div>
  );
}

export default App;
