const {Router} = require('express');
const { validationResult } = require('express-validator/check')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const {courseValidators} = require('../utils/validators')
const router = Router();

router.get('/', auth, (req, res) => {
    res.render('add', {
      title: 'Добавить курс',
      isAdd: true
    })
})

router.post('/', auth, courseValidators, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const {title, price, img} = req.body;
    return res.status(422).render('add', {
      title: 'Добавить курс',
      isAdd: true,
      error: errors.array()[0].msg,
      data: {
        title,
        price, 
        img,
      }
    })
  }
    // console.log(req.body);
    const {title, price, img} = req.body;
    //const course = new Course(title, price, img);
    const course = new Course({
      title,
      price, 
      img,
      userId: req.user
    });

    try {
      await course.save();
      res.redirect('/courses');
    } catch (e) {
      console.log(e);
    }


})

module.exports = router;