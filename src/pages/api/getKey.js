import axios from "axios";

const getLastStoryId = async () => {
  let storyId = "305770";

  try {
    const res = await axios.post(`http://70.32.24.132:2022/getStories`, {
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      body: { story_id: storyId },
    });

    const result = res.data.data;

    if (!result.length > 0) return null;

    let id = result[result.length - 1].story_id || storyId;
    id = id - 150;
    return id.toString();
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async function handler(req, res) {
  const id = await getLastStoryId();
  res.status(200).json({ id: `${id}` });
}
