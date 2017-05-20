const express = require('express');

const shell = require('../shell');
const response = require('./response');
const config = require('../utils/config');

const Channel = require('../relations/Channel');
const Message = require('../documents/Message');

const router = express.Router();

router.get('/', async (req, res, next) => {

  try {
    const channels = await new Channel.Collection()
    .orderBy('name', 'ASC')
    .fetch();

    res.json(channels.toJSON());
  } catch (e) {
    shell.trace(e);
    res.json(response.failure('Could not fetch channels'));
  }

});

router.get('/:channel', async (req, res, next) => {

  const {channel} = req.params;
  try {
    const messages = await Message.Model
    .find({channel})
    .limit(100)
    .sort({createdAt: 1});

    res.json(messages);
  } catch (e) {
    shell.trace(e);
    res.json(response.failure(`Error loading messages for ${channel}`));
  }

});

module.exports = router;
