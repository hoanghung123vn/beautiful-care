import { SpinnerIcon } from '@beautiful-care/ui-component';
import { Navigate, Outlet } from 'react-router-dom';
import MainNav from '../components/MainNav';
import SideBar from '../components/SideBar';
import { useGetUser } from '../hooks';

export default function Layout() {
  const { user, isLoading, isError } = useGetUser();

  if (user) {
    return (
      <div className="min-h-screen w-full bg-gray-100 text-black text-sm flex">
        <SideBar className="hidden lg:block" />
        <MainNav className="w-full px-8 py-6 h-full lg:pl-60">
          <Outlet />
        </MainNav>
      </div>
    );
  }
  if (isError) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SpinnerIcon className="animate-spin" />
    </div>
  );
}
