import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function NewArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const submitArticle = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Заполните все поля');
      return;
    }

    setIsSubmitting(true);
    setError('');

    axios.post('http://localhost:8000/api/articles', {
      title,
      content
    })
    .then(() => navigate('/'))
    .catch(err => {
      console.error(err);
      setError('Ошибка при создании статьи');
      setIsSubmitting(false);
    });
  };

  return (
    <div className="container">
      <Link to="/" className="back-link">← Назад к статьям</Link>
      
      <form onSubmit={submitArticle} className="article-form">
        <h1 className="page-title">Новая статья</h1>
        
        {error && <div className="form-error">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="title" className="form-label">Заголовок</label>
          <input
            id="title"
            type="text"
            placeholder="Введите заголовок статьи"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content" className="form-label">Текст статьи</label>
          <textarea
            id="content"
            placeholder="Напишите содержание статьи"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="form-textarea"
            rows="10"
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Публикация...' : 'Опубликовать'}
        </button>
      </form>
    </div>
  );
}

export default NewArticle;