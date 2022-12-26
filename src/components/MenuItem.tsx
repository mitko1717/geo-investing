import { Dispatch, FC, SetStateAction } from "react";
import MenuSubItem from "./MenuSubItem";

type MenuItemProps = {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<any>>;
  activeSubTab: string;
  setActiveSubTab: Dispatch<SetStateAction<any>>;
  item: any;
  title: string;
  iconActive: any;
};

const MenuItem: FC<MenuItemProps> = ({
  activeTab,
  setActiveTab,
  activeSubTab,
  setActiveSubTab,
  item,
  title,
  iconActive,
}) => {
  const liSpanClass = `text-lg leading-6 font-bold px-2`;
  const liImgClass = `w-[18px] h-[18px] inline`;
  const leftBorder = `absolute w-[10px] left-0 top-0 border-l-[10px] border-l-[#8FD7F3] border-solid h-full transition ease-in-out duration-300`;
  const spanWithImgNTitle = `hover:opacity-70 transition ease-in-out duration-300`;

  const liClass = (title: string) => {
    return `h-[60px] flex items-center px-9 pr-0 box-border relative cursor-pointer pointer-events-none ${
      activeTab === title ? "text-[#8FD7F3]" : ""
    }`;
  };
  const liClassDropdown = (title: string) => {
    return `h-auto min-h-[60px] flex items-center flex-col px-9 justify-center pr-0 box-border relative cursor-pointer pointer-events-none ${
      activeTab === title ? "text-[#8FD7F3] pt-4" : ""
    }`;
  };

  const ulSubMenuClass = (title: string) => {
    return `w-full text-base leading-5 font-medium py-5 px-7 text-white cursor-pointer ${
      activeTab === title ? "block" : "hidden"
    }`;
  };

  return (
    <li
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setActiveTab(title);
      }}
      className={
        item.type !== "dropdown" ? liClass(title) : liClassDropdown(title)
      }
      key={title}
    >
      {item.type && item.type === "dropdown" ? (
        <div className="w-full">
          {activeTab === title ? <div className={leftBorder} /> : ""}
          <span className={spanWithImgNTitle}>
            {activeTab !== title ? (
              <img className={liImgClass} src={item.icon} alt={title} />
            ) : (
              <img className={liImgClass} src={iconActive} alt={title} />
            )}
            <span className={liSpanClass}>{title}</span>
          </span>
        </div>
      ) : (
        <>
          {activeTab === title ? <div className={leftBorder} /> : ""}
          <span className={spanWithImgNTitle}>
            {activeTab !== title ? (
              <img className={liImgClass} src={item.icon} alt={title} />
            ) : (
              <img className={liImgClass} src={iconActive} alt={title} />
            )}
            <span className={liSpanClass}>{title}</span>
          </span>
        </>
      )}
      {item.type && item.type === "dropdown" && (
        <ul className={ulSubMenuClass(title)}>
          {item.options.map(
            (subitem: { title: any; subOptions: any; subOption: any }) => {
              let subTitle = subitem.title;
              let subOptions = subitem.subOptions ? subitem.subOptions : "";
              let subitems = Array.isArray(subOptions) && subOptions.length;

              return (
                <MenuSubItem
                  key={subTitle}
                  subTitle={subTitle}
                  subitems={subitems}
                  setActiveSubTab={setActiveSubTab}
                  activeSubTab={activeSubTab}
                  subitem={subitem}
                  subOptions={subOptions}
                />
              );
            }
          )}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
