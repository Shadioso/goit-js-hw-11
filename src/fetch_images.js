import axios from 'axios';

const KEY = `34859456-27066b05c1480cb7e2dfb47d0`;
const URL = `https://pixabay.com/api/`;
const fetchImages = async (image, page) => {
  try {
    const response = await axios.get(
      `${URL}?key=${KEY}&q=${image}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw new Error(responce.status);
  }
};

export { fetchImages };
