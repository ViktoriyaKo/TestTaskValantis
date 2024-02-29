import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import About from './views/About/About';
import CardPage from './views/CardPage/CardPage';
import Home from './views/Home/Home';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<CardPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
