
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AlbumPhotosPage from './pages/AlbumPhotosPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UploadPage from './pages/UploadPage';
import AlbumPage from './pages/AlbumPage';
import PrivateRoutes from './utils/PrivateRoutes';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
  
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/albums" element={<AlbumPage />} />
          <Route path="/albums/:id" element={<AlbumPhotosPage />} />
        </Route>
      </Routes>
      
     
    </div>
  );
}

export default App;
