import "./App.css";
import { LoginPage } from "./hoc/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AcceptTaskPage } from "./hoc/AcceptTaskPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/accept-task" element={<AcceptTaskPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
