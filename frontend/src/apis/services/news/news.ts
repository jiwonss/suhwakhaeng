import tokenInstance from "../../utils/tokenInstance";

export const getNews = async () => { 
    const response = await tokenInstance.get('crawling/news');
    return response.data;
  };