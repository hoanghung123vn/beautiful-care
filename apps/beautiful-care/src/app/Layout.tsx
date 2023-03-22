import { SpinnerIcon } from 'libs/ui-component/src/lib/Icons';
import { Navigate, Outlet } from 'react-router-dom';
import MainNav from '../components/MainNav';
import SideBar from '../components/SideBar';
import { useGetUser } from '../hooks';

export default function Layout() {
  const { user, isLoading, isError } = useGetUser();

  if (user) {
    return (
      <div className="min-h-screen bg-gray-100 text-black text-sm flex border shadow-sm">
        <SideBar className="hidden lg:block" />
        <MainNav className="w-full px-8 py-6">
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
