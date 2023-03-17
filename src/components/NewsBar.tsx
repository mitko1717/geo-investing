import { FC } from "react";
import { NewsBarProps, BasicAIProps } from "./interfaces";

// // Items in news bar ///////////////////////////////////////////////////////////////////////// //

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

// // Components //////////////////////////////////////////////////////////////////////////////// //

const BasicAI: FC<BasicAIProps> = ({basicAIClassification, item, classesNames}:BasicAIProps) => {
  return (
    <div key={item.slug} className={classesNames}>
      <div className="inline pr-2 italic">{item.title}</div>
      <span className="font-bold">{basicAIClassification}</span>
    </div>
  );
}

const NewsBar: FC<NewsBarProps> = ({ basicAIClassification, price, category }:NewsBarProps) => {
  const newsBarDiv = `inline border border-solid border-black mr-4 p-2 bg-[#F5F5F8] text-[#5F6368] min-w-[200px] flex items-center`;

  return (
    <div className="flex h-[50px] w-full mb-4">
      {NEWSBAR.map((item, idx) => {
        if (item.slug === "basicAI") {
          return (
            <BasicAI basicAIClassification={basicAIClassification} item={item} key={idx}
              classesNames={newsBarDiv} />
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
              {/* <span className="font-bold">{category}</span> */}
              <span className="font-bold">Earnings</span>
            </div>
          );
        }
      })}
    </div>
  );
};

export default NewsBar;
