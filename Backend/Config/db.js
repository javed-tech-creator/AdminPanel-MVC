import mongoose from 'mongoose';

const connectionDB = async()=>{
if(!process.env.MONGO_URI){
  console.log("MongoDb Connection URL Not Found in Enviornment variable")
  process.exite(1);
}
try {
  const Conn= await mongoose.connect(process.env.MONGO_URI)
  console.log('MongoDB Connection Successfull :- ',Conn.connection.host)
  
} catch (error) {
  console.error('Mongodb Connection Error :- ',error)
}
}
export default connectionDB