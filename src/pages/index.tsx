import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "@components/SideBar";
import Header from "@components/Header";
import Content from "@components/Content";
import News from "@components/News";
import { Pagination } from "@components/Pagination";

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set("Content-Type", "application/json;charset=utf-8");
requestHeaders.set("Access-Control-Allow-Credentials", "true");
requestHeaders.set("Access-Control-Allow-Origin", "*");
requestHeaders.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
requestHeaders.set("referrerPolicy", "origin");

const Home: NextPage = () => {
  const [news, setNews] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [marketCap, setMarketCap] = useState<string>("");
  const [outstandingShares, setOutstandingShares] = useState<string>("");
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [isOpenNews, setIsOpenNews] = useState<boolean>(false);
  const [isSettedNews, setIsSettedNews] = useState<boolean>(false);
  const [stories, setStories] = useState<any>([]);
  const [filteredStories, setFilteredStories] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage] = useState<number>(10);
  const [update, setUpdate] = useState(0);
  const [currentRecords, setCurrentRecords] = useState<any>([]);
  const [initialCurrentRecords, setInitialCurrentRecords] = useState<any>([]);

  const getApiText = async () => {
    const res = await axios.post(
      `https://bot1.nmodes.com/bot/api/v1/managment-app?query=http://70.32.24.132:2022/getStories`,
      { headers: requestHeaders }
    );

    let data = res.data.data.reverse();
    return data;
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  useEffect(() => {
    setCurrentRecords(
      filteredStories.slice(indexOfFirstRecord, indexOfLastRecord)
    );
    setInitialCurrentRecords(
      filteredStories.slice(indexOfFirstRecord, indexOfLastRecord)
    );
  }, [currentPage, filteredStories]);

  const nPages: number = Math.ceil(stories.length / recordsPerPage);

  const getData = async () => {
    let data = await getApiText();

    if (data && data.length > 0) {
      data = data.map((item: any) => {
        if (+item.price === -999) {
          return { ...item, price: 0 };
        } else if (+item["Market_Cap"] === -999) {
          return { ...item, Market_Cap: 0 };
        } else if (+item["Outstanding_Shares"] === -999) {
          return { ...item, Outstanding_Shares: 0 };
        } else return item;
      });

      setStories(data);
      setFilteredStories(data);
    }
  };

  useEffect(() => {
    getData();
  }, [update]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUpdate((prev) => prev + 1);
    }, 20000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="mx-auto flex">
      <SideBar />
      <div>
        <Header
          setCurrentPage={setCurrentPage}
          setSearchInputValue={setSearchInputValue}
        />
        {!isOpenNews && (
          <Content
            setNews={setNews}
            setIsOpenNews={setIsOpenNews}
            setIsSettedNews={setIsSettedNews}
            stories={stories}
            currentRecords={currentRecords}
            setTitle={setTitle}
            setPrice={setPrice}
            setCategory={setCategory}
            setSymbol={setSymbol}
            initialCurrentRecords={initialCurrentRecords}
            setCurrentRecords={setCurrentRecords}
            searchInputValue={searchInputValue}
          />
        )}
        {isOpenNews && (
          <News
            news={news}
            setIsOpenNews={setIsOpenNews}
            isSettedNews={isSettedNews}
            title={title}
            price={price}
            category={category}
            symbol={symbol}
            marketCap={marketCap}
            outstandingShares={outstandingShares}
          />
        )}
        {!isOpenNews && stories.length > 0 && (
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            filteredStories={filteredStories}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
