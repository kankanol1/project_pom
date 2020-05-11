
const theme=(req,res)=>{
  const data = req.query;
  console.log(data);
  return res.json(data);
}
export default{
  "POST /api/theme":theme,
}
