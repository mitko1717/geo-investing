import { FC } from "react";
import Image from "next/image";
import logo from "../../public/assets/images/logo-mc.png";

const Logo: FC = () => {
  return (
    <div className="text-white h-[190px] w-full relative">
      <div className="w-[120px] h-[120px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Image src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default Logo;
