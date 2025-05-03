import mongoose from 'mongoose'

const slideSchema = new mongoose.Schema({
  image_title:{
    type:String,
    required:true,

  },
    image_url:{
      type:String,
    },
    public_id:{
      type:String,
    }
})

const sliderimage = mongoose.model('sliderimage',slideSchema)

export default sliderimage