import { Link, useNavigate, useNavigation } from "react-router-dom";
import DistorLogo from "./icons/DistorLogo";
import Menu from "./Menu";
import { defaultMenu } from "../routes/menu";
import DefaultButton from "./ui-components/DefaultButton";
import { HiOutlineUpload } from "react-icons/hi";

const Sidebar = () => {
  const navigate = useNavigate();
  const navigateToCreatePage = () => {
    navigate("/create-release");
  };
  return (
    <div className="w-3/12 p-2 h-screen bg-black text-white flex flex-col justify-between">
      <div className="w-full px-2 py-12">
        <DistorLogo className="w-full h-16 fill-white" />
      </div>
      <div>
        <Menu menuItems={defaultMenu} />
      </div>
      <div className="px-2 py-4 w-full">
        <DefaultButton className="w-full" onClick={navigateToCreatePage}>
          <div className="flex items-center gap-2 justify-center">
            <p>New release</p>
            <HiOutlineUpload />
          </div>
        </DefaultButton>
      </div>
    </div>
  );
};

export default Sidebar;
