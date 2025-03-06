const sliderimage = require('../Model/SliderModel')


//saving data...
const saveSlider = async(req,res)=>{
try {
 
  const{image_title} = req.body;
  const image = req.file ? req.file.filename:null;

  const userData = new sliderimage({
    image_title,
    image_url:image
  })

  const savedData = await userData.save();
  res.status(201).json({message:'Data Saved Successfully',savedData});

} catch (error) {
  res.status(500).json({message:'Network error during saving',error})
}
}

const getSlider = async(req,res)=>{
  try {
    const data = await sliderimage.find();
    if(!data){
      res.status(404).json({message:'data not found'})
    }
    res.status(201).json({message:'Data fetched Successfully',data})
    
  } catch (error) {
    res.status(500).json({message:"Network error during fetching data",error})
  }
}

const deleteSlider = async(req,res)=>{
  try {
    const {id} = req.params
    const deleteData = await sliderimage.findByIdAndDelete(id);
    if(!deleteData){
      res.status(404).json({message:'Data not found'})
    }
    res.status(201).json({message:'Slider Deleted Successfully',deleteData})
    
  } catch (error) {
    res.status(500).json({message:'network error during delete',error})
  }
}

const updateSlider = async(req,res)=>{
  try {
    const {id} =req.params
    const updateData = req.body
    if(req.file){
      updateData.image_url = req.file ? req.file.filename:null
    }

    const update = await sliderimage.findByIdAndUpdate(id,updateData,{new:true})
    if(!update){
      res.status(404).json({message:'Data Not Found For Update'})
    }
    res.status(201).json({message:'Slider updated Successfully',update})

    
  } catch (error) {
    res.status(500).json({message:'Network Error during updating the Slider',error})
  }
}

module.exports ={saveSlider,getSlider,deleteSlider,updateSlider}