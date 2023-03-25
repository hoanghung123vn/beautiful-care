import { PaginateProps, Pagination } from '@beautiful-care/ui-component';
import { Query } from 'appwrite';
import { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCustomers } from '../hooks';

export default function Customers() {
  const [paginate, setPaginate] = useReducer(
    (prev: PaginateProps, next: Partial<PaginateProps>): PaginateProps => {
      return { ...prev, ...next };
    },
    { page: 1, limit: 5 }
  );
  const { page, limit } = paginate;
  const { customers, isLoading, isError, total } = useGetCustomers([
    Query.limit(limit),
    Query.offset((page - 1) * limit),
  ]);
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
                type="text"
                placeholder="Search…"
                className="input input-bordered w-full"
              />
              <button className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
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
          onPageChange={(page) => setPaginate({ page })}
        />
      </div>
    </>
  );
}
