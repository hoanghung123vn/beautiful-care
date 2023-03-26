import classNames from 'classnames';
import {
  CustomerIcon,
  DiscountIcon,
  HomeIcon,
  ProductIcon,
} from '@beautiful-care/ui-component';
import { Link, useMatch } from 'react-router-dom';

interface SideBarProps {
  children?: any;
  className?: string;
}

export default function SideBar({ className }: SideBarProps) {
  const dashboardActive = !!useMatch({
    path: '/admin/dashboard',
    end: false,
  });

  const orderActive = !!useMatch({
    path: '/admin/orders',
    end: false,
  });

  const customerActive = !!useMatch({
    path: '/admin/customers',
    end: false,
  });

  const serviceActive = !!useMatch({
    path: '/admin/services',
    end: false,
  });

  const comboActive = !!useMatch({
    path: '/admin/combos',
    end: false,
  });

  return (
    <div
      className={classNames(
        'bg-gray-800 w-56 text-white fixed h-screen',
        className
      )}
    >
      <ul className="menu w-56 p-2">
        <li>
          <Link
            to={'/admin/dashboard'}
            className={classNames({ active: dashboardActive })}
          >
            <HomeIcon className="h-5" />
            Tổng quan
          </Link>
        </li>
        <li>
          <Link
            to="/admin/orders"
            className={classNames({ active: orderActive })}
          >
            <CustomerIcon className="h-5" />
            Đơn hàng
          </Link>
        </li>
        <li>
          <Link
            to="/admin/customers"
            className={classNames({ active: customerActive })}
          >
            <CustomerIcon className="h-5" />
            Khách hàng
          </Link>
        </li>
        <li>
          <Link
            to={'/admin/services'}
            className={classNames({ active: serviceActive })}
          >
            <ProductIcon className="h-5" />
            Dịch vụ
          </Link>
        </li>
        <li>
          <Link
            to={'/admin/combos'}
            className={classNames({ active: comboActive })}
          >
            <DiscountIcon className="h-5" />
            Combo
          </Link>
        </li>
      </ul>
    </div>
  );
}
