
let panes = [
  { title: 'Tab 1', key: '1' },
  { title: 'Tab 2', key: '2' },
  { title: 'Tab 3', key: '3' },
  { title: 'Tab 4', key: '4' },
];

const get =(req, res)=>{
  return res.json({panes});
}

const update =(req, res)=>{
  return res.json({status:'ok'})
}
const deleteTab =(req, res)=>{
  console.log("mock",req.query);
  panes=panes.filter(i=>i.key!==req.query);
  return res.json({status:'ok'})
}


export default {
  "POST /api/update_tabs":update,
  "POST /api/get_tabs":get,
  "POST /api/delete_tabs":deleteTab
}
