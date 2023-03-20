import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../apis/api';

interface LoginRequest {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const navigate = useNavigate();

  const onLogin = async ({ email, password }: LoginRequest) => {
    await api.createSession(email, password);
    navigate('/admin/customers');
  };

  return (
    <div className="h-screen flex justify-center items-center text-sm">
      <form className="grid gap-y-2" onSubmit={handleSubmit(onLogin)}>
        <div className="form-control">
          <label className="input-group">
            <span>Email</span>
            <input
              type="email"
              placeholder="user@gmail.com"
              className="input input-bordered text-sm w-full"
              {...register('email', { required: true })}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group">
            <span className="whitespace-nowrap">Mật khẩu</span>
            <input
              type="password"
              className="input input-bordered w-full text-sm"
              {...register('password', { required: true })}
              required
            />
          </label>
        </div>
        <button className="btn" type="submit">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
