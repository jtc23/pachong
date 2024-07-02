import { useTabs } from "@/store"
import { useEffect, useState } from "react";
import styles from "./index.module.less"
import cs from "classnames";
import { useUpdateEffect } from "ahooks";

const animateArr = [
    {
        in: 'animate__backInDown',
        out: 'animate__backOutDown'
    },
    {
        in: 'animate__fadeInTopLeft',
        out: 'animate__fadeOutTopRight'
    },
    {
        in: 'animate__zoomIn',
        out: 'animate__zoomOut'
    },
    {
        in: 'animate__fadeInTopRight',
        out: 'animate__fadeOutTopLeft'
    }
]

type TabsContainerRender = (tabIndex: number) => React.ReactNode;

type TabsContainerProps = {
    leftRender?: TabsContainerRender;
    rightRender?: TabsContainerRender;
    centerRender?: TabsContainerRender;
}

const TabsContainer = (props: TabsContainerProps) => {
    const useTabsLine: any = useTabs();
    const { tabIndex, setTime } = useTabsLine;
    const [boxAnimate, setBoxAnimate] = useState<any>({
        left: 'animate__slideInLeft animate__delay-3s',
        right: 'animate__slideInRight animate__delay-3s',
        center: 'animate__zoomIn  animate__delay-3s'
    })

    useUpdateEffect(() => {
        setLeftBox();
    }, [tabIndex])

    // 设置左边盒子的动画函数
    const setLeftBox = () => {
        const { in: inA, out } = setCenterBox();
        setBoxAnimate({
            left: 'animate__slideOutLeft',
            right: 'animate__slideOutRight',
            center: `${out}`
        })
        setTimeout(() => {
            setBoxAnimate({
                left: 'animate__slideInLeft',
                right: 'animate__slideInRight',
                center: `${inA}`
            })
            setTime(null)
        }, 1000)
    }

    // 中间动画随机展示
    const setCenterBox = () => {
        const random = Math.floor(Math.random() * animateArr.length);
        const animate = animateArr[random];
        return animate
    }

    const { leftRender, rightRender, centerRender } = props;

    return (
        <div className={styles.tabsContainer}>
            <div className={cs(['content_border animate__animated', styles.left, boxAnimate.left])}>
                {leftRender?.(tabIndex)}
            </div>
            <div className={cs([styles.content, 'animate__animated', boxAnimate.center])}>
                {centerRender?.(tabIndex)}
            </div>
            <div className={cs(['content_border_right', 'animate__animated', styles.right, boxAnimate.right])}>
                {rightRender?.(tabIndex)}
            </div>
        </div>
    )
}
export default TabsContainer