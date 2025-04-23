import "./App.css";
import CheckContainer from "./Componenets/CheckContainer";
import Slider from "./Componenets/Slider";
import PasswordBox from "./Componenets/PasswordBox";
import StrengthTestBox from "./Componenets/StrengthTestBox";

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
