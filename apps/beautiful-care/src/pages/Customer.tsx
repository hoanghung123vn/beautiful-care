import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { object, string } from 'zod';
import { CustomerRequest } from '../apis/customer.api';
import Input from '../components/Input';
import Select from '../components/Select';
import TextArea from '../components/TextArea';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Customer() {
  const variantSchema = object({
    name: string()
      .nonempty('Họ tên không được để trống')
      .max(255, 'Họ tên tối đa 255 ký tự'),
    phone: string()
      .nonempty('Số điện thoại không được để trống')
      .max(20, 'Số điện thoại tối đa 20 ký tự'),
    email: string().max(50, 'Email tối đa 50 ký tự'),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid, isDirty },
  } = useForm<CustomerRequest>({ resolver: zodResolver(variantSchema) });

  const onSubmit = (data: CustomerRequest) => {
    console.log(data);
  };

  return (
    <>
      <Link to={'/admin/customers'} className="">
        Khách hàng
      </Link>
      <h2 className="text-xl font-semibold py-4">Thêm mới khách hàng</h2>
      <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
        <div className="grid lg:flex w-full gap-4">
          <div className="bg-white border rounded shadow-sm p-4 lg:w-2/3 grid lg:grid-cols-2 gap-x-4">
            <Input
              title="Họ tên"
              placeholder="Nhập họ tên"
              {...register('name')}
            />
            <Input
              title="Số điện thoại"
              placeholder="Nhập số điện thoại"
              {...register('phone')}
            />
            <Input
              title="Email"
              placeholder="Nhập email"
              {...register('email')}
            />
            <Select title="Giới tính" />
          </div>
          <div className="bg-white border rounded shadow-sm p-4 lg:w-1/3">
            <TextArea title="Ghi chú" />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Link to="/admin/customers">
            <button className="btn">Hủy</button>
          </Link>
          <button className="btn btn-primary ml-2" type="submit">
            Lưu
          </button>
        </div>
      </form>
    </>
  );
}
