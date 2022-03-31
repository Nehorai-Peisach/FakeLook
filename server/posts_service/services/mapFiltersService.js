const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const DB_PORT = process.env.DB_PORT;

module.exports = async function mapFiltersService(filters) {
  console.log(filters);
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
    let r = 6371;
    let lat = filters.position.latitude;
    let lng = filters.position.longitude;
    lat = (lat * Math.PI) / 180;
    lng = (lng * Math.PI) / 180;
    filtered = filtered.filter((p) => {
      let plat = (p.location.lat * Math.PI) / 180;
      let plng = (p.location.lng * Math.PI) / 180;
      let dlat = lat - plat;
      let dlng = lng - plng;
      let a =
        Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(lat) * Math.cos(plat) * Math.pow(Math.sin(dlng / 2), 2);

      let c = 2 * Math.asin(Math.sqrt(a));
      return filters.radius >= c * r;
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

  filtered.sort((a, b) => b.users_like.length - a.users_like.length);

  if (filtered.length > 100) {
    filtered.splice(99, filtered.length - 1);
  }

  return filtered;
};
