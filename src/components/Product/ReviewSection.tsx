import React, { useState } from "react";
import { FaStar, FaCheckCircle, FaUserCircle } from "react-icons/fa";

interface Review {
  id: number;
  name: string;
  date: string;
  text: string;
  rating: number;
  isVerified: boolean;
  reply?: string;
}

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Anil Patel",
      date: "06/12/2021",
      text: "Dear Friends Jai Shree Mahakal...",
      rating: 5,
      isVerified: true,
      reply: "Jay Shree Mahakal Anil Patel Sir...",
    },
  ]);
  const [newReview, setNewReview] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [rating, setRating] = useState<number>(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.trim() === "" || newName.trim() === "") return;

    const newReviewObj: Review = {
      id: Date.now(),
      name: newName,
      date: new Date().toLocaleDateString(),
      text: newReview,
      rating,
      isVerified: false,
    };

    setReviews([newReviewObj, ...reviews]);
    setNewReview("");
    setNewName("");
    setRating(5);
  };

  return (
    <div className="max-w-8xl mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">Customer Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 transition mb-3"
          type="text"
          placeholder="Enter your name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <textarea
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 transition"
          rows={4}
          placeholder="Write your review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          required
        />
        <div className="flex items-center justify-between mt-3">
          <label className="text-gray-700 font-medium">Rating:</label>
          <select
            className="border p-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>
                {Array.from({ length: star }, () =>'⭐').join("")}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-[#800000] text-white font-bold py-2 rounded-lg hover:bg-red-700 transition"
        >
          Submit Review
        </button>
      </form>

      {/* Review List */}
      {reviews.map((review) => (
        <div key={review.id} className="p-4 border-b last:border-none bg-gray-50 rounded-lg mb-4">
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-gray-500 text-3xl" />
            <div>
              <strong className="text-lg">{review.name}</strong>
              {review.isVerified && (
                <span className="ml-2 text-green-600 flex items-center">
                  <FaCheckCircle className="mr-1" /> Verified
                </span>
              )}
              <p className="text-gray-500 text-sm">{review.date}</p>
            </div>
          </div>
          <p className="mt-2 text-gray-700">{review.text}</p>
          <div className="flex mt-2 text-yellow-500">
            {Array.from({ length: review.rating }, (_, i) => (
                <span key={i}>⭐</span>
            ))}
            </div>


          {/* Admin Reply */}
          {review.reply && (
            <div className="mt-3 p-4 border-l-4 border-[#800000] bg-red-100 rounded-lg">
              <strong className="text-[#800000]">Admin Reply</strong>
              <p className="text-gray-500 text-sm">{review.date}</p>
              <p className="text-gray-700">{review.reply}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;