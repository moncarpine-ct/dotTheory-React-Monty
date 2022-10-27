import React from 'react';
import '../App.css';

const Article = ({ article }) => (
    <div className="article">
        <b>{`> ${article.title}`}</b>
        <p>{article.body}</p>
    </div>
);

export default Article;