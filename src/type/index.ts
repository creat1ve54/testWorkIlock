export interface ITodo {
  id: string;
  title: string;
  status: string;
  description: string;
  createdAt: string;
}

export interface ITodoModal {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}