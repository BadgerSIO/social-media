import React from "react";

const ReviewCard = ({ review }) => {
  const { comment, authorName, authorImage, postedTime } = review;
  return (
    <div className="mt-5 p-5 first:border-t last:border-b-0 border-b border-gray-700 flex space-x-5">
      <div className="w-16">
        <div className="w-12 mask mask-squircle">
          <img src={authorImage} alt="this" />
        </div>
      </div>
      <div className="flex-grow">
        <h1 className="font-bold">{authorName}</h1>
        <p className="text-[10px] text-primary">{postedTime}</p>
        <p className="text-sm">{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
