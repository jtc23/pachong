/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2023-07-26 08:47:05
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-05-27 19:07:25
 * @FilePath: \caculator\src\pages\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint-disable quotes */
import { useRoutes } from "react-router-dom";
import { webRouter, adminRouter } from "../routers";
import { useMemo } from "react";
import "../global.less";
import { createBrowserHistory } from "history";
import { userStore } from "@/store";

function App() {
  const history = createBrowserHistory();
  const routers: Array<any> = useMemo(() => {
    let routerList = [...webRouter, ...adminRouter];

    // console.log(routerList);

    return routerList;
  }, []);

  console.log("是否进入了项目里面。。。。。。。。。");

  // if (!token) history.push("/login");
  const routesElement = useRoutes([...routers]);
  return routesElement;
}

export default App;
