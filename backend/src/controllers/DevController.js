const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
  async index(req, res) {
    const { user } = req.headers

    const loggedDev = await Dev.findById(user)

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    })

    return res.json(users)
  },

  async store(req, res) {
    const { username } = req.body

    const userExists = await Dev.findOne({ user: username })

    if (userExists !== null) {
      return res.json({
        error: 'Usuário já existe.'
      })
    }

    try {
      var response = await axios.get(`https://api.github.com/users/${username}`)
    } catch (error) {
      return res.status(404).json({
        error: 'User not found'
      })
    }

    const { name, bio, avatar_url: avatar } = response.data

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    })

    return res.json(dev)
  }
}
