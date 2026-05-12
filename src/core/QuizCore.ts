import quizData from "../data/quizData";
import QuizQuestion from "./QuizQuestion";

class QuizCore {
  private questions: QuizQuestion[];
  private currentIndex: number;
  private answers: Array<string | null>;

  constructor() {
    this.questions = quizData;
    this.currentIndex = 0;
    this.answers = new Array(this.questions.length).fill(null);
  }

  getCurrentQuestion(): QuizQuestion {
    return this.questions[this.currentIndex];
  }

  getCurrentQuestionIndex(): number {
    return this.currentIndex;
  }

  getSelectedAnswer(): string | null {
    return this.answers[this.currentIndex];
  }

  answerQuestion(answer: string): void {
    this.answers[this.currentIndex] = answer;
  }

  hasNextQuestion(): boolean {
    return this.currentIndex < this.questions.length - 1;
  }

  hasPreviousQuestion(): boolean {
    return this.currentIndex > 0;
  }

  nextQuestion(): void {
    if (this.hasNextQuestion()) {
      this.currentIndex++;
    }
  }

  previousQuestion(): void {
    if (this.hasPreviousQuestion()) {
      this.currentIndex--;
    }
  }

  isLastQuestion(): boolean {
    return this.currentIndex === this.questions.length - 1;
  }

  getScore(): number {
    return this.questions.reduce((total, question, index) => {
      return total + (this.answers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  }

  getTotalQuestions(): number {
    return this.questions.length;
  }
}

export default QuizCore;
