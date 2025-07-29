import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleView from './components/ArticleView';
import NewArticle from './components/NewArticle';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="container">
            <h1 className="app-title">
              <Link to="/">Simple Blog</Link>
            </h1>
            <nav className="app-nav">
              <Link to="/" className="nav-link">Все статьи</Link>
              <Link to="/articles/new" className="nav-link nav-link-primary">
                Новая статья
              </Link>
            </nav>
          </div>
        </header>

        <main className="app-main">
          <div className="container">
            <Routes>
              <Route path="/" element={<ArticleList />} />
              <Route path="/articles/:id" element={<ArticleView />} />
              <Route path="/articles/new" element={<NewArticle />} />
            </Routes>
          </div>
        </main>

        <footer className="app-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} Simple Blog. Все права защищены.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;