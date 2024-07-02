import { parkCode } from "@/layouts/constat";
import { areaMask } from "./constat";

/**
 * 添加区域遮罩层
 */
export const addAreaMask = (map: any, rs: any) => {

    var EN_JW = "180, 90;";         //东北角
    var NW_JW = "-180,  90;";       //西北角
    var WS_JW = "-180, -90;";       //西南角
    var SE_JW = "180, -90;";        //东南角
    const parkData = areaMask(parkCode);
    const { list, point } = parkData
    let str = list.map((item: any) => `${item.x},${item.y};`)?.join('') || '';

    // var ply1 = new BMap.Polygon(SE_JW + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW,
    //     { strokeColor: "none", strokeWeight: 0, fillColor: "#000", fillOpacity: 0.6, strokeOpacity: 1 }); //建立多边形覆盖物
    // map.addOverlay(ply1);


    // var ply2 = new BMap.Polygon(rs, { strokeWeight: 3, strokeColor: "#AEECFF", fillColor: "red", fillOpacity: 0.4, strokeOpacity: 1 });
    // map.addOverlay(ply2);

    var ply2 = new BMap.Polyline(rs, { strokeWeight: 3, strokeColor: "#AEECFF", strokeOpacity: 1 });
    map.addOverlay(ply2);

    // 添加天津市边界
    // var bdary = new BMap.Boundary();
    // bdary.get("天津市", function (rs: any) {       //获取行政区域」
    //     let str = [];
    //     for (var i = 0; i < rs.boundaries.length; i++) {
    //         const arr = rs.boundaries[i].split(";");
    //         for (let i = 0; i < arr.length; i++) {
    //             const item = arr[i].split(",");
    //             str.push(new BMapGL.Point(item[0], item[1]))
    //             // console.log(arr[i])
    //         }
    //     }
    //     var ply2 = new BMap.Polyline(str, { strokeWeight: 3, strokeColor: "#AEECFF", strokeOpacity: 1 });
    //     map.addOverlay(ply2);
    // });
}