import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '30104911-8e1ad95cd3a35152ba7eccb47';

export const fetchImages = async (query, page) => {
    const { data: { hits } } =
        await axios.get(`?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    return hits;
}