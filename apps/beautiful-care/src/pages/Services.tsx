import {
  formatNumber,
  Pagination,
  SpinnerIcon,
  Input,
} from '@beautiful-care/ui-component';
import { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetServices } from '../hooks/useGetService';
import { useDebounce } from '../hooks/useDebounce';

export interface ServicesPageState {
  page: number;
  limit: number;
  name: string;
}

export default function Services() {
  const [paginate, setPaginate] = useReducer(
    (
      prev: ServicesPageState,
      next: Partial<ServicesPageState>
    ): ServicesPageState => {
      return { ...prev, ...next };
    },
    { page: 1, limit: 5, name: '' }
  );
  const { page, limit, name } = paginate;
  const nameDebounce = useDebounce(name, 500);
  const { services, isLoading, isError, total } = useGetServices(
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
          onClick={() => navigate('/admin/services/create')}
        >
          Thêm dịch vụ
        </button>
      </div>
      <div className="bg-white mt-4 rounded p-4">
        <div className="flex items-center">
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1 w-48">
              Lọc dịch vụ
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            ></ul>
          </div>
          <div className="form-control w-full">
            <div className="input-group">
              <Input
                placeholder="Tìm kiếm bằng tên"
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
                    <th>Giá</th>
                    <th>Mô tả</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.$id}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-bold">
                              <Link to={`/admin/services/${service.$id}`}>
                                {service.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{formatNumber(service.price)} đ</td>
                      <td>{service.description}</td>
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
