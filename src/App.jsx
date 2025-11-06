// src/App.jsx
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'

function App() {

  return (
    <>
      {/* 2. Renderizar el componente Navbar */}
      <Navbar />

      <main className="main-content with-header"> 
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App