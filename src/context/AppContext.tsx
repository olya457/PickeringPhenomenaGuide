import React, { createContext, useContext, useReducer } from 'react';
import { Location, locations } from '../data/locations';
import { BlogPost, blogPosts } from '../data/blogPosts';
import { QuizQuestion, getRandomQuizQuestions } from '../data/questions';
import { TravelTip, travelTips } from '../data/tips';

export interface AppState {
  onboarding: { completed: boolean };
  locations: {
    items: Location[];
    selectedCategory: string;
  };
  blog: {
    items: BlogPost[];
    tab: 'Latest' | 'Popular';
  };
  quiz: {
    questions: QuizQuestion[];
    currentIndex: number;
    score: number;
    selectedAnswer: number | null;
    isFinished: boolean;
  };
  tips: {
    items: TravelTip[];
    selectedCategory: string;
    expandedId: number | null;
  };
  saved: {
    tab: 'Locations' | 'Tips';
    locationIds: number[];
    tipIds: number[];
  };
}

const initialState: AppState = {
  onboarding: { completed: false },
  locations: {
    items: locations,
    selectedCategory: 'All',
  },
  blog: {
    items: blogPosts,
    tab: 'Latest',
  },
  quiz: {
    questions: getRandomQuizQuestions(10),
    currentIndex: 0,
    score: 0,
    selectedAnswer: null,
    isFinished: false,
  },
  tips: {
    items: travelTips,
    selectedCategory: 'All',
    expandedId: null,
  },
  saved: {
    tab: 'Locations',
    locationIds: [],
    tipIds: [],
  },
};

type Action =
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'SET_LOCATION_CATEGORY'; payload: string }
  | { type: 'TOGGLE_LOCATION_SAVED'; payload: number }
  | { type: 'SET_BLOG_TAB'; payload: 'Latest' | 'Popular' }
  | { type: 'TOGGLE_BLOG_LIKE'; payload: number }
  | { type: 'TOGGLE_BLOG_BOOKMARK'; payload: number }
  | { type: 'SELECT_ANSWER'; payload: number }
  | { type: 'NEXT_QUESTION' }
  | { type: 'RESTART_QUIZ' }
  | { type: 'SET_TIP_CATEGORY'; payload: string }
  | { type: 'TOGGLE_TIP_EXPANDED'; payload: number }
  | { type: 'TOGGLE_TIP_SAVED'; payload: number }
  | { type: 'SET_SAVED_TAB'; payload: 'Locations' | 'Tips' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {

    case 'COMPLETE_ONBOARDING':
      return { ...state, onboarding: { completed: true } };

    case 'SET_LOCATION_CATEGORY':
      return {
        ...state,
        locations: { ...state.locations, selectedCategory: action.payload },
      };

    case 'TOGGLE_LOCATION_SAVED': {
      const ids = state.saved.locationIds;
      const newIds = ids.includes(action.payload)
        ? ids.filter((id) => id !== action.payload)
        : [...ids, action.payload];
      return { ...state, saved: { ...state.saved, locationIds: newIds } };
    }

    case 'SET_BLOG_TAB':
      return { ...state, blog: { ...state.blog, tab: action.payload } };

    case 'TOGGLE_BLOG_LIKE':
      return {
        ...state,
        blog: {
          ...state.blog,
          items: state.blog.items.map((p: BlogPost) =>
            p.id === action.payload ? { ...p, isLiked: !p.isLiked } : p
          ),
        },
      };

    case 'TOGGLE_BLOG_BOOKMARK':
      return {
        ...state,
        blog: {
          ...state.blog,
          items: state.blog.items.map((p: BlogPost) =>
            p.id === action.payload ? { ...p, isBookmarked: !p.isBookmarked } : p
          ),
        },
      };

    case 'SELECT_ANSWER': {
      if (state.quiz.selectedAnswer !== null) return state;
      const q = state.quiz.questions[state.quiz.currentIndex];
      const correct = action.payload === q.correctAnswer;
      return {
        ...state,
        quiz: {
          ...state.quiz,
          selectedAnswer: action.payload,
          score: correct ? state.quiz.score + 1 : state.quiz.score,
        },
      };
    }

    case 'NEXT_QUESTION': {
      const hasNext = state.quiz.currentIndex + 1 < state.quiz.questions.length;
      return {
        ...state,
        quiz: {
          ...state.quiz,
          currentIndex: hasNext ? state.quiz.currentIndex + 1 : state.quiz.currentIndex,
          selectedAnswer: null,
          isFinished: !hasNext,
        },
      };
    }

    case 'RESTART_QUIZ':
      return {
        ...state,
        quiz: {
          ...initialState.quiz,
          questions: getRandomQuizQuestions(10),
        },
      };

    case 'SET_TIP_CATEGORY':
      return {
        ...state,
        tips: { ...state.tips, selectedCategory: action.payload },
      };

    case 'TOGGLE_TIP_EXPANDED':
      return {
        ...state,
        tips: {
          ...state.tips,
          expandedId: state.tips.expandedId === action.payload ? null : action.payload,
        },
      };

    case 'TOGGLE_TIP_SAVED': {
      const ids = state.saved.tipIds;
      const newIds = ids.includes(action.payload)
        ? ids.filter((id) => id !== action.payload)
        : [...ids, action.payload];
      return { ...state, saved: { ...state.saved, tipIds: newIds } };
    }

    case 'SET_SAVED_TAB':
      return { ...state, saved: { ...state.saved, tab: action.payload } };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}