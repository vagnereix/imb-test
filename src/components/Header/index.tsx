import styles from "./styles.module.scss";

import { useSearch } from "../../hooks/useSearch";
import { Search } from "../../assets/icons/js/search";

export function Header() {
  const { handleSearch, setSearching } = useSearch();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <form onSubmit={handleSearch}>
          <input placeholder="Palavra chave" type="text" onChange={event => setSearching(event.target.value)} />
          <button type="submit">
            <Search />
          </button>
        </form>
      </div>
    </header>
  );
}
