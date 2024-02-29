import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { crossIcon, searchIcon } from '../../assets/iconsHtml';
import { Icon } from '../../helpers/Icon';
import styles from './Search.module.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'qs';

interface IProps {
  placeholder: string;
  type?: string;
  queryString: string;
}

const Search = (props: IProps) => {
  const { placeholder, type = 'text', queryString } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get(queryString) || '';
  const [searchValue, setSearchValue] = useState(searchQuery);
  const params = qs.parse(location.search.substring(1));

  const clearSearch = () => {
    delete params[queryString];
    setSearchValue('');
    setSearchParams(qs.stringify(params));
  };

  const search = () => {
    console.log('start...');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { page, ...rest } = params;
    navigate({
      pathname: '/',
      search: qs.stringify({ ...rest, [queryString]: searchValue }),
    });
  };

  const startSearch = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        search();
      }
    },
    [searchValue]
  );

  useEffect(() => {
    document.addEventListener('keydown', startSearch, false);

    return () => {
      document.removeEventListener('keydown', startSearch, false);
    };
  }, [startSearch]);

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
};

export default Search;
