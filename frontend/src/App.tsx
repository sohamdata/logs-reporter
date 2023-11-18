import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SubmitLog from "./pages/SubmitLog";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/SubmitLog" element={<SubmitLog />} />
      </Routes>
    </BrowserRouter>
  );
}
