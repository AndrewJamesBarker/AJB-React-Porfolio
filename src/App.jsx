import './App.css'


import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainBody from './components/MainBody';


//import page content
import Home from "./routes/Home";
import Education from "./components/EducationList";
import Employment from "./components/EmploymentList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/education" element={<Education />} />
          <Route path="/employment" element={<Employment />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
