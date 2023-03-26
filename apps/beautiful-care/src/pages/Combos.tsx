import { Pagination, SpinnerIcon } from '@beautiful-care/ui-component';
import { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCombos } from '../hooks/useGetCombo';
import { useDebounce } from '../hooks/useDebounce';

export interface CombosPageState {
  page: number;
  limit: number;
  name: string;
}

export default function Combos() {
  const [paginate, setPaginate] = useReducer(
    (
      prev: CombosPageState,
      next: Partial<CombosPageState>
    ): CombosPageState => {
      return { ...prev, ...next };
    },
    { page: 1, limit: 5, name: '' }
  );
  const { page, limit, name } = paginate;
  const nameDebounce = useDebounce(name, 500);
  const { combos, isLoading, isError, total } = useGetCombos(
    page,
    limit,
    nameDebounce
  );
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Khách hàng</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/admin/combos/create')}
        >
          Thêm combo
        </button>
      </div>
      <div className="bg-white mt-4 rounded p-4">
        <div className="flex items-center">
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1 w-48">
              Lọc combo
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
          <div className="form-control w-full">
            <div className="input-group">
              <input
                placeholder="Tìm kiếm bằng tên"
                className="input input-bordered w-full"
                onChange={(event) =>
                  setPaginate({ name: event.target.value, page: 1 })
                }
              />
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <SpinnerIcon className="animate-spin" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto w-full mt-4">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <th>Tên</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Mô tả</th>
                  </tr>
                </thead>
                <tbody>
                  {combos.map((combo) => (
                    <tr key={combo.$id}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-8 h-8">
                              <img src="https://via.placeholder.com/32x32" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              <Link to={`/admin/combos/${combo.$id}`}>
                                {combo.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{combo.quantity}</td>
                      <td>{combo.price} đ</td>
                      <td>{combo.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              className="mt-2"
              total={total}
              page={page}
              limit={limit}
              onPageChange={(page) => setPaginate({ page })}
            />
          </>
        )}
      </div>
    </>
  );
}
