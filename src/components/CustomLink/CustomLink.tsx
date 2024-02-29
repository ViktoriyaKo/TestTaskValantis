import { Link } from 'react-router-dom';
import styles from './CustomLink.module.css';

interface IProps {
  text: string;
  href?: string;
}

const CustomLink = (props: IProps) => {
  const { text, href } = props;
  return href ? (
    <Link to={href} className={styles.link}>
      {text}
    </Link>
  ) : (
    <button className={styles.link}>{text}</button>
  );
};

export default CustomLink;
