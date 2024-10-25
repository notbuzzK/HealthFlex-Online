// src/components/Card.tsx
import React from 'react';
import './Card.css'; // Optional for styling

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string; // Optional image prop
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
