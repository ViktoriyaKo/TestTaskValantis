import styles from './Filter.module.css';

const Filter = () => {
  const inputs = [
    { id: '1', name: 'brand1' },
    { id: '2', name: 'brand2' },
  ];

  return (
    <div className={styles.container}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Брэнды</legend>
        {inputs.map((item) => {
          return (
            <div className={styles.wrapper} key={item.id}>
              <input
                className={styles.input}
                onChange={(e) => console.log(e)}
                type="checkbox"
                id={item.id}
                value={item.name}
                name={'brands'}
              />
              <label htmlFor={item.id}>{item.name}</label>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
};

export default Filter;
