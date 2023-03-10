import { FC } from "react";
import { MenuSubItemProps, ISubOption } from "./interfaces";

const MenuSubItem: FC<MenuSubItemProps> = ({
  subTitle,
  subitems,
  setActiveSubTab,
  activeSubTab,
  subitem,
  subOptions,
}) => {
  const subSpan = `w-full block py-5 cursor-pointer hover:opacity-70 transition ease-in-out duration-300`;
  const aSubMenuClass = `cursor-pointer w-full block opacity-70 font-normal pb-2.5 px-4 hover:opacity-100 transition ease-in-out duration-300`;

  const liSubMenuClass = (subTitle: string, subitems: number) => {
    let num;
    if (subitems) {
      num = `${subitems * 16}px`;
    }

    return `flex flex-col font-light cursor-pointer w-full h-[${
      num && activeSubTab === subTitle ? num : ""
    }] ${
      activeSubTab === subTitle ? "block" : "hidden"
    } transition ease-in-out duration-300`;
  };

  return (
    <span key={subTitle}>
      <span
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setActiveSubTab(activeSubTab !== subTitle ? subTitle : "");
        }}
        className={subSpan}
      >
        {subTitle}
      </span>
      {subitem.subOption && (
        <li className={liSubMenuClass(subTitle, subitems)}>
          {subitem.subOption &&
            Array.isArray(subOptions) &&
            subOptions.map((subOption: ISubOption) => {
              return (
                <a href={subOption.path} key={subOption.subtitle} className={aSubMenuClass}>
                  {subOption.subtitle}
                </a>
              );
            })}
        </li>
      )}
    </span>
  );
};

export default MenuSubItem;
