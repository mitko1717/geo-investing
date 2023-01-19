import axios from "axios";

const HEADERS = {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  };

const getStories = async () => {
  try {
    const res = await axios.post(
        `https://bot1.nmodes.com/bot/api/v1/managment-app?query=http://70.32.24.132:2022/getStories`,
        { headers: HEADERS }
      );
        
      return res.data.data.reverse();
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async function handler(req, res) {
  const stories = await getStories();
  res.status(200).json({ stories });
}