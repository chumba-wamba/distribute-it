import "./App.css";
import { LoginPage } from "./hoc/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AcceptTaskPage } from "./hoc/AcceptTaskPage";
import Dashboard from "./hoc/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/accept-task" element={<AcceptTaskPage />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
