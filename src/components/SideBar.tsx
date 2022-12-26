import { FC, useState } from "react";
import Logo from "@components/Logo";
import Menu from "@components/Menu";
import MenuOpener from "@components/MenuOpener";

const SideBar: FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(true);

  return (
    <div
      className={`bg-[#23315E] flex flex-col h-[100vh] min-h-[100vh] font-light ${
        isOpenMenu ? "w-[280px] min-w-[200px]" : "w-[50px] min-w-[50px]"
      } relative transition-all ease-in-out duration-300`}
    >
      <MenuOpener isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
      {isOpenMenu && <Logo />}
      {isOpenMenu && <Menu />}
    </div>
  );
};

export default SideBar;
