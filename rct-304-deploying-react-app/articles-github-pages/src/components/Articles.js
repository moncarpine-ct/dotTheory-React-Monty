import React from 'react';
import '../App.css';

const Articles = ({ article }) => (
    <div className="article">
        <b>{`> ${article.title}`}</b>
        <p>{article.body}</p>
    </div>
);

export default Articles;