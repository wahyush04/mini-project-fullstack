// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/ExampleNavbar';
import Home from './pages/Home';
import About from './pages/About';
import UserDetail from './components/userDetail';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/users" element={<ExamplePage />} /> */}
        <Route path="/user/detail" element={<UserDetail />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
