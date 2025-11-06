// App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx' // 1. Importar el componente Navbar
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* 2. Renderizar el componente Navbar */}
      <Navbar />

      {/* Contenido principal de la aplicación */}
        <main className={`main-content ${showLayout ? 'with-header' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App