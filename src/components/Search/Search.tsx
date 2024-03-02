import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { crossIcon, searchIcon } from '../../assets/iconsHtml';
import { Icon } from '../../helpers/Icon';
import styles from './Search.module.css';
import { useSearchParams } from 'react-router-dom';

interface IProps {
  placeholder: string;
  type?: string;
  queryString: string;
}

const Search = memo((props: IProps) => {
  const { placeholder, type = 'text', queryString } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get(queryString) || '';
  const [searchValue, setSearchValue] = useState(searchQuery);

  const clearSearch = useCallback(() => {
    setSearchValue('');
    setSearchParams('');
  }, [setSearchParams]);

  const search = useCallback(() => {
    setSearchParams({ [queryString]: searchValue });
  }, [queryString, searchValue, setSearchParams]);

  const startSearch = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        search();
      }
    },
    [search]
  );

  useEffect(() => {
    if (searchValue) {
      document.addEventListener('keydown', startSearch, false);
    }

    return () => {
      document.removeEventListener('keydown', startSearch, false);
    };
  }, [searchValue, startSearch]);

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
          placeholder={placeholder}
          value={searchValue}
        />
        {searchValue && (
          <button
            aria-label={'clear search'}
            className={styles.crossIcon}
            onClick={clearSearch}
          >
            <Icon html={crossIcon} />
          </button>
        )}
      </div>
      <button className={styles.buttonSearch} onClick={search}>
        <Icon html={searchIcon} />
      </button>
    </div>
  );
});

export default Search;
