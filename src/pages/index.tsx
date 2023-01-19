import type { GetServerSideProps, NextPage } from "next";
import Stories from "../components/Stories";
import { IStory } from "@components/interfaces";

type IData = {
  stories: IStory[];
};

const Home: NextPage<{ data: IData }> = (props) => {
  let stories: IStory[] = props?.data?.stories

  return (
    <>
      <Stories storiesData={stories} />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const result = await fetch(`https://geo-invest.vercel.app/api/getStories`);
    const data = await result.json();

    return {
      props: { data }
    };
  } catch {
    return {
      props: {}
    };
  }
};