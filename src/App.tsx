import { Routes, Route } from "react-router-dom";
import MembersList from "./pages/MembersList";
import MemberDetail from "./pages/MemberDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MembersList />} />
      <Route path="/detail/:login" element={<MemberDetail />} />
    </Routes>
  );
}

export default App;
