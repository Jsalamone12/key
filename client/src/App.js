import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard"
import Detail from "./views/Detail"
import Create from "./views/Create"
import Edit from "./views/Edit"

function App() {
  return (
    <div className="Container mt-2 ms-2 me-2" >
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/shops/:_id" element={<Detail />}></Route>
        <Route path="/shops/new" element={<Create />}></Route>
        <Route path="/shops/:_id/update" element={<Edit />}></Route>
      </Routes>
    </div>
  );
}

export default App;
