const sliderimage = require('../Model/SliderModel')
const { v2: cloudinary } = require('cloudinary');
const fs = require('fs')

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: 'drdefwda9', 
  api_key: '948565595918736', 
  api_secret: 'kPWiuSUHm6Zj_E0WvdoyATG60-E' // Replace with actual secret
});

//saving data...
const saveSlider = async(req,res)=>{
try {
 
  const{image_title} = req.body;

   // Upload image to Cloudinary
   const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
    folder: 'sliders', // Organize uploads into a 'sliders' folder
    public_id: `slider_${Date.now()}`, // Unique name
    use_filename: true,
});
    // Remove the file from local storage after upload
    fs.unlinkSync(req.file.path);

     // Save data to database
 
  const userData = new sliderimage({
    image_title,
    image_url:cloudinaryResponse.secure_url, // Store Cloudinary URL
    public_id: cloudinaryResponse.public_id, // Store public_id for future deletions
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
    const slider = await sliderimage.findById(req.params.id);
    if (!slider) return res.status(404).json({ message: "Slider not found" });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(slider.public_id);

    // Delete from database
    await sliderimage.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Slider deleted successfully" });

} catch (error) {
    res.status(500).json({ error: error.message });
}
}

const updateSlider = async(req,res)=>{
  try {
   
    const updateData = req.body
 
    const slider = await sliderimage.findById(req.params.id);
    if (!slider) return res.status(404).json({ message: "Slider not found" });


    if (req.file) {
      // Delete old image from Cloudinary
      await cloudinary.uploader.destroy(slider.public_id);

      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'sliders',
          public_id: `slider_${Date.now()}`,
          use_filename: true,
      });

      // Remove local file
      fs.unlinkSync(req.file.path);

      updateData.image_url = result.secure_url;
      updateData.public_id = result.public_id;
  }

    const updateSlider = await sliderimage.findByIdAndUpdate(id,updateData,{new:true})

    res.status(201).json({message:'Slider updated Successfully',updateSlider})

    
  } catch (error) {
    res.status(500).json({message:'Network Error during updating the Slider',error})
  }
}

module.exports ={saveSlider,getSlider,deleteSlider,updateSlider}