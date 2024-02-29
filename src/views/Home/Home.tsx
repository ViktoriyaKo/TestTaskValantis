import { useEffect, useRef, useState } from 'react';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import styles from './Home.module.css';
import {
  getAllBrands,
  getAllProducts,
  requestToDB,
  setFilters,
} from '../../api/api';
import Search from '../../components/Search/Search';
import Filter from '../../components/Filter/Filter';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const isFirstRender = useRef(false);

  const [products, setProducts] = useState([
    {
      brand: null,
      id: '2b7c7643-6852-4562-8a72-7666c72b3518',
      price: 12500,
      product: 'Золотое кольцо с топазом и бриллиантами',
    },
    {
      brand: null,
      id: '9f2722a8-dac6-4f71-b877-1731d30ae6db',
      price: 8500,
      product: 'Золотое кольцо с бриллиантами и изумрудом',
    },

    {
      brand: 'Piaget',
      id: '91a4056d-462d-4469-b97d-1d442d1e2fbc',
      price: 23363,
      product: 'Золотое колье с рубинами и бриллиантами',
    },
    {
      brand: 'Jacob & Co',
      id: '18e4e3bd-5e60-4348-8c92-4f61c676be1f',
      price: 52400,
      product: 'Золотое кольцо с бриллиантом',
    },
  ]);

  const [options, setOptions] = useState([
    'Alfieri & St.John',
    'Audemars Piguet',
    'Baraka',
    'Bibigi',
    'Bvlgari',
    'Carrera y Carrera',
    'Cartier',
    'Casa Gi',
    'Casato',
    'Chaumet',
    'Van Cleef & Arpels',
  ]);

  const totalCount = products.length;

  useEffect(() => {
    if (isFirstRender.current) {
      const updateData = async () => {
        setFilters(location.search, setProducts);
      };
      updateData();
    }
  }, [location.search]);

  useEffect(() => {
    // set-dates:
    const getData = async () => {
      await getAllBrands(setOptions);
      await getAllProducts(setProducts);
      return;
    };

    // getData();
    isFirstRender.current = true;
  }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await requestToDB('get_ids', { offset: 1, limit: 10 });

  //     await requestToDB('get_items', { ids: data }, setProducts);
  //     return;
  //   };
  //   getData();
  // }, []);

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
          <div className={styles.wrapper}>
            {products.map((card) => {
              return <Card key={card.id} card={card} />;
            })}
          </div>
          <Pagination totalCount={totalCount} />
        </div>
      </div>
    </div>
  );
};

export default Home;
