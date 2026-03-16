import './App.css'


import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainBody from './components/MainBody';


//import page content
import Home from "./routes/Home";
/*
// Education page temporarily disabled - keep import commented for easy restore
import Education from "./components/EducationList";
*/
import About from "./routes/About";
/*
// Employment page temporarily disabled - keep imports/routes commented for easy restore
import Employment from "./components/EmploymentList";
*/

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/education" element={<Education />} /> */}
          <Route path="/about" element={<About />} />
          {/* <Route path="/employment" element={<Employment />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
