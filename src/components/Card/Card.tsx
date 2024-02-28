import { Link } from 'react-router-dom';
import { ICard } from '../../types/types';
import CustomLink from '../CustomLink/CustomLink';
import styles from './Card.module.css';

interface Props {
  card: ICard;
}

const Card = (props: Props) => {
  const { brand, price, product, id } = props.card;

  return (
    <Link to={`/${id}`} className={styles.wrapper}>
      <img alt={product} src={'/jewelry.jpg'} className={styles.image} />
      <p className={styles.price}>{price} ₽</p>
      <h3 className={styles.muted}>{brand}</h3>
      <p className={styles.product}>{product}</p>
      <CustomLink
        text={'Заказать сейчас'}
        href={'https://telegram.me/viktoriya_000001'}
      />
    </Link>
  );
};

export default Card;
