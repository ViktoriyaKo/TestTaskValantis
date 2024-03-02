import { useEffect, useState } from 'react';
import CustomLink from '../../components/CustomLink/CustomLink';
import styles from './CardPage.module.css';
import { requestToDB } from '../../api/api';
import { useParams } from 'react-router-dom';
import { ICard } from '../../types/types';
import getImgSrc from '../../helpers/getImgSrc';

const CardPage = () => {
  const [product, setProduct] = useState<ICard[]>([]);
  const { id } = useParams();
  const image = getImgSrc('jewelry.jpg');

  useEffect(() => {
    const getData = async () => {
      requestToDB('get_items', { ids: [id] }, setProduct);
    };
    getData();
  }, []);

  return (
    <div className={styles.container}>
      {product && product.length > 0 && (
        <>
          <div className={styles.content}>
            <img
              src={image}
              alt={product[0].product}
              className={styles.image}
            />
          </div>

          <div className={styles.content}>
            <p className={styles.muted}>ID: {product[0].id}</p>
            <h1 className={styles.title}>{product[0].product}</h1>
            <h3 className={styles.description}>{product[0].brand}</h3>
            <span className={styles.price}>{product[0].price} ₽</span>
            <CustomLink
              text={'Купить'}
              href={'https://telegram.me/viktoriya_000001'}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CardPage;
