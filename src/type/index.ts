export interface ITodo {
  id: string;
  title: string;
  status: string;
  description: string;
  createdAt: string;
}

export interface IPagination {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  limit: number;
}

export interface ITodoModal {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export interface IUser {
  id: string;
  name: string;
  role: string;
  bio: string;
}

export interface ISvg {
  name: string;
  color?: string;
  width?: number;
  height?: number;
}
