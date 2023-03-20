import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { CustomerRequest } from '../apis/customer.api';
import Input from '../components/Input';
import Select from '../components/Select';
import TextArea from '../components/TextArea';

export default function Customer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerRequest>();

  const onSubmit = (data: CustomerRequest) => {
    console.log(data);
  };

  return (
    <>
      <Link to={'/admin/customers'} className="">
        Khách hàng
      </Link>
      <h2 className="text-xl font-semibold py-4">Thêm mới khách hàng</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid lg:flex w-full gap-4"
      >
        <div className="bg-white border rounded shadow-sm p-4 lg:w-2/3 grid lg:grid-cols-2 gap-x-4">
          <Input title="Họ tên" placeholder="Nhập họ tên" />
          <Input title="Số điện thoại" placeholder="Nhập số điện thoại" />
          <Input title="Email" placeholder="Nhập email" />
          <Select title="Giới tính" />
        </div>
        <div className="bg-white border rounded shadow-sm p-4 lg:w-1/3">
          <TextArea title="Ghi chú" />
        </div>
      </form>
    </>
  );
}
