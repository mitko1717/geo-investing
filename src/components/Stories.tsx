import { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "@components/SideBar";
import Header from "@components/Header";
import Content from "@components/Content";
import News from "@components/News";
import { Pagination } from "@components/Pagination";
import { IStory } from "@components/interfaces";
import { obj } from "@lib/mockedStory";

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set("Content-Type", "application/json;charset=utf-8");
requestHeaders.set("Access-Control-Allow-Credentials", "true");
requestHeaders.set("Access-Control-Allow-Origin", "*");
requestHeaders.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
requestHeaders.set("referrerPolicy", "origin");

interface StoriesDataProps {
    storiesData: IStory[]
  }

let initdata: IStory[] = [];
let starsArr = new Array(50).fill(0).forEach(() => initdata.push(obj));

export default function Stories({ storiesData }: StoriesDataProps) {
  const [news, setNews] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string | number>("4.2");
  const [symbol, setSymbol] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [isOpenNews, setIsOpenNews] = useState<boolean>(false);
  const [isSettedNews, setIsSettedNews] = useState<boolean>(false);
  const [stories, setStories] = useState<IStory[]>([]);
  const [filteredStories, setFilteredStories] = useState<IStory[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage] = useState<number>(10);
  const [update, setUpdate] = useState<number>(0);
  const [currentRecords, setCurrentRecords] = useState<IStory[]>([]);
  const [initialCurrentRecords, setInitialCurrentRecords] = useState<IStory[]>(
    []
  );

  const getApiText = async () => {  
    try {
      let res = await axios.post(
        `https://bot1.nmodes.com/bot/api/v1/managment-app?query=http://70.32.24.132:2022/getStories`,
        { headers: requestHeaders }
      );
      if (res?.data?.data && Array.isArray(res?.data.data)) return res?.data.data.reverse();
    } catch (error) {
      return initdata
    }
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
    let data: IStory[]
    // let data: IStory[] = await getApiText()
    
    if (Array.isArray(storiesData) && storiesData.length > 0) {
        data = storiesData
    } else data = (await getApiText()) || [];
    
    if (Array.isArray(data) && data.length > 0) {      
      data = data.map((item: IStory) => {
        if (+item.price === -999) {          
          item = { ...item, price: 0 };
        } 
        if (+item["Market_Cap"] === -999) {
          item = { ...item, Market_Cap: 0 };
        } 
        if (+item["Outstanding_Shares"] === -999) {
          item = { ...item, Outstanding_Shares: 0 };
        }
        return item;
      });

      setStories(data);
      setFilteredStories(data);
    } else {
      setStories([]);
      setFilteredStories([]);
    }
  };

  useEffect(() => {
    getData();
  }, [update]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUpdate((prev: number) => prev + 1);
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