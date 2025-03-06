const mongoose = require('mongoose')

const slideSchema = new mongoose.Schema({
  image_title:{
    type:String,
    required:true,

  },
    image_url:{
      type:String,
    }
})

const sliderimage = mongoose.model('sliderimage',slideSchema)

module.exports = sliderimage