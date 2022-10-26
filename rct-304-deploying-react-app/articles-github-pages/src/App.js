import React, { useState, useEffect } from 'react';
import Articles from './components/Articles';
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
          <Articles article={article} key={article.id} />
        )}
        <span className="header">{"</Articles>"}</span>
    </div>
  );
}

export default App;
