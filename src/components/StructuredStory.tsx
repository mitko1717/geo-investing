import { FC, useEffect, useState } from "react";
import {
  getCompanyName,
  getSplitted,
  replaceAllFunc,
} from "./parsingFunctions";
import { StructuredNewsProps } from "./interfaces";

const StructuredStory: FC<StructuredNewsProps> = ({ news, title }) => {
  const [newsPar, seNewsPar] = useState("");
  const [commentsPar, setCommentsPar] = useState("");
  const [detailsPar, setDetailsPar] = useState("");

  const h2 = `font-bold text-2xl p-4`;
  const h3 = `italic px-4 text-2xl`;
  const parStyle = `h-auto text-black px-4 pl-16`;

  const getText = (html: string) => {
    let divContainer = document.createElement("div");
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || "";
  };

  let text: string = "";

  useEffect(() => {
    // getting plain text from html
    text = getText(news);

    // comments
    let commentsIndex = text.indexOf(`"`);
    let mySubString = text.substring(
      text.indexOf(`"`),
      text.indexOf(`"`, commentsIndex + 500)
    );
    let strings: string = mySubString
      .split(".")
      .filter((s: string) => s.length > 30)
      .join(".");

    setCommentsPar(strings);

    // details par
    let companyName = getCompanyName(text);
    let aboutIndex = text.indexOf(`About ${companyName}`);

    let details = text.substring(
      text.toLowerCase().indexOf(`About ${companyName}`.toLowerCase()),
      text.indexOf(`.`, aboutIndex + 500)
    );

    setDetailsPar(details);

    // news par
    text = getSplitted(text);
    text = replaceAllFunc(text);

    seNewsPar(text.split(".")[0]);
  }, []);

  return (
    <div className="overflow-auto m-auto pb-8 h-fit max-h-[600px]">
      <h3 className={h3}>{title}</h3>
      <h2 className={h2}>News</h2>
      {newsPar && <p className={parStyle}>{newsPar}.</p>}
      {commentsPar.length > 0 && <h2 className={h2}>Comments</h2>}
      {commentsPar && <p className={parStyle}>{commentsPar}.</p>}
      <h2 className={h2}>Details</h2>
      {detailsPar && <p className={parStyle}>{detailsPar}</p>}
    </div>
  );
};

export default StructuredStory;
