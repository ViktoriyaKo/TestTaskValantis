import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
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
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
