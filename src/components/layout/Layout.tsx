
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import Header from './Header';

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-oslo-gray">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto bg-oslo-gray">
            <div className="container mx-auto px-6 py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
