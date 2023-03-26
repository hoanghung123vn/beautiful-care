import { Pagination, SpinnerIcon, Input } from '@beautiful-care/ui-component';
import { Link, useNavigate } from 'react-router-dom';
import { useCombineState } from '../hooks/useCombineState';
import { useDebounce } from '../hooks/useDebounce';
import { useGetCustomers } from '../hooks/useGetCustomer';

export interface CustomersPageState {
  page: number;
  limit: number;
  phone: string;
}

export default function Customers() {
  const [pageState, setPageState] = useCombineState<CustomersPageState>({
    page: 1,
    limit: 5,
    phone: '',
  });
  const { page, limit, phone } = pageState;
  const phoneDebounce = useDebounce(phone, 500);
  const { customers, isLoading, isError, total } = useGetCustomers(
    page,
    limit,
    phoneDebounce
  );
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Khách hàng</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/admin/customers/create')}
        >
          Thêm khách hàng
        </button>
      </div>
      <div className="bg-white mt-4 rounded p-4">
        <div className="flex items-center">
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1 w-48">
              Lọc khách hàng
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            ></ul>
          </div>
          <div className="form-control w-full">
            <div className="input-group">
              <Input
                placeholder="Tìm kiếm bằng SĐT"
                onChange={(event) =>
                  setPageState({ phone: event.target.value, page: 1 })
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
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Tổng số dịch vụ sử dụng</th>
                    <th>Tổng chi tiêu</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.$id}>
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
                              <Link to={`/admin/customers/${customer.$id}`}>
                                {customer.name}
                              </Link>
                            </div>
                            <div className="text-sm opacity-50">
                              {customer.address}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{customer.phone}</td>
                      <td>{customer.email}</td>
                      <td>{customer.totalUsedTimes || 0}</td>
                      <td>{customer.totalSpend || 0} đ</td>
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
              onPageChange={(page) => setPageState({ page })}
            />
          </>
        )}
      </div>
    </>
  );
}
