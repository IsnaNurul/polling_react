import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin";
import Changepass from "./components/Changepass";
import Login from "./components/Login";
import Poll from "./components/Poll";
import Responden from "./components/Responden";
import Result from "./components/Result";
import Title from "./components/Title";
import User from "./components/User";
import Voting from "./components/Voting";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Title/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/admin" element={<Admin />}/>
        <Route exact path="/responden" element={<Responden/>}/>
        <Route exact path="/pollcreate" element={<Poll/>}/>
        <Route exact path="/changepass" element={<Changepass/>}/>
        <Route exact path="/user" element={<User/>}/>
        <Route exact path="/voting" element={<Voting/>}/>
        <Route exact path="/result" element={<Result/>}/>
      </Routes>
    </Router>
  );
}

export default App;
