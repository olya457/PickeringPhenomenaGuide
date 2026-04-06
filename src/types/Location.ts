
export interface Location {
  id: string;
  name: string;
  category: string; 
  latitude: number;
  longitude: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  bestTime: string;
  about: string;
  visitorTips: string[];
  imageName: string;
  isSaved: boolean;
}