import { FC, useEffect, useState } from "react";
import Filters from "./Filters";
import TableCols from "./TableCols";
import { ContentProps } from "./interfaces";
import { IStory } from "@components/interfaces";

const Content: FC<ContentProps> = ({
  setNews,
  setIsOpenNews,
  setIsSettedNews,
  currentRecords,
  setTitle,
  setPrice,
  initialCurrentRecords,
  setCurrentRecords,
  setCategory,
  setSymbol,
  searchInputValue,
}) => {
  const newsDiv = `max-w-[1080px] w-[1080px]`;
  const container = `mx-12 mt-6 h-auto max-h-[650px] h-650px overflow-scroll scrollbar-hidden border-y-[#2A429A] border-y-solid border-y-[2px]`;
  const spanTime = `text-transparent-blackish w-[80px] min-w-[80px] inline-block text-center text-base`;
  const spanSymbol = `text-transparent-blackish w-[60px] min-w-[60px] inline-block text-center text-base mr-7`;
  const spanCategory = `text-transparent-blackish w-[120px] min-w-[120px] inline-block text-center text-base mr-4`;
  const spanNews = (pointer: boolean) => {
    return `scrollbar-hide text-transparent-blackish w-fit text-base h-auto overscroll-none overflow-hidden max-w-[1000px] ${
      pointer
        ? "cursor-pointer hover:opacity-70 transition-all ease-in-out duration-200"
        : ""
    }`;
  };

  const loading = true;
  const [priceRangeValues, setRangeValues] = useState([0, 100]);
  const [marketCapsRangeValues, setMarketCapsRangeValues] = useState([
    0, 500000000,
  ]);
  const [outstandingSharesRangeValues, setOutstandingSharesRangeValues] =
    useState([0, 500000000]);

  useEffect(() => {
    if (priceRangeValues[0] === 0 && priceRangeValues[1] === 100) {
      setCurrentRecords(initialCurrentRecords);
    }
  }, [priceRangeValues]);

  const divForNews = `w-full py-4 even:bg-gray-100 flex relative`;

  const setNewsText = (item: IStory) => {
    setIsSettedNews(true);
    setNews(item.Body);
    setIsOpenNews(true);
    setTitle(item.Title);
    setPrice(item.price);
    setCategory(item.Category);
    setSymbol(item.symbol);
  };

  return (
    <div className={container}>
      <Filters
        rtl={false}
        priceRangeValues={priceRangeValues}
        setRangeValues={setRangeValues}
        marketCapsRangeValues={marketCapsRangeValues}
        setMarketCapsRangeValues={setMarketCapsRangeValues}
        outstandingSharesRangeValues={outstandingSharesRangeValues}
        setOutstandingSharesRangeValues={setOutstandingSharesRangeValues}
      />
      <div className={newsDiv}>
        <TableCols
          divForNews={divForNews}
          spanTime={spanTime}
          spanSymbol={spanSymbol}
          spanCategory={spanCategory}
          spanNews={spanNews}
        />
        {loading && currentRecords.length === 0 && <Loader />}

        {currentRecords.length > 0 &&
          currentRecords
            .filter(
              (item) =>
                item.Title.toLowerCase().includes(
                  searchInputValue.toLowerCase()
                ) ||
                item.symbol
                  .toLowerCase()
                  .includes(searchInputValue.toLowerCase()) ||
                item.Body.toLowerCase().includes(searchInputValue.toLowerCase())
            )
            .filter(
              (item) =>
                +item.price >= priceRangeValues[0] &&
                +item.price <= priceRangeValues[1]
            )
            .filter(
              (item) =>
                +item.Market_Cap >= marketCapsRangeValues[0] &&
                +item.Market_Cap <= marketCapsRangeValues[1]
            )
            .filter(
              (item) =>
                +item.Outstanding_Shares >= outstandingSharesRangeValues[0] &&
                +item.Outstanding_Shares <= outstandingSharesRangeValues[1]
            )
            .map((item, index) => {
              let title = item.Title;
              let time = item.publicationTime
                .replace("p. m.", "")
                .replace("a. m.", "")
                .split(" ")
                .filter((f) => f)
                .splice(1, 1).toString()
                .split(":").splice(0, 2).join(":");

              return (
                <div
                  key={`${title}${index}${Math.random()}`}
                  className={divForNews}
                >
                  <span className={spanTime}>{time}</span>
                  <span className={spanSymbol}>{item.symbol}</span>
                  <span style={{ fontSize: "12px" }} className={spanCategory}>
                    {item.Category}
                  </span>
                  <span
                    onClick={() => {
                      setNewsText(item);
                    }}
                    className={spanNews(true)}
                  >
                    {title}
                  </span>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Content;

export const Loader = () => {
  return (
    <div
      className="w-full flex items-center"
      aria-label="Loading..."
      role="status"
    >
      <svg className="h-6 w-6 animate-spin m-auto my-8" viewBox="3 3 18 18">
        <path
          className="fill-gray-200"
          d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
        ></path>
        <path
          className="fill-gray-800"
          d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
        ></path>
      </svg>
    </div>
  );
};
