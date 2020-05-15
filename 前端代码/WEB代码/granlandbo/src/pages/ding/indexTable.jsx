/**
 * Created by lidianzhong on 2020-04-26.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React, {useState, useEffect} from 'react';
import {DatePicker, Spin, Select, Input, InputNumber, Button, Tooltip, Popover, Table, Popconfirm} from 'antd';
import {
  EyeOutlined,
  SearchOutlined,
  RedoOutlined,
  ColumnHeightOutlined,
  SettingOutlined,
  EditOutlined,
  CloseOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons'
import CopyTocClipboardComponent from '../../components/components/CopyTocClipboardComponent';
import ModalComponent from "./components/ModalComponent";

import {connect} from 'dva'
import fullScreen from "@/utils/fullScreen";
import styles from './style.less';
import './style.less';
import moment from 'moment';

const {Option} = Select;
const dateFormat = 'YYYY-MM-DD';

const densitySelect = [
  ["small", "紧凑"],
  ["middle", "中等"],
  ["default", "默认"],
]
const DingApp = props => {
  const [density, setDensity] = useState("small");
  const [densityShow, setDensityShow] = useState(false);
  const [isFullScreen, setFullScreen] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loadingFlush, setLoadingFlush] = useState(false);
  const [select, setSelect] = useState(undefined);

  const {dynamicSpace, dispatch} = props;
  let {columns, data, layout} = dynamicSpace;
  columns = columns.map((item, i) => {
    if (item.valueType === "option") {
      item.render = (text, row, index, action) => ([
        <span key="see">
          <ModalComponent onChangeItem={onChangeItem} onChangeItemE={onChangeItemE} child="a" title={"查看"} layout={layout} columns={columns} details={row}>
            <EyeOutlined className={styles["gl-action"]}/>
          </ModalComponent>
        </span>,
        <span key="editor">

          <ModalComponent child="a" title={"编辑"} layout={layout} columns={columns} details={row}>
            <EditOutlined className={styles["gl-action"]}/>
          </ModalComponent>
        </span>,
        <span key="delete">
          <Popconfirm title="确定删除吗？" onCancel={()=>{}} onConfirm={()=>deleteItem(row)}><a> <CloseOutlined className={styles["gl-action"]}/>删除</a></Popconfirm>
        </span>,
      ]);
      item.width = "200px";
    }
    if (item.valueType === "date") {
      item.render = (text, row, index, action) => {
        return <div key={item.dataIndex}>
          <DatePicker
            onChange={(e) => {
              row[item.dataIndex] = e;
              onChangeItem(row);
            }}
            onBlur={(e) => {
              row[item.dataIndex] = e.target.value;
              onChangeItemE(row);
            }}
            allowClear={false} style={{border: 'none'}} defaultValue={moment(row[item.dataIndex], dateFormat)}
            format={dateFormat}/>
        </div>;
      }
    }
    if (item.valueType === "textArea") {
      item.render = (text, row, index, action) => {
        return <div key={item.dataIndex}>
          <Input.TextArea
            style={{border: 'none'}}
            value={row[item.dataIndex]}
            onChange={(e) => {
              row[item.dataIndex] = e.target.value;
              onChangeItem(row)
            }}
            onBlur={(e) => {
              row[item.dataIndex] = e.target.value;
              onChangeItemE(row);
            }}
          />
        </div>;
      }
    }
    if (item.valueType === "select") {
      item.render = (text, row, index, action) => {

        const options = columns.filter(i => i.valueType === "select")[0]["options"];
        return <div key={item.dataIndex} style={{backgroundColor: '#fff'}}>
          {text && <Select
            showSearch
            defaultValue={Object.values(text)}
            style={{width: 100}}
            onChange={(value, option) => {
              if(value &&options.filter(f=>Object.values(f)===value)[0]){
                let data = {};
                data[option.key]=option.value;
                row[item.dataIndex] = data;
                onChangeItem(row);
                setSelect(data);
              }else{
                setSelect(undefined);
              }
            }}
            onBlur={() => {
              if(select&&options.filter(f=>Object.values(f)===select)[0]){
                row[item.dataIndex] = select;
                onChangeItemE(row);
              }
            }}
            filterOption={true}
            showArrow={false}
            bordered={false}
            listHeight={100}
          >
            {options&&options.map(j =>
              <Option
                key={Object.keys(j)[0]}
                value={Object.values(j)[0]}
              >
                {Object.values(j)[0]}
              </Option>)
            }
          </Select>}
        </div>;
      }
    }
    if (item.valueType === "number") {
      item.render = (text, row, index, action) => {
        return <div key={item.dataIndex}>
          <InputNumber
            allowClear={false}
            onChange={(e) => {
              row[item.dataIndex] = e;
              onChangeItem(row)
            }}
            onBlur={(e) => {
              row[item.dataIndex] = e.target.value;
              onChangeItemE(row);
            }}
            style={{border: 'none'}} value={row[item.dataIndex]}
          />
        </div>;
      }
    }
    if (item.valueType === "text") {
      item.render = (text, row, index, action) => {
        return <div key={item.dataIndex}>
          <Input
            allowClear={false}
            onChange={(e) => {
              row[item.dataIndex] = e.target.value;
              onChangeItem(row)
            }}
            onBlur={(e) => {
              row[item.dataIndex] = e.target.value;
              onChangeItemE(row);
            }}
            style={{border: 'none'}} value={row[item.dataIndex]}
          />
        </div>;
      }
      item={
        ...item,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <div>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, item.dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                搜索
              </Button>
              <Button onClick={() => getDataAll()} size="small" style={{ width: 90 }}>
                重置
              </Button>
            </div>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,

      }
    }
    return item;
  })


  useEffect(() => {
    getDataAll();
  }, [])

  // 获取数据
  const getDataAll = () => {
    setLoadingFlush(true);
    try {
      dispatch({
        type: 'dynamicSpace/get',
        callback: res => {
          if (res.status === 'ok') {
            setLoadingFlush(false);
          }
        }
      })
    } catch (e) {
      setLoadingFlush(false);
    }
  }

  // 修改
  const onChangeItem = (item) => {
    dispatch({
      type: 'dynamicSpace/changeItem',
      payload: item
    })
  }
  const onChangeItemE = (item) => {
    dispatch({
      type: 'dynamicSpace/changeItemE',
      payload: item
    })
  }
// 删除
  const deleteItem=row=>{
    dispatch({
      type: 'dynamicSpace/delete',
      payload: row
    })
  }

  const  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    console.log(selectedKeys[0]);
    dispatch({
      type: 'dynamicSpace/filter',
      payload:{dataIndex,value:selectedKeys[0]}
    })
  };

  const rowSelection = {
    columnWidth: '60px',
    fixed: true,
    selectedRowKeys,
    onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
    hideDefaultSelections: true,
    type: "checkbox",
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      {
        key: 'even',
        text: '选择偶数行',
        onSelect: changableRowKeys => {
          setSelectedRowKeys(changableRowKeys.filter((key, index) => index % 2 === 0));
        },
      },
      {
        key: 'odd',
        text: '选择奇数行',
        onSelect: changableRowKeys => {
          setSelectedRowKeys(changableRowKeys.filter((key, index) => index % 2 !== 0));
        },
      },
    ]

  }

  // 修改密目函数
  const changeDensity = (size) => {
    setDensity(size);
    setDensityShow(false);
  }
  // 密度内容
  const content = (<div>
    {densitySelect.map(item =>
      <div key={item[0]} onClick={() => changeDensity(item[0])} className={styles["pop-style"]}
           style={{color: density === item[0] ? "#0189ff" : null}}>
        {item[1]}
      </div>)}
  </div>)

  return (<div id="fullscreen" className={styles["gl-body"]}>

    <h4 className={styles["gl-text"]}>
      <CopyTocClipboardComponent text={"函数测试区"} size={20}/>
    </h4>
    <Spin spinning={loadingFlush}>
      {columns.length && <div id="glTable">
        <div className={styles["gl-setting"]}>
          <Tooltip title={"密度"} className={styles["gl-full"]}>
            <Popover
              placement="bottom"
              className={styles["gl-full-screen"]}
              content={content}
              trigger="click"
              visible={densityShow}
            >
              <div className={styles["gl-full-screen"]} onClick={() => setDensityShow(true)}>
                <ColumnHeightOutlined/>
              </div>
            </Popover>
          </Tooltip>
          <Tooltip title={isFullScreen ? "全屏" : "退出全屏"} className={styles["gl-full"]}>
            <div className={styles["gl-full-screen"]} onClick={() => {
              fullScreen('glTable');
              setFullScreen(!isFullScreen);
            }}>
              {isFullScreen ? <FullscreenOutlined/> : <FullscreenExitOutlined/>}
            </div>
          </Tooltip>
          <Tooltip title={"刷新"} className={styles["gl-full"]}>
            <div className={styles["gl-full-screen"]} onClick={() => getDataAll()}>
              <RedoOutlined/>
            </div>
          </Tooltip>
          <Tooltip title={"设置"} className={styles["gl-full"]}>
            <div className={styles["gl-full-screen"]} onClick={() => {
            }}>
              <SettingOutlined/>
            </div>
          </Tooltip>
          <Button type="primary" className={styles["gl-table-button"]}>添加</Button>
          <Button type="primary" className={styles["gl-table-button"]}>批量删除</Button>
        </div>
        <Table
          size={density}
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
          pagination={{pageSize: 10}}
        />
      </div>}
    </Spin>
  </div>)
}

export default connect(({dynamicSpace}) => ({dynamicSpace}))(DingApp);
