
const allData=[
  {id:0,name:"吃饭",},
  {id:1,name:"睡觉",},
  {id:2,name:"打豆豆",},
  {id:3,name:"我是就是豆豆",},
];

function getData(req,res){
  return res.json(allData);
}
function deleteData(req,res) {
  const params = req.query;
  return res.json(JSON.parse(params.data).filter(item=>item.id!==parseInt(params.id)));
}

function addData(req,res) {
  let props = JSON.parse(req.query.data);
  return res.json([...props.data,{id:props.data.length,...props.item}]);
}
function editData(req,res) {
  let props = JSON.parse(req.query.data);
  return res.json(props.data.map(item=>item.id===props.item.id?props.item:item));
}

export default {
  'POST /api/test_data':getData,
  'POST /api/delete_data':deleteData,
  'POST /api/add_data':addData,
  'POST /api/edit_data':editData,
}
