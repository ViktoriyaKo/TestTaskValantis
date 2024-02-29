import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Filter.module.css';

import qs from 'qs';
import { ChangeEvent, memo } from 'react';

interface IProps {
  options: string[];
}

const Filter = memo((props: IProps) => {
  const options = props.options;
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const filterQuery = searchParams.get('brand');
  const filterArray = filterQuery?.split(',');

  const params = qs.parse(location.search.substring(1));

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const { value, checked } = target;

    if (checked) {
      if (filterArray?.includes(value)) {
        return;
      } else {
        const newFilter = filterArray ? [...filterArray, value] : [value];

        navigate({
          pathname: '/',
          search: qs.stringify({ ...params, brand: newFilter.join(',') }),
        });
      }
    } else {
      const newFilter =
        filterArray && filterArray.filter((item) => item !== value);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { brand, ...rest } = params;
      const search =
        newFilter && newFilter.length > 0
          ? { ...params, brand: newFilter.join(',') }
          : { ...rest };

      navigate({
        pathname: '/',
        search: qs.stringify(search),
      });
    }
  };

  return (
    <div className={styles.container}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Брэнды</legend>
        {options &&
          options.length > 0 &&
          options.map((brand) => {
            const isChecked = filterArray?.includes(brand) ? true : false;
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
