import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import axios from 'axios';
import PrevBtn from "./Arrows/PrevButton";
import Chart from "./Chart";
import StructuredStory from "./StructuredStory";
import NewsBar from "./NewsBar";
import { NewsProps } from "./interfaces";

// // Constants ///////////////////////////////////////////////////////////////////////////////// //

const TABS = [
  { title: "MAIN VIEW" },
  { title: "STRUCTURED VIEW" },
  { title: "CHART" },
];

const BASIC_AI_CLASS = {
  loading: "Loading...",
  fail: "Active"
}

// TODO: get PARSING_PROJECT_URL from .env
const PARSING_PROJECT_URL = "https://nmodes.site/parsing/getToroResponseParsing/";
// const PARSING_PROJECT_URL = "http://localhost:2023/getToroResponseParsing";

const HTTP_REQUEST_METHOD = "POST";

// // Props typing ////////////////////////////////////////////////////////////////////////////// //

type ContentProps = {
  news: string;
  setIsOpenNews: Dispatch<SetStateAction<boolean>>;
  isSettedNews: boolean;
  title: string;
  price: string | number;
  category: string;
  symbol: string;
  marketCap: string;
  outstandingShares: string;
};

// // General Functions ///////////////////////////////////////////////////////////////////////// //

const replaceUrlsByTag = (text: string): string => {

  const res = [/(?:https?|ftp):\/\/[a-zA-Z0-9_\/\.\--]+/gm,
                /(?:www)[a-zA-Z0-9_\/\.\--]+/gm];
  let new_t = text;
  for (const re of res) {
    let matches = new_t.match(re);
    if (!matches) {continue;}
    // console.log(`Got ${matches.length} matches: ${matches}`)
    for (let match of matches) {
      // console.log(`Found: '${match}'.`)
      const lastChar = match[match.length-1];
      if (lastChar === ".") {
        match = match.substring(0, match.length-1);
      }
      new_t = new_t.replace(match, "URL");
    }
  }
  return (new_t);
}


const ignoreAfterAboutTag = (text: string): string => {
  // regex for removing anything after 'about'
  const all_about_regexs = [/<strong *?>(A|a)bout.*?<\/strong>.*/gm,
                            /<h(1|2|3|4) *?>(A|a)bout.*?<\/h(1|2|3|4)>.*/gm,
                            /<b *?>(A|a)bout.*?<\/b>.*/gm,
                            /<p *?>(A|a)bout *?<org>.*?<\/org>.*?(<\/p>|<br *\/*>)/gm];
  
  // tries to find 'about'
  for (const regex of all_about_regexs) {
    const regex_match = regex.exec(text);
    if (regex_match) {
      return (text.substring(0, regex_match.index));
    }
  }
  return (text);
}


const cleanTextForParsing = (newsContent: string): string => {

  // replace HTML special tag by regular <, >, characters
  let newsContentClean = newsContent.replace('\u003c', '<').replace('\u003e', '>');
  newsContentClean = replaceUrlsByTag(newsContentClean);

  // remove everything after 'about' html tag
  newsContentClean = ignoreAfterAboutTag(newsContentClean);

  // other removals
  const rawContentString = newsContentClean
                                      .replace(/<[^>]*>?/gm, ' ')      /* remove HTML tags */
                                      .replace(/(\r\n|\n|\r)/gm, ' ')  /* remove line breaks */
                                      .replace(/(\/|\\)/g, ' ')        /* remove "/" & "\" chars */
                                      .replace(/  +/g, ' ').trim();    /* remove multiple spaces */
  return (rawContentString);
}

const getUrlForParsingProject = (newsContent: string):string => {
  const rawContentString = cleanTextForParsing(newsContent);
  const urlContentString = encodeURIComponent(rawContentString);
  return (`${PARSING_PROJECT_URL}${urlContentString}`);
}

// // Main component //////////////////////////////////////////////////////////////////////////// //

const News: FC<NewsProps> = ({
  news,
  setIsOpenNews,
  isSettedNews,
  title,
  price,
  category,
  symbol,
}:NewsProps) => {
  // --- HOOKS ---------------------------------------------------------------------------------- //
  const [activeTab, setActiveTab] = useState(TABS[0].title);
  const [basicAIClass, setBasicAIClass] = useState(BASIC_AI_CLASS.loading);


  const getRawResponse = (res: any): any => {
    return (res && res.data && res.data.data && res.data.data.status &&
            res.data.data.status[0] && res.data.data.status[0].RESPONSE);
  }

  // auxiliar function for the useEffect(...)[] hook
  const updateBasicAILabel = (res: any, definitive: boolean) => {
    const rawResponse = getRawResponse(res);
    if (!(rawResponse)) {
      console.log(`failed.`);
      if (definitive) {
        setBasicAIClass(BASIC_AI_CLASS.fail);
      }
    } else {
      const oneStatus = rawResponse.replace("Status:", "").trim();
      console.log(`FROM: "${rawResponse}" TO "${oneStatus}"`);
      setBasicAIClass(oneStatus);
    }
    return;
  }

  // 
  const judgeResponseForTitle = (res: any) => {
    const rawResponse = getRawResponse(res);
    if (rawResponse) {
      console.log('GOT FROM TITLE');
      updateBasicAILabel(res, false);
      return;
    }
    console.log('FAIL FROM TITLE, GOING FOR TEXT');
    axios
      .post(PARSING_PROJECT_URL, {text: cleanTextForParsing(news) })
      .then((res) => { updateBasicAILabel(res, true) } )
      .catch(() => { updateBasicAILabel(null, true); });
  }

  // on page load:
  useEffect(() => {
    // contact parsing-project to get BasicAI label
    if (HTTP_REQUEST_METHOD === "POST") {
      // 
      axios
        .post(PARSING_PROJECT_URL, {text: cleanTextForParsing(title) })
        .then(judgeResponseForTitle)
        .catch(() => { updateBasicAILabel(null, true); });

    } else {
      axios
        .get(getUrlForParsingProject(news))
        .then((res) => {updateBasicAILabel(res, true)})
        .catch(() => { updateBasicAILabel(null, true); });
    }
    
  }, []);

  // --- FUNCTIONS AND CONSTANTS ---------------------------------------------------------------- //

  const container = `w-[1080px] h-auto flex flex-col mx-12 relative mb-2`;
  const tabs = `flex h-[56px]`;
  const text = `w-full p-8 pt-4 pl-0 overflow-auto m-auto h-fit max-h-[600px]`;
  // const footer = `w-full flex items-center h-[60px] bg-[#F5F5F8] min-h-[60px]`;
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

  // --- MAIN COMPONENT ------------------------------------------------------------------------- //

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
          <NewsBar basicAIClassification={basicAIClass} price={price} category={category} />
          <div
            className="pl-8"
            dangerouslySetInnerHTML={{ __html: news }}
          ></div>
        </div>
      )}
      {isSettedNews && activeTab === TABS[1].title && (
        <div className={text}>
          <NewsBar basicAIClassification={basicAIClass} price={price} category={category} />
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
