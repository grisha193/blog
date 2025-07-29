import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function ArticleView() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/articles/${id}`)
      .then(res => {
        setArticle(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Статья не найдена');
        setLoading(false);
      });
  }, [id]);

  const submitComment = (e) => {
    e.preventDefault();
    if (!authorName.trim() || !commentContent.trim()) {
      setError('Заполните все поля');
      return;
    }

    axios.post(`http://localhost:8000/api/articles/${id}/comments`, {
      author_name: authorName,
      content: commentContent
    }).then(res => {
      setArticle({
        ...article,
        comments: [...article.comments, res.data]
      });
      setAuthorName('');
      setCommentContent('');
      setError('');
    }).catch(err => {
      setError('Ошибка при отправке комментария');
    });
  };

  if (loading) return <div className="loading">Загрузка статьи...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!article) return <div className="not-found">Статья не найдена</div>;

  return (
    <div className="container article-container">
      <Link to="/" className="back-link">← Назад к статьям</Link>
      
      <article className="full-article">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-meta">
          <span className="article-date">
            {new Date(article.created_at).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>
        <div className="article-content">
          {article.content.split('\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>

      <section className="comments-section">
        <h2 className="section-title">Комментарии ({article.comments.length})</h2>
        
        {article.comments.length > 0 ? (
          <ul className="comments-list">
            {article.comments.map(c => (
              <li key={c.id} className="comment">
                <div className="comment-header">
                  <span className="comment-author">{c.author_name}</span>
                  <span className="comment-date">
                    {new Date(c.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="comment-content">{c.content}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-comments">Пока нет комментариев. Будьте первым!</p>
        )}

        <form onSubmit={submitComment} className="comment-form">
          <h3 className="form-title">Добавить комментарий</h3>
          {error && <div className="form-error">{error}</div>}
          <input
            type="text"
            placeholder="Ваше имя"
            value={authorName}
            onChange={e => setAuthorName(e.target.value)}
            className="form-input"
          />
          <textarea
            placeholder="Текст комментария"
            value={commentContent}
            onChange={e => setCommentContent(e.target.value)}
            className="form-textarea"
            rows="4"
          />
          <button type="submit" className="submit-button">
            Отправить комментарий
          </button>
        </form>
      </section>
    </div>
  );
}

export default ArticleView;