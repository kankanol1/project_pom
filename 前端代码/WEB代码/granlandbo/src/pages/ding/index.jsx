/**
 * Created by lidianzhong on 2020-04-26.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React, {useState, useEffect} from 'react';
import {DatePicker, Spin, Select, Input, InputNumber, Button, Tooltip, Popover, Table, Popconfirm} from 'antd';
import {
  EyeOutlined,
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
          <EyeOutlined className={styles["gl-action"]}/>
          <ModalComponent child="a" title={"查看"} layout={layout} columns={columns} details={row}/>
        </span>,
        <span key="editor">
          <EditOutlined className={styles["gl-action"]}/>
          <ModalComponent child="a" title={"编辑"} layout={layout} columns={columns} details={row}/>
        </span>,
        <span key="delete">
          <CloseOutlined className={styles["gl-action"]}/>
          <Popconfirm title="确定删除吗？"><a>删除</a></Popconfirm>
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
        console.log(text);
        const options = columns.filter(i => i.valueType === "select")[0]["options"];
        return <div key={item.dataIndex} style={{backgroundColor: '#fff'}}>
          {text && <Select
            showSearch
            defaultValue={Object.values(text)}
            style={{width: 100}}
            onChange={(value, option) => {
              if(value){
                row[item.dataIndex] = value;
                onChangeItem(row);
                setSelect(value);
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
      {data.length && columns.length && <div id="glTable">
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
