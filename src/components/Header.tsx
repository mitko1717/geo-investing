import { ChangeEvent, FormEvent, FC } from "react";
import Image from "next/image";
import logo from "../../public/assets/images/graphic.png";
import { HeaderProps } from "./interfaces";

const Header: FC<HeaderProps> = ({ setCurrentPage, setSearchInputValue }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let val = e.target.value;
    setCurrentPage(1);
    setSearchInputValue(val);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const image = `w-[380px] h-[130px] outline-0 ml-12 mr-10 mt-4`;
  const label = `mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300`;
  const divForSVG = `flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none`;
  const input = `block p-4 pl-10 w-full text-sm text-gray-900 rounded-lg border border-gray-300 bg-white border-[#DADDE1]`;

  return (
    <header className={"flex w-full h-fit items-end my-8"}>
      <div className={image}>
        <Image src={logo} alt="logo" />
      </div>

      <form className={"h-fit w-[660px]"} onSubmit={onSubmit}>
        <label htmlFor="default-search" className={label}>
          Search
        </label>
        <div className="relative">
          <div className={divForSVG}>
            <Icon />
          </div>
          <input
            type="search"
            id="default-search"
            onChange={handleChange}
            className={input}
            placeholder="Search..."
            required
          />
        </div>
      </form>
    </header>
  );
};

export default Header;

export const Icon = () => {
  return (
    <svg
      aria-hidden="true"
      className="w-5 h-5 text-gray-500 dark:text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};
