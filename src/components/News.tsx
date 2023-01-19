import { FC, useState } from "react";
import PrevBtn from "./Arrows/PrevButton";
import Chart from "./Chart";
import StructuredStory from "./StructuredStory";
import NewsBar from "./NewsBar";
import { NewsProps } from "./interfaces";

const TABS = [
  { title: "MAIN VIEW" },
  { title: "STRUCTURED VIEW" },
  { title: "CHART" },
];

const News: FC<NewsProps> = ({
  news,
  setIsOpenNews,
  isSettedNews,
  title,
  price,
  category,
  symbol,
}) => {
  const [activeTab, setActiveTab] = useState(TABS[0].title);

  const container = `w-[1080px] h-auto flex flex-col mx-12 relative mb-2`;
  const tabs = `flex h-[56px]`;
  const text = `w-full p-8 pt-4 pl-0 overflow-auto m-auto h-fit max-h-[600px]`;
  const footer = `w-full flex items-center h-[60px] bg-[#F5F5F8] min-h-[60px]`;
  const tab = (title: string) => {
    return `${
      activeTab === title
        ? "bg-[#23315E] text-[#FFFFFF]"
        : "bg-[#F5F5F8] text-[#5F6368]"
    } px-4 flex items-center mr-2 rounded-t cursor-pointer hover:bg-[#23315E] hover:text-[#FFFFFF] transition ease-in-out duration-200`;
  };
  const close = `absolute font-bold top-[20px] right-0 text-1xl flex h-[24px] w-[70px] cursor-pointer hover:opacity-70 transition-all ease-in-out duration-200 justify-between`;
  const lineDiv = `w-[1080px] h-[2px] bg-[#2A429A]`;
  const lineDivBottom = `w-[1080px] h-[1px] bg-[#2A429A]`;

  return (
    <div className={container}>
      <div className={tabs}>
        {TABS.map((item) => {
          let title = item.title;

          return (
            <div
              key={title}
              onClick={() => setActiveTab(title)}
              className={tab(title)}
            >
              {title}
            </div>
          );
        })}
      </div>
      <div className={lineDiv} />

      {isSettedNews && activeTab === TABS[0].title && (
        <div className={text}>
          <NewsBar price={price} category={category} />
          <div
            className="pl-8"
            dangerouslySetInnerHTML={{ __html: news }}
          ></div>
        </div>
      )}
      {isSettedNews && activeTab === TABS[1].title && (
        <div className={text}>
          <NewsBar price={price} category={category} />
          <StructuredStory news={news} title={title} />
        </div>
      )}
      {isSettedNews && activeTab === TABS[2].title && <Chart symbol={symbol} />}
      {!isSettedNews && <div className={text}>IT'S EMPTY</div>}

      <div className={lineDivBottom} />
      <div className={close} onClick={() => setIsOpenNews(false)}>
        <PrevBtn /> <span>Back</span>
      </div>
    </div>
  );
};

export default News;
