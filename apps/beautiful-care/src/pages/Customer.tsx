import {
  DatePicker,
  parseDate,
  Input,
  Select,
  TextArea,
} from '@beautiful-care/ui-component';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, string, TypeOf, z } from 'zod';
import { customerApi, CustomerRequest } from '../apis/customer.api';
import { useGetCustomer } from '../hooks/useGetCustomer';

const variantSchema = object({
  name: string()
    .nonempty('Họ tên không được để trống')
    .max(255, 'Họ tên tối đa 255 ký tự'),
  phone: string().regex(
    /^[0]{1}[0-9]{9}$/,
    'Số điện thoại gồm 10 chữ số và bắt đầu bằng số 0'
  ),
  email: string().max(50, 'Email tối đa 50 ký tự').nullable(),
  gender: z.enum(['male', 'female']).default('female'),
  note: string().max(500, 'Ghi chú tối đa 500 ký tự').nullable(),
  address: string().max(500, 'Địa chỉ tối đa 500 ký tự').nullable(),
  dateOfBirth: string()
    .max(20, 'Ngày sinh tối đa 20 ký tự')
    .transform((d) => new Date(parseDate(d)))
    .nullable()
    .default(null),
  career: string().max(50, 'Nghề nghiệp tối đa 50 ký tự').nullable(),
});

export type Customer2Request = TypeOf<typeof variantSchema>;

export default function Customer() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { customer } = useGetCustomer(params.id);

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid, isDirty },
  } = useForm<CustomerRequest>({
    resolver: zodResolver(variantSchema),
    mode: 'onChange',
    values: customer,
  });

  const onSubmit = async (data: CustomerRequest) => {
    if (params.id) {
      try {
        await customerApi.updateCustomer(params.id, data);
        toast('Cập nhật khách hàng thành công');
      } catch (error) {
        toast.error('Cập nhật khách hàng thất bại');
      }
    } else {
      try {
        const response = await customerApi.createCustomer(data);
        toast('Thêm khách hàng thành công');
        navigate(`/admin/customers/${response.$id}`);
      } catch (error) {
        toast.error('Thêm khách hàng thất bại');
      }
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
          <div className="bg-white border rounded shadow-sm p-4 lg:w-2/3 grid lg:grid-cols-2 gap-x-6">
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
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <DatePicker label="Ngày sinh" {...field} />
              )}
            />

            <Input
              title="Nghề nghiệp"
              placeholder="Nhập nghề nghiệp"
              {...register('career')}
              error={errors.career?.message}
            />
            <TextArea
              title="Địa chỉ"
              {...register('address')}
              placeholder="Nhập ghi địa chỉ"
              error={errors.address?.message}
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
    </>
  );
}
