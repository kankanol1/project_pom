import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import { routerRedux } from 'dva/router';


let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;


let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/test/components/AddTodo",
        "exact": true,
        "component": require('../test/components/AddTodo.js').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "path": "/draggable/Tables",
        "exact": true,
        "component": require('../draggable/Tables.js').default
      },
      {
        "path": "/draggable/TablesC",
        "exact": true,
        "component": require('../draggable/TablesC.js').default
      },
      {
        "path": "/draggable",
        "exact": true,
        "component": require('../draggable/index.js').default
      },
      {
        "path": "/draggable/TablesF",
        "exact": true,
        "component": require('../draggable/TablesF.js').default
      },
      {
        "path": "/draggable/TableHocCom",
        "exact": true,
        "component": require('../draggable/TableHocCom.js').default
      },
      {
        "path": "/draggable/TablesFFF",
        "exact": true,
        "component": require('../draggable/TablesFFF.js').default
      },
      {
        "path": "/draggable/TablesFFFF",
        "exact": true,
        "component": require('../draggable/TablesFFFF.js').default
      },
      {
        "path": "/draggable/TablesFFFFF",
        "exact": true,
        "component": require('../draggable/TablesFFFFF.js').default
      },
      {
        "path": "/draggable/TablesFFFFFF",
        "exact": true,
        "component": require('../draggable/TablesFFFFFF.js').default
      },
      {
        "path": "/draggable/TablesSort",
        "exact": true,
        "component": require('../draggable/TablesSort.js').default
      },
      {
        "path": "/draggable/TablesCC",
        "exact": true,
        "component": require('../draggable/TablesCC.js').default
      },
      {
        "path": "/draggable/TablesFF",
        "exact": true,
        "component": require('../draggable/TablesFF.js').default
      },
      {
        "path": "/tables/components/ModelTest",
        "exact": true,
        "component": require('../tables/components/ModelTest.js').default
      },
      {
        "path": "/tables/table",
        "exact": true,
        "component": require('../tables/table.js').default
      },
      {
        "path": "/tables/tables",
        "exact": true,
        "component": require('../tables/tables.js').default
      },
      {
        "path": "/test/redux/actionTypes",
        "exact": true,
        "component": require('../test/redux/actionTypes.js').default
      },
      {
        "path": "/test/constants",
        "exact": true,
        "component": require('../test/constants.js').default
      },
      {
        "path": "/test",
        "exact": true,
        "component": require('../test/index.js').default
      },
      {
        "path": "/test/components/VisibilityFilters",
        "exact": true,
        "component": require('../test/components/VisibilityFilters.js').default
      },
      {
        "path": "/draggable/TableHoc",
        "exact": true,
        "component": require('../draggable/TableHoc.js').default
      },
      {
        "path": "/test/components/TodoList",
        "exact": true,
        "component": require('../test/components/TodoList.js').default
      },
      {
        "path": "/test/redux/actions",
        "exact": true,
        "component": require('../test/redux/actions.js').default
      },
      {
        "path": "/test/components/Todo",
        "exact": true,
        "component": require('../test/components/Todo.js').default
      },
      {
        "path": "/test/redux/reducers",
        "exact": true,
        "component": require('../test/redux/reducers/index.js').default
      },
      {
        "path": "/test/redux/reducers/todos",
        "exact": true,
        "component": require('../test/redux/reducers/todos.js').default
      },
      {
        "path": "/test/redux/reducers/visibilityFilter",
        "exact": true,
        "component": require('../test/redux/reducers/visibilityFilter.js').default
      },
      {
        "path": "/test/redux/selectors",
        "exact": true,
        "component": require('../test/redux/selectors.js').default
      },
      {
        "path": "/test/redux/store",
        "exact": true,
        "component": require('../test/redux/store.js').default
      },
      {
        "path": "/test/TodoApp",
        "exact": true,
        "component": require('../test/TodoApp.js').default
      },
      {
        "path": "/testT/components/AddTodo",
        "exact": true,
        "component": require('../testT/components/AddTodo.js').default
      },
      {
        "path": "/testT/components/Todo",
        "exact": true,
        "component": require('../testT/components/Todo.js').default
      },
      {
        "path": "/testT/components/TodoList",
        "exact": true,
        "component": require('../testT/components/TodoList.js').default
      },
      {
        "path": "/testT",
        "exact": true,
        "component": require('../testT/index.js').default
      },
      {
        "path": "/testT/redux/actions",
        "exact": true,
        "component": require('../testT/redux/actions.js').default
      },
      {
        "path": "/testT/redux/reducers",
        "exact": true,
        "component": require('../testT/redux/reducers/index.js').default
      },
      {
        "path": "/testT/redux/reducers/todos",
        "exact": true,
        "component": require('../testT/redux/reducers/todos.js').default
      },
      {
        "path": "/testT/redux/reducers/visibilityFilter",
        "exact": true,
        "component": require('../testT/redux/reducers/visibilityFilter.js').default
      },
      {
        "path": "/testT/redux/selectors",
        "exact": true,
        "component": require('../testT/redux/selectors.js').default
      },
      {
        "path": "/testT/redux/store",
        "exact": true,
        "component": require('../testT/redux/store.js').default
      },
      {
        "path": "/users",
        "exact": true,
        "component": require('../users/page.js').default
      },
      {
        "component": () => React.createElement(require('E:/webstorm/dva/examples/user-dashboard/node_modules/_umi-build-dev@0.22.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', routes: '[{"path":"/","component":"./src\\\\layouts\\\\index.js","routes":[{"path":"/test/components/AddTodo","exact":true,"component":"./src/pages/test/components/AddTodo.js"},{"path":"/","exact":true,"component":"./src/pages/index.js"},{"path":"/draggable/Tables","exact":true,"component":"./src/pages/draggable/Tables.js"},{"path":"/draggable/TablesC","exact":true,"component":"./src/pages/draggable/TablesC.js"},{"path":"/draggable","exact":true,"component":"./src/pages/draggable/index.js"},{"path":"/draggable/TablesF","exact":true,"component":"./src/pages/draggable/TablesF.js"},{"path":"/draggable/TableHocCom","exact":true,"component":"./src/pages/draggable/TableHocCom.js"},{"path":"/draggable/TablesFFF","exact":true,"component":"./src/pages/draggable/TablesFFF.js"},{"path":"/draggable/TablesFFFF","exact":true,"component":"./src/pages/draggable/TablesFFFF.js"},{"path":"/draggable/TablesFFFFF","exact":true,"component":"./src/pages/draggable/TablesFFFFF.js"},{"path":"/draggable/TablesFFFFFF","exact":true,"component":"./src/pages/draggable/TablesFFFFFF.js"},{"path":"/draggable/TablesSort","exact":true,"component":"./src/pages/draggable/TablesSort.js"},{"path":"/draggable/TablesCC","exact":true,"component":"./src/pages/draggable/TablesCC.js"},{"path":"/draggable/TablesFF","exact":true,"component":"./src/pages/draggable/TablesFF.js"},{"path":"/tables/components/ModelTest","exact":true,"component":"./src/pages/tables/components/ModelTest.js"},{"path":"/tables/table","exact":true,"component":"./src/pages/tables/table.js"},{"path":"/tables/tables","exact":true,"component":"./src/pages/tables/tables.js"},{"path":"/test/redux/actionTypes","exact":true,"component":"./src/pages/test/redux/actionTypes.js"},{"path":"/test/constants","exact":true,"component":"./src/pages/test/constants.js"},{"path":"/test","exact":true,"component":"./src/pages/test/index.js"},{"path":"/test/components/VisibilityFilters","exact":true,"component":"./src/pages/test/components/VisibilityFilters.js"},{"path":"/draggable/TableHoc","exact":true,"component":"./src/pages/draggable/TableHoc.js"},{"path":"/test/components/TodoList","exact":true,"component":"./src/pages/test/components/TodoList.js"},{"path":"/test/redux/actions","exact":true,"component":"./src/pages/test/redux/actions.js"},{"path":"/test/components/Todo","exact":true,"component":"./src/pages/test/components/Todo.js"},{"path":"/test/redux/reducers","exact":true,"component":"./src/pages/test/redux/reducers/index.js"},{"path":"/test/redux/reducers/todos","exact":true,"component":"./src/pages/test/redux/reducers/todos.js"},{"path":"/test/redux/reducers/visibilityFilter","exact":true,"component":"./src/pages/test/redux/reducers/visibilityFilter.js"},{"path":"/test/redux/selectors","exact":true,"component":"./src/pages/test/redux/selectors.js"},{"path":"/test/redux/store","exact":true,"component":"./src/pages/test/redux/store.js"},{"path":"/test/TodoApp","exact":true,"component":"./src/pages/test/TodoApp.js"},{"path":"/testT/components/AddTodo","exact":true,"component":"./src/pages/testT/components/AddTodo.js"},{"path":"/testT/components/Todo","exact":true,"component":"./src/pages/testT/components/Todo.js"},{"path":"/testT/components/TodoList","exact":true,"component":"./src/pages/testT/components/TodoList.js"},{"path":"/testT","exact":true,"component":"./src/pages/testT/index.js"},{"path":"/testT/redux/actions","exact":true,"component":"./src/pages/testT/redux/actions.js"},{"path":"/testT/redux/reducers","exact":true,"component":"./src/pages/testT/redux/reducers/index.js"},{"path":"/testT/redux/reducers/todos","exact":true,"component":"./src/pages/testT/redux/reducers/todos.js"},{"path":"/testT/redux/reducers/visibilityFilter","exact":true,"component":"./src/pages/testT/redux/reducers/visibilityFilter.js"},{"path":"/testT/redux/selectors","exact":true,"component":"./src/pages/testT/redux/selectors.js"},{"path":"/testT/redux/store","exact":true,"component":"./src/pages/testT/redux/store.js"},{"path":"/users","exact":true,"component":"./src/pages/users/page.js"}]}]' })
      }
    ]
  }
];


export default function() {
  return (
<Router history={window.g_history}>
  <Route render={({ location }) =>
    renderRoutes(routes, {}, { location })
  } />
</Router>
  );
}
