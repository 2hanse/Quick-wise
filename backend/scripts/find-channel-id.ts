import axios from "axios";
import dotenv from "dotenv";

interface ChannelSearchItem {
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
  };
}

dotenv.config();

async function findChannelId() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        part: "snippet",
        q: "세바시",
        type: "channel",
        maxResults: 5,
        key: apiKey,
      },
    }
  );

  console.log("검색된 채널들:\n");
  response.data.items.forEach((item: ChannelSearchItem) => {
    console.log(`📺 채널명: ${item.snippet.channelTitle}`);
    console.log(`🆔 채널 ID: ${item.snippet.channelId}`);
    console.log(`📝 설명: ${item.snippet.description}`);
    console.log("---\n");
  });
}

findChannelId();
