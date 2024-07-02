/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-09-05 09:50:29
 * @LastEditTime: 2022-12-12 16:46:55
 */
import styles from "./index.less";
import classNames from "classnames";

import { useState, useEffect } from "react";
import { Col } from "antd";
import { EyeFilled, LikeFilled, MoneyCollectFilled, MinusCircleOutlined } from "@ant-design/icons";
import { isNumber } from "lodash-es";
export interface ButtonProps {
    link?: string;
    data?: any;
    span?: number | undefined;
    style?: any;
    filterData?: any[];
    clickNumber?: string | number | undefined;
    collectionNumber?: string | number | undefined;
    likeNumber?: string | number | undefined;
    view?: boolean;
    title?: string;
}
const MangerListComponent = ({ link, title, data, span, style, filterData = [], collectionNumber, likeNumber, clickNumber, view = true }: ButtonProps) => {
    const [Item, setItem] = useState<string>("");

    return (
        <div className={styles.MangerListComponent} style={style}>
            {title && <b style={{ position: "relative", left: "-30px", top: "30px" }}>{title}:</b>}
            <div className={styles.innerhtml} dangerouslySetInnerHTML={{ __html: data }}></div>
            <div className={styles.link}>
                {link ? (
                    <div className={styles.tips}>
                        <a href={link} target={"_blank"}>
                            {"查看原文链接"}
                        </a>
                    </div>
                ) : null}
                {view && (
                    <div className={styles.collect}>
                        {isNumber(Number(collectionNumber)) && (
                            <div>
                                <MoneyCollectFilled className={styles.like} /> <span>{collectionNumber}</span>
                            </div>
                        )}
                        {isNumber(Number(likeNumber)) && (
                            <div>
                                <LikeFilled className={styles.like} /> <span>{likeNumber}</span>
                            </div>
                        )}
                        {isNumber(Number(clickNumber)) && (
                            <div>
                                <EyeFilled className={styles.like} />
                                <span>{clickNumber}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MangerListComponent;
