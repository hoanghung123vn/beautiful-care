import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { number, object, string, TypeOf } from 'zod';
import { comboApi, ComboRequest } from '../apis/combo.api';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import { useGetCombo } from '../hooks/useGetCombo';

const variantSchema = object({
  name: string()
    .nonempty('Tên combo không được để trống')
    .max(255, 'Tên combo tối đa 255 ký tự'),
  serviceId: number().or(string()).default('641fd350effc85b95cde'),
  quantity: number().or(string()),
  price: number().or(string()),
  description: string().max(500, 'Mô tả tối đa 500 ký tự'),
});

export type Combo2Request = TypeOf<typeof variantSchema>;

export default function Combo() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { combo } = useGetCombo(params.id);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid, isDirty },
  } = useForm<ComboRequest>({
    resolver: zodResolver(variantSchema),
    mode: 'onChange',
    values: combo,
  });

  const onSubmit = async (data: ComboRequest) => {
    if (params.id) {
      try {
        await comboApi.updateCombo(params.id, data);
        toast('Cập nhật combo thành công');
      } catch (error) {
        toast.error('Cập nhật combo thất bại');
      }
    } else {
      try {
        const response = await comboApi.createCombo(data);
        toast('Thêm combo thành công');
        navigate(`/admin/combos/${response.$id}`);
      } catch (error) {
        toast.error('Thêm combo thất bại');
      }
    }
  };

  return (
    <>
      <Link to={'/admin/combos'} className="">
        Khách hàng
      </Link>
      <h2 className="text-xl font-semibold py-4">Thêm mới combo</h2>
      <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
        <div className="grid lg:flex w-full gap-4">
          <div className="bg-white border rounded shadow-sm p-4 lg:w-2/3 grid lg:grid-cols-2 gap-x-6">
            <Input
              title="Tên combo"
              placeholder="Nhập tên combo"
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              type="number"
              title="Số lượng"
              placeholder="Nhập số lượng"
              {...register('quantity')}
              error={errors.quantity?.message}
            />
            <Input
              type="number"
              title="Giá combo"
              placeholder="Nhập giá combo"
              {...register('price')}
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
          <Link to="/admin/combos">
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
