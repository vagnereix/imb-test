import { usePaginator } from "../../hooks/usePaginator";
import styles from "./styles.module.scss";
import { NewButton } from "../NewButton";
import { Paginator } from "../Paginator";

import Modal from 'react-modal';

import { toast } from "react-toastify";
import { StarEmpty } from "../../assets/icons/js/star-empty";
import { StarFull } from "../../assets/icons/js/star-full";
import { useSearch } from "../../hooks/useSearch";
import { useState } from "react";
import { DescriptionModal } from "../DescriptionModal";

Modal.setAppElement('#root');

export function BookList() {
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [description, setDescription] = useState('');

  function handleOpenDescriptionModal() {
    setDescriptionModalOpen(true);
  }

  function handleCloseDescriptionModal() {
    setDescriptionModalOpen(false);
  }
  
  const { books, setBooks, orderBooks } = useSearch();

  const { booksPerPage, pagesVisited, changePage } = usePaginator();

  async function favoriteBook(index: number, id: string) {
    switch (pagesVisited) {
      case 10:
        index += 10;
        break;
      case 20:
        index += 20;
        break;
      case 30:
        index += 30;
        break;
    }
    
    let favoriteBook = books.find(book => book.id === id);

    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    
    if (favoriteBook) {
      favoriteBook.favorite = favoriteBook.favorite ? false : true;
      updatedBooks.push(favoriteBook);
      
      setBooks(orderBooks(updatedBooks));

      favoriteBook.favorite && toast.success("✅ Favoritado com sucesso!", {
        position: "bottom-left",
      });
    }
  }

  function handleOpenModal(description: string) {
    setDescription(description);
    handleOpenDescriptionModal();
  }

  return (
    <main className={styles.content}>
      {books.length !== 0 ? (
        <>
          <DescriptionModal
            isOpen={isDescriptionModalOpen}
            description={description}
            onRequestClose={handleCloseDescriptionModal}
          />
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author(s)</th>
                <th>Published date</th>
                <th>Actions</th>
              </tr>
            </thead>
  
            <tbody>
              {books
                .slice(pagesVisited, pagesVisited + booksPerPage)
                .map((book, index) => {
                  return (
                    <>
                      <tr key={book.id}>
                        <td>{book.volumeInfo.title.toLowerCase()}</td>
                        <td>{book.volumeInfo.authors && book.volumeInfo.authors.map(author => {
                          return (
                            <>
                              <span key={book.id}>
                                {author.toLocaleLowerCase()}
                              </span>
                              <br />
                            </>
                          )
                        })}</td>
                        <td>{book.volumeInfo.publishedDate}</td>
                        <td>
                          <div>
                            <NewButton disabled={!book.volumeInfo.description} onClick={() => handleOpenModal(book.volumeInfo.description)}>
                              See description
                            </NewButton>
                            <button
                              className={styles.button}
                              onClick={() => favoriteBook(index, book.id)}
                            >
                              {
                                book.favorite && book.favorite === true ? (
                                  <StarFull />
                                ) : (
                                  <StarEmpty />
                                )
                              }
                            </button>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <Paginator
            pageCount={Math.ceil(books.length / 10)}
            pageRangeDisplayed={10}
            marginPagesDisplayed={10}
            changePage={changePage}
          />
        </>
      ) : (
        <section>
          <div className={styles.noSearch}>
            <h2>Procure livros por título ou palavra chave</h2>
          </div>
        </section>
      )}
    </main>
  );
}
