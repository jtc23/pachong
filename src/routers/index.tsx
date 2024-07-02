/*
 * @Description:
 * @Author: tianchi
 * @Date: 2023-07-07 19:25:32
 * @LastEditTime: 2024-05-27 18:57:28
 */

import { CHARACTER } from "@/enums/global";
import React from "react";
import type { RouteObject } from "react-router-dom";

import Login from "@/pages/Login";
import Main from "@/pages/Main";
import AdminPage from "@/pages/Admin";
// const EnergyMonitor = React.lazy(() => import("@/pages/EnergyMonitor"));
// const EnergyMonitorView = React.lazy(() => import("@/pages/EnergyMonitor/view"));
// const CarbonMonitor = React.lazy(() => import("@/pages/CarbonMonitor"));
// const CarbonMonitorView = React.lazy(() => import("@/pages/CarbonMonitor/view"));
// const ScreenControllerView = React.lazy(() => import("@/pages/ScreenController/view"));
// const ScreenControllerEdit = React.lazy(() => import("@/pages/ScreenController"));
import EnergyMonitor from "@/pages/Policy";
import EnergyMonitorView from "@/pages/EnergyMonitor/view";
import CarbonMonitor from "@/pages/CarbonMonitor";
import CarbonMonitorView from "@/pages/CarbonMonitor/view";
import ScreenControllerView from "@/pages/ScreenController/view";
import ScreenControllerEdit from "@/pages/ScreenController";
type ConfigureType = {
  verifToken?: boolean;
  title?: string;
  role?: Array<CHARACTER.USER | CHARACTER.ADMIN | string>;
};
const Page404 = React.lazy(() => import("@/pages/404"));

// const TargetFill = React.lazy(() => import("@/pages/TargetFill"));
export interface RouteOptions
  extends Omit<Omit<RouteObject, "children">, "index"> {
  index?: boolean;
  children?: RouteOptions[];
  configure?: ConfigureType;
}
export const webRouter: RouteOptions[] = [
  {
    id: "Page404",
    path: "/404",
    element: <Page404 />,
    children: [],
    configure: {
      verifToken: false,
      role: [CHARACTER.USER, CHARACTER.ADMIN],
    },
  },
];
export const adminRouter = [
  {
    id: "AdminPage",
    path: "/gov",
    element: <AdminPage />,
    children: [
      {
        id: "EnergyMonitor",
        path: "/gov/policy",
        element: <EnergyMonitor />,
        configure: {
          verifToken: false,
        },
      },
    ],
  },
];

export function searchRouteDetail(
  path: string,
  routes: RouteOptions[]
): RouteOptions | null {
  let detail = null;
  const forRouter = (path: string, routes: RouteOptions[]) => {
    for (const item of routes) {
      if (item.path === path) {
        detail = item;
      }
      if (item.children && item.children.length > 0) {
        forRouter(path, item.children);
      }
    }
  };

  forRouter(path, routes);

  return detail;
}
