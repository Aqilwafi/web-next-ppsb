import { Routes, Route } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import ArticleRead from './pages/ArticleRead';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/article" element={<ArticleRead />} />
    </Routes>
  );
}
