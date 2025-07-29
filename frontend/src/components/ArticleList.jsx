import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/articles')
      .then(res => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Загрузка статей...</div>;

  return (
    <div className="container">
      <h1 className="page-title">Блог</h1>
  
      
      {articles.length === 0 ? (
        <p className="no-articles">Статьи не найдены</p>
      ) : (
        articles.map(article => (
          <article key={article.id} className="article-preview">
            <h2 className="article-title">
              <Link to={`/articles/${article.id}`}>{article.title}</Link>
            </h2>
            <div className="article-meta">
              <span className="article-date">
                {new Date(article.created_at).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            <p className="article-excerpt">
              {article.content.substring(0, 150)}...
              <Link to={`/articles/${article.id}`} className="read-more">
                Читать далее
              </Link>
            </p>
          </article>
        ))
      )}
    </div>
  );
}

export default ArticleList;