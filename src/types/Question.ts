
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  text: string;
  answers: string[];
  correctIndex: number;
  difficulty: Difficulty;
  explanation: string;
}