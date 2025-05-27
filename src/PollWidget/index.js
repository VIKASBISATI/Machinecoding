import React, { useState } from "react";
import "./styles.css";

const PollWidget = () => {
  const [pollData, setPollData] = useState({
    question: "What's your favorite programming language?",
    options: [
      { id: 1, text: "JavaScript", votes: 0 },
      { id: 2, text: "Python", votes: 0 },
      { id: 3, text: "Java", votes: 0 },
      { id: 4, text: "C++", votes: 0 },
    ],
    totalVotes: 0,
    hasVoted: false,
  });

  const handleVote = (optionId) => {
    if (pollData.hasVoted) return;

    setPollData((prevData) => {
      const updatedOptions = prevData.options.map((option) =>
        option.id === optionId
          ? { ...option, votes: option.votes + 1 }
          : option
      );

      return {
        ...prevData,
        options: updatedOptions,
        totalVotes: prevData.totalVotes + 1,
        hasVoted: true,
      };
    });
  };

  const calculatePercentage = (votes) => {
    if (pollData.totalVotes === 0) return 0;
    return Math.round((votes / pollData.totalVotes) * 100);
  };

  const getWinningOption = () => {
    if (pollData.totalVotes === 0) return null;
    return pollData.options.reduce((prev, current) =>
      prev.votes > current.votes ? prev : current
    );
  };

  return (
    <div className="poll-widget">
      <h2 className="poll-question">{pollData.question}</h2>
      <div className="poll-options">
        {pollData.options.map((option) => {
          const percentage = calculatePercentage(option.votes);
          const isWinning = getWinningOption()?.id === option.id;

          return (
            <div
              key={option.id}
              className={`poll-option ${isWinning ? "winning" : ""}`}
            >
              <div className="option-header">
                <span className="option-text">{option.text}</span>
                {pollData.hasVoted && (
                  <span className="option-percentage">{percentage}%</span>
                )}
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              {!pollData.hasVoted && (
                <button
                  className="vote-button"
                  onClick={() => handleVote(option.id)}
                >
                  Vote
                </button>
              )}
            </div>
          );
        })}
      </div>
      {pollData.hasVoted && (
        <div className="poll-footer">
          <span className="total-votes">
            Total Votes: {pollData.totalVotes}
          </span>
          {getWinningOption() && (
            <span className="winning-option">
              Winner: {getWinningOption().text}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PollWidget; 