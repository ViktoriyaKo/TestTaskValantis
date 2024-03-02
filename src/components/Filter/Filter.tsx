import { useSearchParams } from 'react-router-dom';
import styles from './Filter.module.css';

import { ChangeEvent, memo } from 'react';

interface IProps {
  options: string[];
}

const Filter = memo((props: IProps) => {
  const options = props.options;
  const [searchParams, setSearchParams] = useSearchParams();
  const filterQuery = searchParams.get('brand');

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const { value, checked } = target;

    if (checked) {
      if (!filterQuery?.includes(value)) {
        const encodedValue = encodeURIComponent(value);
        setSearchParams(`brand=${encodedValue}`);
      }
    } else {
      setSearchParams('');
    }
  };

  return (
    <div className={styles.container}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Брэнды</legend>
        {options &&
          options.length > 0 &&
          options.map((brand) => {
            const isChecked = filterQuery === brand;
            return (
              <div className={styles.wrapper} key={brand}>
                <input
                  checked={isChecked}
                  className={styles.input}
                  onChange={handlerChange}
                  type="checkbox"
                  value={brand}
                  id={brand}
                  name={'brand'}
                />
                <label htmlFor={brand}>{brand}</label>
              </div>
            );
          })}
      </fieldset>
    </div>
  );
});

export default Filter;
