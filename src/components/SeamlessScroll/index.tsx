import styles from "./index.module.less";
import React, { useEffect, useRef, useState } from "react";
import cs, { Argument } from "classnames";

type SeamlessScrollProps = {
    children: React.ReactNode | React.ReactNode[];
    // 是否需要鼠标悬浮停止滚动
    isHoverStop?: boolean;
    // 父元素高度
    height?: number;
    // 速度
    speed?: number;
    className?: Argument;
};

const Index = (props: SeamlessScrollProps) => {
    const { children, isHoverStop = true, height = 200, speed = 10, className } = props;
    let [sumHeight, setSumHeight] = useState(0);
    const [isShowChildrenNext, setIsShowChildrenNext] = useState(true);
    const ChildrenRef = useRef<HTMLDivElement>(null);
    // 运行的定时器
    const raID = useRef<any>();

    // 计算函数
    const marquee = (): any => {
        // 计算一下子元素的高度
        const childHeight = ChildrenRef?.current?.getBoundingClientRect()?.height ?? 0;
        const height: number = document.querySelector(`.${styles.page}`)!.getBoundingClientRect().height;

        if (!speed) return null;
        const speeds = speed * 0.1;
        // 判断子元素是否大于父元素高度 是否需要滚动
        if (childHeight > height) {
            setIsShowChildrenNext(true);
            if (sumHeight < childHeight) {
                setSumHeight((sumHeight += speeds));
            } else {
                sumHeight = 0;
            }
            raID.current = requestAnimationFrame(marquee);
        } else {
            // 如果子元素小于父元素高度则不需要滚动不需要让下一个节点展示
            setIsShowChildrenNext(false);
        }
    };

    // 初始化执行并且在children改变的时候重新执行
    useEffect(() => {
        raID.current = requestAnimationFrame(marquee);

        // window.addEventListener("resize", () => {
        //     raID.current = requestAnimationFrame(marquee);
        // });

        return () => {
            cancelAnimationFrame(raID.current);
        };
    }, [children]);

    // 鼠标悬浮停止滚动
    const onMouseEnter = () => {
        if (!isHoverStop) return;
        cancelAnimationFrame(raID.current);
    };

    // 鼠标离开继续滚动
    const onMouseLeave = () => {
        raID.current = requestAnimationFrame(marquee);
    };

    // 渲染css
    const style: React.CSSProperties = {
        transform: `translateY(-${sumHeight}px)`,
        transition: "all 0ms ease-in 0s",
    };

    return (
        <div className={cs([styles.page, className ?? ""])} style={{ height }}>
            <div className={styles.ov} style={style} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
                <div className={"prev"} ref={ChildrenRef}>
                    {children}
                </div>
                {isShowChildrenNext && <div className={"next"}>{children}</div>}
            </div>
        </div>
    );
};

export default Index;