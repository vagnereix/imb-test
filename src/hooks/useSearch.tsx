import {
  useState,
  createContext,
  ReactNode,
  useContext,
  FormEvent
} from "react";

import { api } from "../services/api";

type Book = {
  id: string;
  volumeInfo: {
    title: string,
    authors: string[],
    description: string;
    publishedDate: string,
  };
  publishedDate: string;
  favorite?: boolean;
};

type SearchProviderProps = {
  children: ReactNode;
};

type SearchContextData = {
  searching: string;
  setSearching: (password: string) => void;
  books: Book[];
  setBooks: (books: Book[]) => void;
  handleSearch: (event: FormEvent) => void;
  searchBooks: () => void;
  orderBooks: (booksToOrder: Book[] | any) => Book[];
};

const SearchContext = createContext<SearchContextData>({} as SearchContextData);

export function SearchProvider({ children }: SearchProviderProps) {
  const [searching, setSearching] = useState('');
  const [books, setBooks] = useState<Book[]>([]);

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    searchBooks();
  }

  async function searchBooks() {
    const { data } = await api.get('/books/v1/volumes', {
      params: {
        q: searching,
        key: process.env.REACT_APP_API_KEY,
        maxResults: 40,
      } 
    });

    setBooks(orderBooks(data.items));
  }

  function orderBooks(booksToOrder: Book[] | any) {
    const orderedBooks = booksToOrder.sort(function (a: Book, b: Book): number {
      return (a.volumeInfo.title > b.volumeInfo.title) ? 1 : ((b.volumeInfo.title > a.volumeInfo.title) ? -1 : 0)
    })
    
    return orderedBooks;
  }

  return (
    <SearchContext.Provider
      value={{
        books,
        setBooks,
        searching,
        setSearching,
        handleSearch,
        searchBooks,
        orderBooks
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  return context;
}
