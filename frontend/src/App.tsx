import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SubmitLog from "./pages/SubmitLog";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/SubmitLog" element={<SubmitLog />} />
      </Routes>
    </BrowserRouter>
  );
}
