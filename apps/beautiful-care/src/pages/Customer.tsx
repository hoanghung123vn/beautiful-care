import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, string, TypeOf, z } from 'zod';
import { customerApi, CustomerRequest } from '../apis/customer.api';
import Input from '../components/Input';
import Select from '../components/Select';
import TextArea from '../components/TextArea';
import { useGetCustomer } from '../hooks';
import { DatePicker } from '@beautiful-care/ui-component';

const variantSchema = object({
  name: string()
    .nonempty('Họ tên không được để trống')
    .max(255, 'Họ tên tối đa 255 ký tự'),
  phone: string()
    .nonempty('Số điện thoại không được để trống')
    .max(20, 'Số điện thoại tối đa 20 ký tự'),
  email: string().max(50, 'Email tối đa 50 ký tự'),
  gender: z.enum(['male', 'female']).default('female'),
  note: string().max(500, 'Ghi chú tối đa 500 ký tự'),
});

export type Customer2Request = TypeOf<typeof variantSchema>;

export default function Customer() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { customer } = useGetCustomer(params.id);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid, isDirty },
  } = useForm<CustomerRequest>({
    resolver: zodResolver(variantSchema),
    mode: 'onChange',
    values: customer,
  });

  const onSubmit = async (data: CustomerRequest) => {
    try {
      const response = await customerApi.createCustomer(data);
      toast('Thêm khách hàng thành công');
      navigate(`/admin/customers/${response.$id}`);
    } catch (error) {
      console.log(error);

      toast.error('Thêm khách hàng thất bại');
    }
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
              error={errors.name?.message}
            />
            <Input
              title="Số điện thoại"
              placeholder="Nhập số điện thoại"
              {...register('phone')}
              error={errors.phone?.message}
            />
            <Input
              title="Email"
              placeholder="Nhập email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Select
              value={'female'}
              {...register('gender')}
              options={[
                { label: 'Nam', value: 'male' },
                { label: 'Nữ', value: 'female' },
              ]}
              title="Giới tính"
              error={errors.gender?.message}
            />
          </div>
          <div className="bg-white border rounded shadow-sm p-4 lg:w-1/3">
            <TextArea
              title="Ghi chú"
              {...register('note')}
              placeholder="Nhập ghi chú"
              error={errors.note?.message}
            />
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
      <DatePicker id={'dasdsa'} value={''} />
    </>
  );
}
