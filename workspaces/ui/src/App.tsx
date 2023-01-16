import "./App.css";
import { CognitoAuth } from "./auth/CognitoAuth";
import { HomePage } from "./pages/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <CognitoAuth>
        <HomePage />
      </CognitoAuth>
    </div>
  );
}

export default App;
