import { FC, useState } from "react";
import { MENU } from "../lib/MENU";
import { IMenu } from "./interfaces";
import MenuItem from "./MenuItem";

const Menu: FC = () => {
  const [activeTab, setActiveTab] = useState("PR Feed");
  const [activeSubTab, setActiveSubTab] = useState("");

  return (
    <div className="text-white">
      <ul>
        {MENU.map((item: IMenu) => {
          let title = item.title;
          let iconActive = item.iconActive;

          return (
            <MenuItem
              key={title}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              activeSubTab={activeSubTab}
              setActiveSubTab={setActiveSubTab}
              item={item}
              title={title}
              iconActive={iconActive}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
