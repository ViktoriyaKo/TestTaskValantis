import { instagramHtml, phoneHtml, telegramHtml } from '../../assets/iconsHtml';
import { Icon } from '../../helpers/Icon';
import styles from './Header.module.css';

const Header = () => {
  const navIcons = [
    {
      icon: instagramHtml,
      href: '1',
    },
    { icon: telegramHtml, href: '2' },
    { icon: phoneHtml, href: '3' },
  ];

  return (
    <header>
      <div className={styles.topLine}>
        <h2 className={styles.topLineText}>Test Task</h2>
      </div>
      <div className={styles.wrapper}>
        <img alt={'logo'} src={'/logo.png'} className={styles.logo} />
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
