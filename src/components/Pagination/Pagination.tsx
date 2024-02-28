import { useState } from 'react';
import { arrowLeft, arrowRight } from '../../assets/iconsHtml';
import { Icon } from '../../helpers/Icon';
import styles from './Pagination.module.css';
import { useLocation } from 'react-router-dom';

interface IProps {
  totalCount: number;
  pageSize?: number;
}

const Pagination = (props: IProps) => {
  const { totalCount, pageSize = 2 } = props;
  const pagesCount = Math.ceil(totalCount / pageSize);
  const location = useLocation();
  const page = parseInt(location.search?.split('=')[1] || '1');
  const [currentPage, setCurrentPage] = useState(page);
  const handlePageChange = (page: string) => {
    // navigate({ search: queryParams.toString() });
  };
  console.log(currentPage);

  return (
    <div className={styles.wrapper}>
      <button
        disabled={currentPage < 2}
        className={styles.button}
        // onClick={() => movePrevious(currentPage)}
      >
        <Icon html={arrowLeft} />
      </button>
      <div className={styles.text}>
        {currentPage} из {pagesCount}
      </div>
      <button
        className={styles.button}
        disabled={currentPage >= pagesCount}
        onClick={() => handlePageChange(`${currentPage + 1}`)}
      >
        <Icon html={arrowRight} />
      </button>
    </div>
  );
};

export default Pagination;
