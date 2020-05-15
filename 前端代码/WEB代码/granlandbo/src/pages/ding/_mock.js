import Mock from "mockjs";
import React from "react";

const options =  [
  {swimming: "游泳"},
  {skiting: "滑冰"},
  {running: "跑步"},
  {pingpang: "乒乓球"},
  {bascketball: "打篮球"},
  {bascketball1: "打篮球1"},
  {bascketball2: "打篮球2"},
  {bascketball3: "打篮球3"},
  {bascketball4: "打篮球5"}
];
const columns = [
  {
    title: '标号',
    dataIndex: 'key',
    copyable: false,
    ellipsis: false,
    valueType: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    copyable: false,
    ellipsis: false,
    valueType: 'text',
    hideInSearch: false,
    hideInTable: false,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    hideInSearch: true,
    valueType: 'number',
    editable: true,
  },
  {
    title: '日期',
    dataIndex: 'date',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '名言',
    dataIndex: 'world',
    valueType: 'textArea',
    hideInSearch: true,
  },
  {
    title: '爱好',
    dataIndex: 'fancy',
    valueType: 'select',
    hideInSearch: true,
    options,
  },
  {
    title: '操作',
    valueType: 'option',
    dataIndex: 'option',
  }
];
let data = Array(20)
  .fill(0, 0, 20)
  .map((item, i) => {
    return Mock.mock(
      {
        "key": i,
        "name": Mock.mock('@cname(3,4)'),
        "age|1-100": 100,
        "world": Mock.mock('@ctitle(10, 20)'),
        "fancy|1":options,
        "date": Mock.mock('@now("yyyy-MM-dd")'),
      }
    )
  });

const getTestData = (req, res) => {
  return res.json({columns, data, layout: [8, 10]});
}
const onChangeItemE = (req, res) => {
  const payload = req.query;
  data = data.map(item => item.key + '' === payload.key + '' ? payload : item);
  return res.json({status: "ok"});
}

export default {
  'POST /api/get_test_data': getTestData,
  'POST /api/change_item_data': onChangeItemE,
}
