import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.wrapper}>
      <img alt={'logo'} src={'/logoDark.png'} className={styles.logo} />
      <span>Avsievich Viktoriia</span>
      <span>{currentYear}</span>
    </footer>
  );
};

export default Footer;
