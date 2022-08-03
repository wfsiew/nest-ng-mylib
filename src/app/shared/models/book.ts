export interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  qty: number;
  return_date?: string;
}

export interface BooksBorrow {
  id: number;
  has_renew: boolean;
  start_date: string;
  end_date: string;
  return_date?: string;
  book_id: number;
  user_id: number;
  book: Book;
}
