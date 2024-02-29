import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { crossIcon, searchIcon } from '../../assets/iconsHtml';
import { Icon } from '../../helpers/Icon';
import styles from './Search.module.css';

interface IProps {
  placeholder: string;
  type?: string;
}

const Seacrh = (props: IProps) => {
  const { placeholder, type = 'text' } = props;
  const [searchValue, setSearchValue] = useState('');

  const clearSearch = () => {
    setSearchValue('');
  };

  const search = () => {
    console.log('start...');
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

export default Seacrh;
