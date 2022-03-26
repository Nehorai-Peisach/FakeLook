import axios from 'axios';

export default async function mapFiltersService(filters) {
  console.log(filters);
  try {
    const result = await axios.post(
      'http://localhost:4000/api/posts/map-filters',
      filters
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
}
