import React, { FC, useState } from "react";
import NextBtn from "./Arrows/NextButton";
import PrevBtn from "./Arrows/PrevButton";
import { PaginationProps } from "@components/interfaces";

export const Pagination: FC<PaginationProps> = ({
  nPages,
  currentPage,
  setCurrentPage,
  filteredStories,
}) => {
  const pageNumberss = [...Array.from(Array(nPages + 1).keys())].slice(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const pageNumberLimit = 5;

  const onPrevClick = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }
    setCurrentPage((prev: number) => prev - 1);
  };

  const onNextClick = () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }
    setCurrentPage((prev: number) => prev + 1);
  };

  const handlePrevClick = () => {
    onPrevClick();
  };

  const handleNextClick = () => {
    onNextClick();
  };

  const pages = [];
  for (let i = 1; i <= pageNumberss.length; i++) {
    pages.push(i);
  }

  const pageNumbers = pages.map((page) => {
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <span
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-[24px] h-[24px] text-center cursor-pointer ${
            currentPage === page
              ? "font-bold bg-[#23315E] text-white"
              : "text-[#202124]"
          } ${
            MyRound10(filteredStories.length) >= page * 10
              ? ""
              : "pointer-events-none opacity-25"
          }`}
        >
          {page}
        </span>
      );
    } else return <span className="hidden"></span>;
  });

  let pageIncrementEllipses = null;
  if (pages.length > maxPageLimit) {
    pageIncrementEllipses = (
      <span
        onClick={() => handleNextClick()}
        className={`${
          filteredStories.length > currentPage * 10
            ? ""
            : "pointer-events-none opacity-25"
        }`}
      >
        &hellip;
      </span>
    );
  }

  let pageDecremenEllipses = null;
  if (minPageLimit >= 1) {
    pageDecremenEllipses = (
      <span
        onClick={() => handlePrevClick()}
        className={`${
          filteredStories.length > currentPage * 10
            ? ""
            : "pointer-events-none opacity-25"
        }`}
      >
        &hellip;
      </span>
    );
  }

  function MyRound10(val: number) {
    return Math.ceil(val / 10) * 10;
  }

  return (
    <div className="w-full flex mx-12">
      <ul className="flex h-[24px] gap-3 w-[275px] max-w-[1080px] mx-auto items-center justify-center mt-9 mb-2">
        <button
          onClick={() => handlePrevClick()}
          disabled={currentPage === pages[0]}
          className={`flex ${
            MyRound10(filteredStories.length) >= currentPage * 10
              ? ""
              : "pointer-events-none opacity-25"
          } ${currentPage === pages[0] ? "opacity-25" : ""}
          `}
        >
          <PrevBtn />
        </button>
        {pageDecremenEllipses}
        {pageNumbers}
        {pageIncrementEllipses}
        <button
          onClick={() => handleNextClick()}
          disabled={currentPage === pages[pages.length - 1]}
          className={`flex ${
            MyRound10(filteredStories.length) > currentPage * 10
              ? ""
              : "pointer-events-none opacity-25"
          } ${currentPage === pages[pages.length - 1] ? "opacity-25" : ""}`}
        >
          <NextBtn />
        </button>
      </ul>
    </div>
  );
};
