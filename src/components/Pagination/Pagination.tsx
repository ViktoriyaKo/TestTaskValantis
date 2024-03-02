import { memo } from 'react';
import { arrowLeft, arrowRight } from '../../assets/iconsHtml';
import { Icon } from '../../helpers/Icon';
import styles from './Pagination.module.css';
import { useSearchParams } from 'react-router-dom';

interface IProps {
  totalCount: number;
  pageSize?: number;
}

const Pagination = memo((props: IProps) => {
  const { totalCount, pageSize = 50 } = props;
  const pagesCount = Math.ceil(totalCount / pageSize);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);

  const handlePageChange = (page: string) => {
    setSearchParams({ page: page });
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.wrapper}>
      <button
        disabled={page < 2}
        className={styles.button}
        onClick={() => handlePageChange(`${page - 1}`)}
      >
        <Icon html={arrowLeft} />
      </button>
      <div className={styles.text}>
        {page} из {pagesCount}
      </div>
      <button
        className={styles.button}
        disabled={page >= pagesCount}
        onClick={() => handlePageChange(`${page + 1}`)}
      >
        <Icon html={arrowRight} />
      </button>
    </div>
  );
});

export default Pagination;
