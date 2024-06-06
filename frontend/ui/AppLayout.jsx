import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';
import '../src/styling/index.css';

function AppLayout() {
  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default AppLayout
