import { ICard } from '../../types/types';
import styles from './Card.module.css';

interface Props {
  card: ICard;
}

const Card = (props: Props) => {
  const { brand, price, product } = props.card;

  return (
    <div className={styles.wrapper}>
      <img alt={product} src={'/logo.png'} className={styles.image} />
      <p className={styles.price}>{price} ₽</p>
      <h3 className={styles.muted}>{brand}</h3>
      <p>{product}</p>
      <button className={styles.button}>Заказать сейчас</button>
    </div>
  );
};

export default Card;
