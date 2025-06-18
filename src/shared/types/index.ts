// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  dueDate: string; // ISO string
  completed: boolean;
}

export type EventType = 'job' | 'routine' | 'free-time';

// Form types
export interface EventFormData {
  id?: string;
  title: string;
  description: string;
  type: EventType;
  dueDate: Date;
  completed: boolean;
}

// Navigation types
export interface RootStackParamList {
  Home: undefined;
  Explore: undefined;
  Settings: undefined;
}

// API types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
    };
    error: string;
    success: string;
    warning: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
} 