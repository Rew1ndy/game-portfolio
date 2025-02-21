import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home"; 
import Gallery from "./Gallery"; 
import About from "./About"; 
import News from "./News"; 
import Footer from "./Footer"; 

const App = () => {
  return (
    <Router basename="/game-portfolio">
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
