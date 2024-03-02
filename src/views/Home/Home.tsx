import { memo, useEffect, useMemo, useRef, useState } from 'react';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import styles from './Home.module.css';
import { getAllBrands, getAllProducts, setFilters } from '../../api/api';
import Search from '../../components/Search/Search';
import Filter from '../../components/Filter/Filter';
import { useLocation, useSearchParams } from 'react-router-dom';

import Spinner from '../../components/Spinner/Spinner';
import { ICard } from '../../types/types';
import { queryInApp } from '../../config';

const Home = memo(() => {
  const location = useLocation();
  const isFirstRender = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState<ICard[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  const [searchParams] = useSearchParams();

  const isParamsInQuery = useMemo(() => {
    return queryInApp.some((item) => location.search.includes(item));
  }, [location.search]);

  const isShowPagination =
    !isLoading && totalProducts && products.length > 0 && !isParamsInQuery;

  useEffect(() => {
    if (isFirstRender.current) {
      const updateData = async () => {
        await setFilters(location.search, setProducts);
      };
      updateData();
    }
  }, [location.search]);

  useEffect(() => {
    // set-dates:
    const initialPage = Number(searchParams.get('page') || 1);
    setIsLoading(true);
    const getData = async () => {
      await getAllBrands(setOptions, setTotalProducts);
      if (!isParamsInQuery) {
        await getAllProducts(setProducts, initialPage);
      } else {
        await setFilters(location.search, setProducts);
      }
      setIsLoading(false);
      return;
    };
    getData();
    isFirstRender.current = true;
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Каталог</h1>
      <div className={styles.inner}>
        <div className={styles.filtersWrapper}>
          <Filter options={options} />
          <Search
            placeholder="Введите стоимость..."
            type={'number'}
            queryString={'price'}
          />
        </div>
        <div className={styles.catalogWrapper}>
          <Search placeholder="Начните поиск..." queryString={'search'} />
          {!isLoading ? (
            <div className={styles.wrapper}>
              {products && products.length > 0 ? (
                products.map((card) => {
                  return <Card key={card.id} card={card} />;
                })
              ) : (
                <h4 className={styles.notFoundText}>
                  Поиск не дал результатов &#128542;
                </h4>
              )}
            </div>
          ) : (
            <Spinner loading={true} />
          )}
          {isShowPagination ? (
            <Pagination pageSize={50} totalCount={totalProducts} />
          ) : null}
        </div>
      </div>
    </div>
  );
});

export default Home;
