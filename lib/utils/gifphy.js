import axios from 'axios';

const getGif = async () => {
  const URL = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY}&q=frog&limit=10&offset=0&rating=pg&lang=en`;
  const { data } = await axios.get(URL);
  const randomResult =
    data.data[Math.floor(Math.random() * 10)].images.downsized.url;

  return randomResult;
};

export default getGif;
