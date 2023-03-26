import { Input, NumberInput, TextArea } from '@beautiful-care/ui-component';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { number, object, string, TypeOf } from 'zod';
import { serviceApi, ServiceRequest } from '../apis/service.api';
import { useGetService } from '../hooks/useGetService';

const variantSchema = object({
  name: string()
    .nonempty('Tên dịch vụ không được để trống')
    .max(255, 'Tên dịch vụ tối đa 255 ký tự'),
  price: string()
    .transform((p) => p.toString().replace(/,/g, ''))
    .refine((n) => Number(n) > 0, 'Giá phải lớn hơn 0')
    .or(number().min(1, 'Gía phải lớn hơn 0')),
  description: string().max(500, 'Mô tả tối đa 500 ký tự'),
});

export type Service2Request = TypeOf<typeof variantSchema>;

export default function Service() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { service } = useGetService(params.id);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors, isValid, isDirty },
  } = useForm<ServiceRequest>({
    resolver: zodResolver(variantSchema),
    mode: 'onChange',
    values: service,
  });

  const form = getValues();

  const onSubmit = async (data: ServiceRequest) => {
    if (params.id) {
      try {
        await serviceApi.updateService(params.id, data);
        toast('Cập nhật dịch vụ thành công');
      } catch (error) {
        toast.error('Cập nhật dịch vụ thất bại');
      }
    } else {
      try {
        const response = await serviceApi.createService(data);
        toast('Thêm dịch vụ thành công');
        navigate(`/admin/services/${response.$id}`);
      } catch (error) {
        toast.error('Thêm dịch vụ thất bại');
      }
    }
  };

  return (
    <>
      <Link to={'/admin/services'} className="">
        Khách hàng
      </Link>
      <h2 className="text-xl font-semibold py-4">Thêm mới dịch vụ</h2>
      <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
        <div className="grid lg:flex w-full gap-4">
          <div className="bg-white border rounded shadow-sm p-4 lg:w-2/3 grid lg:grid-cols-2 gap-x-6">
            <Input
              title="Tên dịch vụ"
              placeholder="Nhập tên dịch vụ"
              {...register('name')}
              error={errors.name?.message}
            />
            <NumberInput
              type="number"
              title="Giá dịch vụ"
              placeholder="Nhập giá dịch vụ"
              {...register('price')}
              value={service?.price}
              error={errors.price?.message}
            />
          </div>
          <div className="bg-white border rounded shadow-sm p-4 lg:w-1/3">
            <TextArea
              title="Mô tả"
              placeholder="Nhập mô tả"
              {...register('description')}
              error={errors.description?.message}
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Link to="/admin/services">
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
