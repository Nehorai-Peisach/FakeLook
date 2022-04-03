require('dotenv').config();
const express = require('express');
const logger = require('../logger');
const addFriend = require('./services/addFriend');
const editProfileService = require('./services/editProfileService');
const getProfileService = require('./services/getProfileService');
const removeFriend = require('./services/removeFriend');
const searchService = require('./services/searchService');
const newGroupService = require('./services/newGroupService');
const getGroupsService = require('./services/getGroupsService');

const PORT = process.env.FRIENDS_PORT;
const app = express();
app.use(express.json());

app.post('/search', async (req, res) =>
  res.send(await doService(searchService, req.body, 'search'))
);

app.post('/getprofile', async (req, res) =>
  res.send(await doService(getProfileService, req.body, 'getprofile'))
);

app.post('/editprofile', async (req, res) =>
  res.send(await doService(editProfileService, req.body, 'editprofile'))
);

app.post('/addfriend', async (req, res) =>
  res.send(await doService(addFriend, req.body, 'addfriend'))
);

app.post('/removefriend', async (req, res) =>
  res.send(await doService(removeFriend, req.body, 'removefriend'))
);

app.post('/newGroup', async (req, res) =>
  res.send(await doService(newGroupService, req.body, 'newGroup'))
);

app.post('/getGroups', async (req, res) =>
  res.send(await doService(getGroupsService, req.body, 'getGroups'))
);

app.post('/block', async(req, res) => {
    res.send(await doService(blockUserService, req.body, 'block'))
})

const doService = async (service, data, text) => {
  try {
    const result = await service(data);
    logger.debug(result, 'fri/app/' + text, 'found');
    if (result) return result;
    else return null;
  } catch (error) {
    logger.error(error, 'fri/app/' + text, 'An error occurred');
    return null;
  }
};

app.listen(PORT, () => {
  logger.http(`friends_service is running on port:${PORT}`, 'connected');
});

app.get('/', (req, res) => {
  res.send('Connected!');
});
