import classNames from 'classnames';

export interface PaginateProps {
  page: number;
  limit: number;
}

export interface PaginationProps {
  total: number;
  page: number;
  limit?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  total,
  page,
  limit = 10,
  onPageChange,
  className,
}: PaginationProps) {
  const totalPage = Math.ceil(total / limit);
  const fromRecord = (page - 1) * limit + 1;
  const toRecord = Math.min(page * limit, total);
  return (
    <div className={classNames('flex justify-between', className)}>
      <h2>
        Hiển thị kết quả từ {fromRecord}-{toRecord} trên tổng số {total}
      </h2>
      <div className="btn-group">
        {page > 2 && (
          <button className="btn" onClick={() => onPageChange(page - 2)}>
            {page - 2}
          </button>
        )}
        {page > 1 && (
          <button className="btn" onClick={() => onPageChange(page - 1)}>
            {page - 1}
          </button>
        )}
        <button className="btn btn-active">{page}</button>
        {totalPage > page && (
          <button className="btn" onClick={() => onPageChange(page + 1)}>
            {page + 1}
          </button>
        )}
        {totalPage > page + 1 && (
          <button className="btn" onClick={() => onPageChange(page + 2)}>
            {page + 2}
          </button>
        )}
      </div>
    </div>
  );
}

export default Pagination;
