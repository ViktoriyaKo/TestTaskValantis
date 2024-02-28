import CustomLink from '../../components/CustomLink/CustomLink';
import styles from './CardPage.module.css';

const CardPage = () => {
  const product = {
    brand: 'brand',
    id: '1789ecf3-f81c-4f49-ada2-83804dcc74b0',
    price: 16700.0,
    product: 'Золотое кольцо с бриллиантами',
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          src={'/jewelry.jpg'}
          alt={product.product}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{product.product}</h1>
        <h3 className={styles.description}>{product.brand}</h3>
        <span className={styles.price}>{product.price} ₽</span>
        <CustomLink
          text={'Заказать сейчас'}
          href={'https://telegram.me/viktoriya_000001'}
        />
      </div>
    </div>
  );
};

export default CardPage;
