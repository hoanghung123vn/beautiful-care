import { useForm } from 'react-hook-form';
import { CustomerRequest } from '../apis/customer.api';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div></div>
      <div></div>
    </form>
  );
}
