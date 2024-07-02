/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-05-24 11:13:06
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-05-27 19:29:22
 * @FilePath: \Project_AoGangLian-Web\src\main.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthRouter from "./routers/auth_router";
// import Global from "./components/Global";
import App from "@/pages/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter basename={"/CarbonFootprint"}>
    <AuthRouter>
      {/* <Global> */}
      <React.Suspense
        fallback={
          <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <OpenAiLogo rotate width="3em" height="3em" /> */}
          </div>
        }
      >
        <App />
      </React.Suspense>
      {/* </Global> */}
    </AuthRouter>
  </BrowserRouter>
);
