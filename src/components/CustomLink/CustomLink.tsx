import styles from './CustomLink.module.css';

interface IProps {
  text: string;
  href?: string;
}

const CustomLink = (props: IProps) => {
  const { text, href } = props;
  return (
    <a href={href} className={styles.link} onClick={(e) => e.stopPropagation()}>
      {text}
    </a>
  );
};

export default CustomLink;
