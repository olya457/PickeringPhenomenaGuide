export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

export type LocationsStackParamList = {
  Locations: undefined;
  LocationDetail: { locationId: number };
};

export type BlogStackParamList = {
  Blog: undefined;
  BlogDetail: { postId: number };
};

export type QuizStackParamList = {
  Quiz: undefined;
  QuizResult: { score: number; total: number };
};