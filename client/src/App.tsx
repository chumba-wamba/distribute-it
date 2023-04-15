import "./App.css";
import { LoginPage } from "./hoc/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AcceptTaskPage } from "./hoc/AcceptTaskPage";
import Dashboard from "./hoc/Dashboard";
import TaskUploading from "./shared/TaskUploading";
import { AcceptTaskList } from "./shared/AcceptTaskList";
import CompletedTaskList from "./shared/CompletedTaskList";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/accept-task" element={<AcceptTaskPage />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/completed-task" element={<CompletedTaskList />}></Route>
          <Route path="/upload-task" element={<TaskUploading />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
