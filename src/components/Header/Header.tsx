import { Link } from 'react-router-dom';
import { instagramHtml, phoneHtml, telegramHtml } from '../../assets/iconsHtml';
import { Icon } from '../../helpers/Icon';
import styles from './Header.module.css';

const Header = () => {
  const navIcons = [
    {
      icon: instagramHtml,
      href: 'https://telegram.me/viktoriya_000001',
    },
    { icon: telegramHtml, href: 'https://telegram.me/viktoriya_000001' },
    { icon: phoneHtml, href: 'https://wa.me/79817805044' },
  ];

  return (
    <header>
      <div className={styles.topLine}>
        <h2 className={styles.topLineText}>Test Task Valantis</h2>
      </div>
      <div className={styles.wrapper}>
        <Link to={'/'}>
          <img alt={'logo'} src={'/logo.png'} className={styles.logo} />
        </Link>

        <ul className={styles.nav}>
          {navIcons.map((icon) => {
            return (
              <li key={icon.href} className={styles.icon}>
                <a href={icon.href}>
                  <Icon html={icon.icon} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Header;
