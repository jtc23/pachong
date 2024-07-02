/*
 * @Description:
 * @Author: tianchi
 * @Date: 2023-07-07 19:17:17
 * @LastEditTime: 2024-05-24 14:43:29
 */
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchRouteDetail, webRouter, adminRouter } from "./index";
import { log } from "console";
import { isNumber } from "lodash-es";
import { userStore } from "@/store";

type AuthRouterProps = {
  children?: React.ReactNode;
};

function AuthRouter(props: AuthRouterProps) {
  const { token, user_name } = userStore();
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;
  // console.log(
  //   pathname
  //     .split("/")
  //     .map((el) => (el && !isNaN(Number(el)) ? ":id" : el))
  //     .join("/")
  // );
  const newpathname = pathname
    .split("/")
    .map((el) => (el && !isNaN(Number(el)) ? ":id" : el))
    .join("/");

  const routerDetail = searchRouteDetail(newpathname, [
    ...webRouter,
    ...adminRouter,
  ]);
  const title = routerDetail?.configure?.title;
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    console.log(111111111);

    // if (token && user_name && location.pathname.includes("/login")) {
    //   navigate("/policy");
    //   return;
    // }

    // if (!token && location.pathname !== "/main") {
    //   // navigate("/");
    //   navigate("/login", {
    //     state: {
    //       form: routerDetail?.path,
    //     },
    //   });
    // }
  }, [pathname, routerDetail]);

  return <>{props.children}</>;
}

export default AuthRouter;
