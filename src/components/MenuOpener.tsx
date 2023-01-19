import { FC } from "react";
import { MenuOpenerProps } from "./interfaces";

const MenuOpener: FC<MenuOpenerProps> = ({ isOpenMenu, setIsOpenMenu }) => {
  return (
    <div
      className="relative top-0 flex flex-col items-end"
      onClick={() => {
        setIsOpenMenu(!isOpenMenu);
      }}
    >
      <div className="relative py-0 pr-[6px]">
        <nav>
          <button className="w-10 h-5 relative focus:outline-none">
            <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-6 bg-white transform transition duration-500 ease-in-out ${
                  isOpenMenu ? "rotate-45" : "-translate-y-1.5"
                }`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-6 bg-white transform transition duration-500 ease-in-out ${
                  isOpenMenu ? "opacity-0" : ""
                }`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-6 bg-white transform  transition duration-500 ease-in-out ${
                  isOpenMenu ? "-rotate-45" : "translate-y-1.5"
                }`}
              ></span>
            </div>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default MenuOpener;
