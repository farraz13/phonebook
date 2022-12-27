var express = require('express');
const { Response } = require('../helpers/util');
var router = express.Router();
var models = require('../models')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const users  = await models.User.findAll()
    res.json(new Response(users))
  } catch (error) {
    res.status(500).json(new Response(error, false))
  }
});

router.post('/', async function (req, res, next) {
  try {
    const users  = await models.User.create(req.body)
    res.json(new Response(users))
  } catch (error) {
    res.status(500).json(new Response(error, false))

  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const users  = await models.User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.json(new Response(users))
  } catch (error) {
    res.status(500).json(new Response(error, false))
  }
});

router.delete('/:id', async function (req, res, next) {

  try {
    const users  = await models.User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(new Response(users))
  } catch (error) {
    res.status(500).json(new Response(error, false))
  }
});

module.exports = router;
