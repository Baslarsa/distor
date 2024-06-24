import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuItem } from "../types";

const Menu = ({ menuItems }: { menuItems: MenuItem[] }) => {
  const currentRoute = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <div className="py-6 px-4">
      <ul className="flex flex-col w-full">
        {menuItems.map((item) => {
          const isActive = item.path === currentRoute;
          const onLinkClick = () => {
            if (isActive) {
              return;
            }
            navigate(item.path);
          };
          return (
            <li
              onClick={onLinkClick}
              key={item.name}
              className={`hover:bg-purple-900 ${
                isActive
                  ? "bg-purple-900 border-l-white"
                  : "bg-transparent border-l-transparent"
              } px-4 py-4 cursor-pointer bg-transparent transition-all  border-l-2`}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
