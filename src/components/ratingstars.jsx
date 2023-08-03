import React from 'react';

const RatingStars = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`text-2xl ${
        index < rating-1 ? 'text-yellow-400' : 'text-gray-300'
      }`}
    >
      ★
    </span>
  ));

  return <div>{stars}</div>;
};

export default RatingStars;
