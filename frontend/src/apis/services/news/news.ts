import tokenInstance from "../../utils/tokenInstance";

export const getNews = async () => { 
    console.log('하이 !!')
    const response = await tokenInstance.get('crawling/news');
    // console.log(response.data)
    return response.data;
  };