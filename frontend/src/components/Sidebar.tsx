import { Link } from "react-router-dom";
import DistorLogo from "./icons/DistorLogo";
import Menu from "./Menu";
import { defaultMenu } from "../routes/menu";

const Sidebar = () => {
  return (
    <div className="w-3/12 p-2 h-screen bg-black text-white">
      <div className="w-full px-2 py-12">
        <DistorLogo className="w-full h-16 fill-white" />
      </div>
      <div>
        <Menu menuItems={defaultMenu} />
      </div>
    </div>
  );
};

export default Sidebar;
