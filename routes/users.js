const router = require("express").Router();
const bcrypt = require('bcrypt')

const User = require('../models/User.model')

router.get('/sign-up', (req, res) => {
    res.render('sign-up')
  })

// handling the creating of the new user
router.post('/sign-up', async (req, res) => {
    const user = new User()
    const hash = await bcrypt.hash(req.body.password, 10)
    user.username = req.body.email
    user.password = hash
    try {
      await user.save()
      res.redirect('/')
    } catch (error) {
      res.redirect('/users/sign-up')
    }
  })

module.exports = router;