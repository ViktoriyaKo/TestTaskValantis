import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <h1>Краткая информация</h1>
      <ul className={styles.textWrapper}>
        <li>
          <a
            href={'https://github.com/ValantisJewelry/TestTaskValantis'}
            className={styles.link}
          >
            Тестовое задание&nbsp;
          </a>
          выполнено для компании Valantis
        </li>
        <li>
          <span className={styles.bold}>Исполнитель:</span> Авсиевич Виктория
        </li>
        <li>
          <span className={styles.bold}>Используемые технологии: </span>React,
          css-modules -{' '}
          <span className={styles.bold}>без использования CSS-библиотек</span> и
          препроцессоров
        </li>
        <li>
          <span className={styles.text}>
            Задание интересное, надеюсь, что у нас состоится собеседование, буду
            ждать!
          </span>
        </li>
        <li>
          *На всякий случай прикреплю&nbsp;
          <a
            href={'https://portfolio-front-end-developer.netlify.app/'}
            className={styles.link}
          >
            ссылочку на портфолио
          </a>
        </li>
      </ul>
    </div>
  );
};

export default About;
