import {
  formatNumber,
  NumberInput,
  Input,
  TextArea,
} from '@beautiful-care/ui-component';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { number, object, string } from 'zod';
import { orderApi, OrderRequest } from '../apis/order.api';
import { useCombineState } from '../hooks/useCombineState';
import { useDebounce } from '../hooks/useDebounce';
import { useGetOrder } from '../hooks/useGetOrder';
import { useGetServices } from '../hooks/useGetService';

const variantSchema = object({
  name: string()
    .nonempty('Tên order không được để trống')
    .max(255, 'Tên order tối đa 255 ký tự'),
  serviceId: string().nonempty('Bạn chưa chọn dịch vụ'),
  quantity: string()
    .transform((p) => p.toString().replace(/,/g, ''))
    .refine((n) => Number(n) > 0, 'Số lượng phải lớn hơn 0')
    .or(number().min(1, 'Số lượng không được nhỏ hơn 1')),
  price: string()
    .transform((p) => p.toString().replace(/,/g, ''))
    .refine((n) => Number(n) > 0, 'Giá phải lớn hơn 0')
    .or(number().min(1, 'Giá không được nhỏ hơn 1')),
  description: string().max(500, 'Mô tả tối đa 500 ký tự'),
});

interface OrderPageState {
  suggestService: boolean;
  searchService: string;
}

export default function Order() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { order } = useGetOrder(params.id);
  const [pageState, setPageState] = useCombineState<OrderPageState>({
    suggestService: false,
    searchService: '',
  });
  const { suggestService, searchService } = pageState;

  const debounceSearchService = useDebounce(searchService, 500);
  const { services } = useGetServices(1, 100, debounceSearchService);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting, errors, isValid, isDirty },
  } = useForm<OrderRequest>({
    resolver: zodResolver(variantSchema),
    mode: 'onChange',
    values: order,
  });

  const form = getValues();

  const selectedService = useMemo(
    () => services.find((service) => service.$id === form.serviceId),
    [form.serviceId, services]
  );

  const onSubmit = async (data: OrderRequest) => {
    if (params.id) {
      try {
        await orderApi.updateOrder(params.id, data);
        toast('Cập nhật order thành công');
      } catch (error) {
        toast.error('Cập nhật order thất bại');
      }
    } else {
      try {
        const response = await orderApi.createOrder(data);
        toast('Thêm order thành công');
        navigate(`/admin/orders/${response.$id}`);
      } catch (error) {
        toast.error('Thêm order thất bại');
      }
    }
  };

  return (
    <>
      <Link to={'/admin/orders'} className="">
        Khách hàng
      </Link>
      <h2 className="text-xl font-semibold py-4">Thêm mới order</h2>
      <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
        <div className="grid lg:flex w-full gap-4">
          <div className="bg-white border rounded shadow-sm p-4 lg:w-2/3">
            <div className="grid lg:grid-cols-2 gap-x-6">
              <Input
                title="Tên order"
                placeholder="Nhập tên order"
                {...register('name')}
                error={errors.name?.message}
              />
            </div>
            <div className="relative">
              <Input
                placeholder="Tìm kiếm dịch vụ"
                title="Dịch vụ"
                onFocus={() => setPageState({ suggestService: true })}
                onBlur={() => {
                  setTimeout(
                    () => setPageState({ suggestService: false }),
                    300
                  );
                }}
              />
              {suggestService && (
                <div className="bg-white absolute w-full mt-2 border rounded pb-4">
                  <ul>
                    {services.map((service) => (
                      <li
                        className="py-2 px-4 cursor-pointer hover:bg-blue-100 flex justify-between"
                        key={service.$id}
                        onClick={() => {
                          setValue('serviceId', service.$id);
                          setValue('price', service.price);
                          setValue('quantity', 1);
                        }}
                      >
                        <h2>{service.name}</h2>
                        <span>{formatNumber(service.price)} đ</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <Input {...register('serviceId')} hidden />
                {form.serviceId && (
                  <div className="flex justify-between py-2 items-center">
                    <h2 className="font-semibold text-lg">
                      {selectedService?.name}
                    </h2>
                    <div className="flex">
                      <NumberInput
                        title="Số lượng"
                        placeholder="Số lượng"
                        {...register('quantity')}
                        error={errors.quantity?.message}
                        value={form.quantity}
                        className="w-40 mr-2"
                      />
                      <NumberInput
                        type="number"
                        title="Giá"
                        placeholder="Giá"
                        {...register('price')}
                        value={form.price}
                        error={errors.price?.message}
                        className="w-40"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
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
          <Link to="/admin/orders">
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
