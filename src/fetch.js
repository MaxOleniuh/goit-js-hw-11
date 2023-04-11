import axios from 'axios';
export default function fetchImages(q) {
  const URL = 'https://pixabay.com/api/';
  const API_KEY = '35259660-b4522dcf8b654a7c371bdf25f';
  const FIELDS = `?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;
  return axios.get(`${URL}${FIELDS}`);
}
