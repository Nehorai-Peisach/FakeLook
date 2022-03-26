const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const DB_PORT = process.env.DB_PORT;

module.exports = async function mapFiltersService(filters) {
  const result = await axios.get(
    DOMAIN_NAME + DB_PORT + '/api/postsRoutes/get-posts'
  );

  let filtered = result.data.filter((p) => p.user_id !== filters.user_id);

  if (filters.dateFrom && filters.dateTo) {
    const dateFrom = new Date(filters.dateFrom).getTime();
    const dateTo = new Date(filters.dateTo).getTime();
    filtered = filtered.filter((p) => {
      let time = new Date(p.date).getTime();
      return dateFrom <= time && time <= dateTo;
    });
  }

  if (filters.radius > 0) {
    console.log(filters.radius);
    filtered = filtered.filter((p) => {
      return (
        filters.radius >
        Math.sqrt(
          Math.pow(filters.position.latitude - p.location.lat, 2) +
            Math.pow(filters.position.longitude - p.location.lng, 2)
        ) *
          100000
      );
    });
  }

  if (filters.tags !== '' || filtered.tags !== undefined) {
    const newArray = [];
    const tags = filters.tags.split(', ');
    filtered.forEach((p) => {
      tags.forEach((tag) => {
        if (p.tags.includes(tag)) newArray.push(p);
      });
    });
    filtered = newArray;
  }

  if (filtered.length > 100) {
    filtered.splice(99, filtered.length - 1);
  }

  return filtered;
};
