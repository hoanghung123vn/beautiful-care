import {
  formatNumber,
  Pagination,
  SpinnerIcon,
  Input,
} from '@beautiful-care/ui-component';
import { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetOrders } from '../hooks/useGetOrder';
import { useDebounce } from '../hooks/useDebounce';

export interface OrdersPageState {
  page: number;
  limit: number;
  name: string;
}

export default function Orders() {
  const [paginate, setPaginate] = useReducer(
    (
      prev: OrdersPageState,
      next: Partial<OrdersPageState>
    ): OrdersPageState => {
      return { ...prev, ...next };
    },
    { page: 1, limit: 5, name: '' }
  );
  const { page, limit, name } = paginate;
  const nameDebounce = useDebounce(name, 500);
  const { orders, isLoading, isError, total } = useGetOrders(
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
          onClick={() => navigate('/admin/orders/create')}
        >
          Thêm order
        </button>
      </div>
      <div className="bg-white mt-4 rounded p-4">
        <div className="flex items-center">
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1 w-48">
              Lọc order
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
                    <th>Tên khách hàng</th>
                    <th>Số điện thoại khách hàng</th>
                    <th>Số lượng dịch vụ</th>
                    <th>Tổng giá trị</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.$id}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-bold">
                              <Link to={`/admin/orders/${order.$id}`}>
                                {order.customerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{order.customerPhone}</td>
                      <td>
                        {order.serviceQuantities.reduce((a, b) => a + b, 0)}
                      </td>
                      <td>{formatNumber(order.totalPrice)} đ</td>
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
