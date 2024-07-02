/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-03-11 11:05:28
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-03-13 10:05:04
 * @FilePath: \companyApplication\src\components\MapView\Marker.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  CustomOverlay,
  CustomOverlayProps,
  Marker,
} from "@uiw/react-baidu-map";
import { omit } from "lodash-es";
import "./Marker.less";

type MarkerProps = {
  color?: string;
  onClick?: (e: any, item: any) => any;
  onMouseEnter?: (e: any, item: any) => any;
  onMouseLeave?: (e: any, item: any) => any;
} & CustomOverlayProps;

const ViewMarker = (props: MarkerProps) => {
  const { color, onClick, onMouseEnter, onMouseLeave, ...items } = props;
  const item = omit(items, ["map", "container", "BMap"]);

  return (
    <CustomOverlay {...item} >
      <div
        className="pulse"
        style={{ backgroundColor: color }}
        onClick={(e: any) => onClick?.(e, props)}
        onMouseEnter={(e: any) => onMouseEnter?.(e, props)}
        onMouseLeave={(e: any) => onMouseLeave?.(e, props)}
      >
        <div className="ring_item"></div>
        <div className="ring_item"></div>
        <div className="ring_item"></div>
        <div className="ring_item"></div>
      </div>
    </CustomOverlay>
    // <>
    //   <Marker
    //     {...item}
    //     // icon={
    //     //   new BMap.Icon(
    //     //     "http://developer.baidu.com/map/jsdemo/img/fox.gif",
    //     //     new BMap.Size(300, 157)
    //     //   )
    //     // }
    //     // iconUrl={"http://developer.baidu.com/map/jsdemo/img/fox.gif"}
    //     onClick={(e: any) => onClick?.(e, props)}
    //     onMouseEnter={(e: any) => onMouseEnter?.(e, props)}
    //     onMouseLeave={(e: any) => onMouseLeave?.(e, props)}
    //   />
    // </>
  );
};
export default ViewMarker;
