import { CircleLoader } from 'react-spinners';
import styles from './Spinner.module.css';

interface IProps {
  loading: boolean;
}

const Spinner = (props: IProps) => {
  const loading = props.loading;
  return (
    <div className={styles.wrapper}>
      <CircleLoader color="rgb(10 95 119)" loading={loading} size={100} />
    </div>
  );
};

export default Spinner;
