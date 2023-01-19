import { FC } from "react";
import { NewsBarProps } from "./interfaces";

const NEWSBAR = [
  {
    title: "BASIC AI",
    slug: "basicAI",
  },
  {
    title: "PRICE",
    slug: "price",
  },
  {
    title: "CATEGORY",
    slug: "category",
  },
];

const NewsBar: FC<NewsBarProps> = ({ price, category }) => {
  const newsBarDiv = `inline border border-solid border-black mr-4 p-2 bg-[#F5F5F8] text-[#5F6368] min-w-[200px] flex items-center`;

  return (
    <div className="flex h-[50px] w-full mb-4">
      {NEWSBAR.map((item) => {
        if (item.slug === "basicAI") {
          return (
            <div key={item.slug} className={newsBarDiv}>
              <div className="inline pr-2 italic">{item.title}</div>
              <span className="font-bold">NOT ACTIVE</span>
            </div>
          );
        } else if (item.slug === "price") {
          return (
            <div key={item.slug} className={newsBarDiv}>
              <div className="inline pr-2 italic">{item.title}</div>
              <span className="font-bold">
                {+price !== 0 ? price : "price not available"}
              </span>
            </div>
          );
        } else if (item.slug === "category") {
          return (
            <div key={item.slug} className={newsBarDiv}>
              <div className="inline pr-2 italic">{item.title}</div>
              <span className="font-bold">{category}</span>
            </div>
          );
        }
      })}
    </div>
  );
};

export default NewsBar;
