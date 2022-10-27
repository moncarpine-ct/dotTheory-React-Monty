import React, { useState, useEffect } from 'react';
import Article from './components/Article';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
      .then(response => response.json())
      .then(data => setArticles(data))
  }, []);

  return (
    <div className="container">
        <span className="header">{"<Articles>"}</span>
        {articles.map(article =>
          <Article article={article} key={article.id} />
        )}
        <span className="header">{"</Articles>"}</span>
    </div>
  );
}

export default App;
