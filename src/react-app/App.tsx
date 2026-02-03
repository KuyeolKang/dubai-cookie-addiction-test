import { BrowserRouter as Router, Routes, Route } from "react-router";
import PersonalityTest from "@/react-app/pages/PersonalityTest";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonalityTest />} />
      </Routes>
    </Router>
  );
}
