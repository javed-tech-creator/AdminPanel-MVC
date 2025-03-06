const {saveSlider,getSlider,deleteSlider,updateSlider} = require('../Controller/SliderController')
const express = require('express')
const router = express.Router();
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,path.join(__dirname,'../uploads'))
  },
  filename:(req,file,cb)=>{
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9);
    cb(null,file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})

const upload = multer({storage})

router.post('/save',upload.single('image_url'),saveSlider)
router.get('/get',getSlider)
router.delete('/delete/:id',deleteSlider)
router.put('/update/:id',upload.single('image_url'),updateSlider)


module.exports = router