import type { NextPage, GetStaticProps } from "next";
import Stories from "../components/Stories";
import { IStory } from "@components/interfaces";

type IData = {
  data: IStory[];
};

const Home: NextPage<{ data: IData }> = (props) => {  
  let stories: IStory[] = props?.data?.data  
  
  return (
      <Stories storiesData={stories} />
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  try {
    let result = await fetch(`https://bot1.nmodes.com/bot/api/v1/managment-app?query=http://70.32.24.132:2022/getStories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });
    
    let data = await result.json();
    data.data = data.data.reverse()
    
    return {
      props: { data }
    };
  } catch {
    return {
      props: {}
    };
  }
};
