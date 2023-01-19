import { FC, useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import StockPriceFilter from "./StockPriceFilter";
import MarketCapsFilter from "./MarketCapFilter";
import OutstandingSharesFilter from "./OutstandingSharesFilter";
import { FiltersProps } from "./interfaces";

const FILTERS = [
  {
    title: "market cap",
    slug: "marketCap",
    height: 50,
  },
  {
    title: "current volume",
    slug: "currentVol",
    height: 50,
  },
  {
    title: "STOCK PRICE",
    slug: "price",
    height: 50,
  },
];

const Filters: FC<FiltersProps> = ({
  priceRangeValues,
  setRangeValues,
  marketCapsRangeValues,
  setMarketCapsRangeValues,
  outstandingSharesRangeValues,
  setOutstandingSharesRangeValues,
}) => {
  const [openSlugs, setOpenSlugs] = useState<string[]>([]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  useEffect(() => {
    setIsOpenFilter(openSlugs.length > 0 ? true : false);
  }, [openSlugs]);

  const handleToggle = (slug: string) => {
    if (!openSlugs.some((o) => o === slug)) {
      let newArr = [...openSlugs, slug];
      setOpenSlugs(newArr);
    } else if (openSlugs.some((o: string) => o === slug)) {
      const newArr = openSlugs.filter((i) => {
        return i !== slug;
      });

      setOpenSlugs(newArr);
    }
  };

  const filter = `relative bg-white p-2 px-6 overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transition-all ease-in-out duration-300`;

  return (
    <div className="flex w-full mt-4 h-auto justify-end">
      {FILTERS.map((item) => {
        return (
          <div key={item.title}>
            <div
              key={item.slug}
              onClick={() => handleToggle(item.slug)}
              className={`border border-solid border-black mx-2 p-2 min-w-[230px] w-[200px] flex items-center bg-[#F5F5F8] text-[#5F6368] px-3 py-2 text-base uppercase
                    hover:text-opacity-100 outline-none cursor-pointer transition-all ease-in-out duration-300 justify-center`}
            >
              <span>{item.title}</span>
            </div>

            <AnimateHeight
              height={!isOpenFilter ? "auto" : item.height}
              duration={150}
            >
              {openSlugs.some((i) => i === item.slug) &&
                item.slug === FILTERS[0].slug &&
                isOpenFilter && (
                  <div className={filter}>
                    <MarketCapsFilter
                      rtl={false}
                      rangeValues={marketCapsRangeValues}
                      setRangeValues={setMarketCapsRangeValues}
                    />
                  </div>
                )}
              {openSlugs.some((i) => i === item.slug) &&
                item.slug === FILTERS[1].slug &&
                isOpenFilter && (
                  <div className={filter}>
                    <OutstandingSharesFilter
                      rtl={false}
                      rangeValues={outstandingSharesRangeValues}
                      setRangeValues={setOutstandingSharesRangeValues}
                    />
                  </div>
                )}
              {openSlugs.some((i) => i === item.slug) &&
                item.slug === FILTERS[2].slug &&
                isOpenFilter && (
                  <div className={filter}>
                    <StockPriceFilter
                      rtl={false}
                      rangeValues={priceRangeValues}
                      setRangeValues={setRangeValues}
                    />
                  </div>
                )}
            </AnimateHeight>
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
