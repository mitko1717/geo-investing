import { Dispatch, SetStateAction } from "react";

export interface IStory {
  story_id: number;
  Category: string;
  Market_Cap: number;
  price: number;
  Outstanding_Shares: number;
  publicationTime: string;
  Exchange: string;
  symbol: string;
  Title: string;
  Body: string;
}

export type ContentProps = {
  setNews: Dispatch<SetStateAction<string>>;
  setIsOpenNews: Dispatch<SetStateAction<boolean>>;
  setIsSettedNews: Dispatch<SetStateAction<boolean>>;
  currentRecords: IStory[];
  setTitle: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<number | string>>;
  initialCurrentRecords: IStory[];
  setCurrentRecords: Dispatch<SetStateAction<IStory[]>>;
  setCategory: Dispatch<SetStateAction<string>>;
  setSymbol: Dispatch<SetStateAction<string>>;
  searchInputValue: string;
};

export type HeaderProps = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setSearchInputValue: Dispatch<SetStateAction<string>>;
};

export type FiltersProps = {
  rtl: boolean;
  priceRangeValues: number[];
  setRangeValues: Dispatch<SetStateAction<number[]>>;
  marketCapsRangeValues: number[];
  setMarketCapsRangeValues: Dispatch<SetStateAction<number[]>>;
  outstandingSharesRangeValues: number[];
  setOutstandingSharesRangeValues: Dispatch<SetStateAction<number[]>>;
};

export interface ISubOption {
  path: string;
  subtitle: string;
}

export interface IMenuOption {
  subOption?: boolean;
  subOptions?: ISubOption[] | boolean;
  previousTitle?: string;
  path?: string;
  title?: string;
}

export interface IMenu {
  path: string;
  title: string;
  icon: string;
  iconActive: string;
  options?: IMenuOption[];
  type?: string;
}

export type PaginationProps = {
  nPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  filteredStories: IStory[];
};

export type MenuItemProps = {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  activeSubTab: string;
  setActiveSubTab: Dispatch<SetStateAction<string>>;
  item: any;
  title: string;
  iconActive: string;
};

export type MenuSubItemProps = {
  subTitle: string;
  subitems: any;
  setActiveSubTab: Dispatch<SetStateAction<string>>;
  activeSubTab: string;
  subitem: any;
  subOptions: ISubOption[];
};

export type TableColsProps = {
  divForNews: string;
  spanTime: string;
  spanSymbol: string;
  spanCategory: string;
  spanNews: (pointer: boolean) => string;
};

export type TwoThumbsProps = {
  rtl: boolean;
  rangeValues: number[];
  setRangeValues: Dispatch<SetStateAction<number[]>>;
};

export type MenuOpenerProps = {
  isOpenMenu: boolean;
  setIsOpenMenu: Dispatch<SetStateAction<boolean>>;
};

export type NewsProps = {
  news: string;
  setIsOpenNews: Dispatch<SetStateAction<boolean>>;
  isSettedNews: boolean;
  title: string;
  price: string | number;
  category: string;
  symbol: string;
};

export type StructuredNewsProps = {
  news: string;
  title: string;
};

export type NewsBarProps = {
  price: string | number;
  category: string;
};

export type ChartProps = {
  symbol: string;
};