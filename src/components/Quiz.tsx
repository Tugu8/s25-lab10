import React, { useMemo, useState } from "react";
import "./Quiz.css";
import QuizCore from "../core/QuizCore";
import QuizQuestion from "../core/QuizQuestion";

const Quiz: React.FC = () => {
  const quizCore = useMemo(() => new QuizCore(), []);

  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>(
    quizCore.getCurrentQuestion(),
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(
    quizCore.getSelectedAnswer(),
  );
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleOptionSelect = (option: string): void => {
    quizCore.answerQuestion(option);
    setSelectedAnswer(option);
  };

  const syncQuestionState = (): void => {
    setCurrentQuestion(quizCore.getCurrentQuestion());
    setSelectedAnswer(quizCore.getSelectedAnswer());
  };

  const handleNextClick = (): void => {
    if (!selectedAnswer) return;

    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion();
      syncQuestionState();
    } else {
      setIsCompleted(true);
    }
  };

  const handlePreviousClick = (): void => {
    if (!quizCore.hasPreviousQuestion()) return;

    quizCore.previousQuestion();
    syncQuestionState();
  };

  if (isCompleted) {
    return (
      <div className="quiz-container">
        <h2>Quiz Completed</h2>
        <p>
          Final Score: {quizCore.getScore()} / {quizCore.getTotalQuestions()}
        </p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <p>
        Question {quizCore.getCurrentQuestionIndex() + 1} /{" "}
        {quizCore.getTotalQuestions()}
      </p>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>

      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? "selected" : ""}
          >
            {option}
          </li>
        ))}
      </ul>

      <p>Selected: {selectedAnswer ?? "None"}</p>

      <div className="quiz-actions">
        <button
          onClick={handlePreviousClick}
          disabled={!quizCore.hasPreviousQuestion()}
        >
          Previous
        </button>
        <button onClick={handleNextClick} disabled={!selectedAnswer}>
          {quizCore.isLastQuestion() ? "Submit" : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
