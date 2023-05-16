import { Outlet } from "react-router-dom";

import Categories from "../../components/category-items/category-items.component";

const Home = () => {
  return (
    <div>
      <Outlet />
      <Categories />
    </div>
  );
};

export default Home;
