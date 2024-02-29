import { memo } from 'react';
import { arrowLeft, arrowRight } from '../../assets/iconsHtml';
import { Icon } from '../../helpers/Icon';
import styles from './Pagination.module.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'qs';

interface IProps {
  totalCount: number;
  pageSize?: number;
}

const Pagination = memo((props: IProps) => {
  const { totalCount, pageSize = 2 } = props;
  const pagesCount = Math.ceil(totalCount / pageSize);
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const params = qs.parse(location.search.substring(1));

  const handlePageChange = (page: string) => {
    navigate({
      pathname: '/',
      search: qs.stringify({ ...params, page: String(page) }),
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
