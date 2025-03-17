export interface Mover {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface MoverCardProps {
  mover: {
    name: string;
    email: string;
    avatar?: string | undefined;
  };
}

export interface MoverCardDisplayProps {
  mover: {
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
    location?: string;
    rating?: number;
    bio?: string;
  };
}
