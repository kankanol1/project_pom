/**
 * Created by lidianzhong on 2020-04-09.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import { SettingDrawer } from '@ant-design/pro-layout';
import { RouteContext } from '@ant-design/pro-layout';
import { getMenuData } from '@ant-design/pro-layout';
import { getPageTitle } from '@ant-design/pro-layout';
const { breadcrumb, menuData } = getMenuData(
  routes,
  menu,
  formatMessage,
  menuDataRender,
);
const Theme = ()=>{
  console.log("breadcrumb",breadcrumb);
  console.log("menuData",menuData);
  console.log("getPageTitle",getPageTitle);
  console.log("getPageTitle",getPageTitle);
  return(
    <div>
      <h1>主题切换</h1>

    </div>
  )
}
export default Theme;
