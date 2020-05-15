/**
 * Created by lidianzhong on 2020-04-26.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React, {useState, useEffect} from 'react';
import ProTable from '@ant-design/pro-table';
import {Input, Button, Tooltip, Popover, Table, Popconfirm} from 'antd';
import {
  EyeOutlined,
  RedoOutlined,
  ColumnHeightOutlined,
  EditOutlined,
  CloseOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons'
import CopyTocClipboardComponent from '../../components/components/CopyTocClipboardComponent';
import ModalComponent from "./components/ModalComponent";
import {connect} from 'dva';
import IntroComponent from "@/components/components/IntroComponent";

import fullScreen from "@/utils/fullScreen";
import styles from './style.less'


const densitySelect = [
  ["small", "紧凑"],
  ["middle", "中等"],
  ["default", "默认"],
]
const DingApp = props => {
  const [keywords, setKeywords] = useState('');
  const [selfRow, setSelfRow] = useState(0);
  const [density, setDensity] = useState("small");
  const [densityShow, setDensityShow] = useState(false);
  const [size, setSize] = useState('small');
  const [isFullScreen, setFullScreen] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const {dynamicSpace, dispatch} = props;
  let {columns, data, layout} = dynamicSpace;

  useEffect(() => {
    dispatch({
      type: 'dynamicSpace/get',
    })
  }, [])


  const rowSelection = {
    columnWidth: '60px',
    fixed: true,
    selectedRowKeys,
    type: "checkbox",
    hideDefaultSelections: true,
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
      <div onClick={() => changeDensity(item[0])} className={styles["pop-style"]} style={{color: density === item[0] ? "#0189ff" : null}}>
        {item[1]}
      </div>)}

  </div>)

  return (<div id="fullscreen" className={styles["gl-body"]}>
    <IntroComponent key={"intro"}/>
    <h4 className={styles["gl-text"]}>
      <CopyTocClipboardComponent text={"函数测试区"} size={20}/>
      {/*     <span
        style={{float: 'right', color: '#0189ff', cursor: 'pointer'}}
        onClick={() => {
          fullScreen('fullscreen');
          setFullScreen(!isFullScreen);
        }}
      >
        {isFullScreen ? <FullscreenOutlined/> : <FullscreenExitOutlined/>}
      </span>*/}
    </h4>
    <div>
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
            <div className={styles["gl-full-screen"]} onClick={() => {}}>
              <RedoOutlined/>
            </div>
          </Tooltip>
          <Tooltip title={"设置"} className={styles["gl-full"]}>
            <div className={styles["gl-full-screen"]} onClick={() => {}}>
              <RedoOutlined/>
            </div>
          </Tooltip>


        </div>
        <ProTable
          size={size}
          onSizeChange={size => {
            setSize(size)
          }}
          columns={columns.map((item, i) => {
            if (item.dataIndex === "option") {
              item.render = (text, row, index, action) => ([
                <div>
                  <EyeOutlined className={styles["gl-action"]}/>
                  <ModalComponent child="a" title={"查看"} layout={layout} columns={columns} details={row}/>
                </div>,
                <div>
                  <EditOutlined className={styles["gl-action"]}/>
                  <ModalComponent child="a" title={"编辑"} layout={layout} columns={columns} details={row}/>
                </div>,
                <div>
                  <CloseOutlined className={styles["gl-action"]}/>
                  <Popconfirm title="确定删除吗？"><a>删除</a></Popconfirm>
                </div>,
              ]);
            }
            return item;
          })}
          dataSource={data}
          request={() => ({
            data,
            success: true,
          })}
          rowKey="name"
          params={{keywords}}
          rowSelection={rowSelection}
          toolBarRender={action => [
            <ModalComponent child="button" title={"添加"} layout={layout} columns={columns}/>
          ]}
          pagination={{
            defaultCurrent: 2,
          }}
          search={true}
        />
      </div>}
    </div>
  </div>)
}


export default connect(({dynamicSpace}) => ({dynamicSpace}))(DingApp);
