import { Link, useLocation } from 'react-router-dom';
import { instagramHtml, phoneHtml, telegramHtml } from '../../assets/iconsHtml';
import { Icon } from '../../helpers/Icon';
import styles from './Header.module.css';
import { routers } from '../../routers/routers';
import clsx from 'clsx';
import getImgSrc from '../../helpers/getImgSrc';

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const logo = getImgSrc('logo.png');

  const navIcons = [
    {
      id: 1,
      icon: instagramHtml,
      href: 'https://telegram.me/viktoriya_000001',
    },
    { id: 2, icon: telegramHtml, href: 'https://telegram.me/viktoriya_000001' },
    { id: 3, icon: phoneHtml, href: 'https://wa.me/79817805044' },
  ];

  return (
    <header>
      <div className={styles.topLine}>
        <h2 className={styles.topLineText}>Test Task Valantis</h2>
      </div>
      <div className={styles.wrapper}>
        <Link to={'/'}>
          <img alt={'logo'} src={logo} className={styles.logo} />
        </Link>
        <nav className={styles.navList}>
          {routers.map((router) => {
            return (
              <Link
                key={router.path}
                className={clsx({ [styles.active]: pathname === router.path })}
                to={router.path}
              >
                {router.title}
              </Link>
            );
          })}
        </nav>

        <ul className={styles.nav}>
          {navIcons.map((icon) => {
            return (
              <li key={icon.id} className={styles.icon}>
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
