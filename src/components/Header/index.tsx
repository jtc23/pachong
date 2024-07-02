/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-04-11 16:05:13
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-04-11 16:27:41
 * @FilePath: \Project_AoGangLian-Web\src\components\Header\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useFullscreen } from "ahooks";
import styles from "./index.module.less";
import cs from "classnames";
import { useEffect, useState } from "react";
const Header = (props: any) => {
  const { data } = props;
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);
  const [size, setSize] = useState<any>(50);
  const [title, setTitle] = useState<any>("");
  const [code, setCode] = useState<any>("");
  // 全屏展示
  const fullScreen = () => {
    toggleFullscreen();
  };

  useEffect(() => {
    const imgUrl = `/imgs/header-title${
      data?.code ? "-" + data?.code : ""
    }.webp`;
    CheckImgExists(imgUrl)
      .then(() => {
        setCode(data?.code);
      })
      .catch(() => {
        setCode("");
      });
    if (data?.display) {
      let title = data?.display?.split(":$:")?.[0]?.trim() ?? "";
      if (data?.code === "ncjkq") {
        title = "南昌经济技术开发区生态文明";
      }
      setTitle(title + "企业能耗在线监测平台管理驾驶舱");
    } else {
      setTitle("企业能耗在线监测平台管理驾驶舱");
    }
  }, [data]);

  function CheckImgExists(imgurl: any) {
    return new Promise(function (resolve, reject) {
      var ImgObj = new Image(); //判断图片是否存在
      ImgObj.src = imgurl;
      ImgObj.onload = function (res) {
        resolve(res);
      };
      ImgObj.onerror = function (err) {
        reject(err);
      };
    });
  }

  return (
    <div
      className={cs([
        styles.header,
        "header animate__animated animate__slideInDown animate__delay-1s",
      ])}
      style={{
        background: `url(/imgs/header-title${
          code ? "-" + code : ""
        }.webp) no-repeat`,
      }}
    >
      <div
        onClick={fullScreen}
        style={{
          fontSize: size,
        }}
        data-set-content={title}
      >
        {title}
      </div>
    </div>
  );
};
export default Header;
