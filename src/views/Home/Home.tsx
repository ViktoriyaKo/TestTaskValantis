import Card from '../../components/Card/Card';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Каталог</h1>
      <div className={styles.wrapper}>
        <Card />
      </div>
    </div>
  );
};

export default Home;
