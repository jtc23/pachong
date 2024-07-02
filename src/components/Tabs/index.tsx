import { useEffect, useState, MouseEvent, CSSProperties, useRef, useMemo } from "react";
import cs from "classnames";
import styles from "./index.module.less"
import { useTabs } from "@/store";
import dayjs from "dayjs";
import { findIndex } from "lodash-es";
type Items = {
    name: string;
    key: number;
}

type TabsProps = {
    list: Items[];
    value: number;
}

const Tabs: React.FC<TabsProps> = (props) => {
    // List of tabs
    const { list, value } = props;
    // Value of the active tab
    const [activeTab, setActiveTab] = useState<number>(0);
    // Tabs
    const [tabs, setTabs] = useState(list);
    // Tab styles
    const [tabStyles, setTabStyles] = useState<CSSProperties>({});
    // Tabs ref
    const tabsRef = useRef<HTMLDivElement>(null);
    // Tabs line
    const useTabsLine: any = useTabs();

    // Time Object
    const [dateObj, setDateObj] = useState<any>({
        date: dayjs().format("YYYY-MM-DD"),
        time: dayjs().format("HH:mm:ss")
    });

    // init
    useEffect(() => {
        if (value != null && value != undefined) {
            console.log(value, ';.............;');
            setActiveTab(value);
        }
    }, [value]);


    // set time
    useEffect(() => {
        setInterval(() => {
            const date: string = dayjs().format("YYYY-MM-DD");
            const time: string = dayjs().format("HH:mm:ss");

            setDateObj({
                date,
                time
            })
        }, 1000)
    }, [])

    // set time render use useMemo
    const timeRender = useMemo(() => {
        return (
            <div className={styles.time}>
                <div className={styles.time_date}>
                    {
                        dateObj.date
                    }
                </div>
                <div className={styles.time_set}>
                    {
                        dateObj.time
                    }
                </div>
            </div>
        )
    }, [dateObj])

    // 设置tab样式函数
    const setTabStylesFun = (activeTab: number) => {
        // If the tabs element doesn't exist, return
        if (!tabsRef.current) return;
        // Get the active tab element
        const tab = tabsRef.current.children[activeTab] as HTMLElement;
        // Get the active tab's width and position
        const { width, left } = tab.getBoundingClientRect() as DOMRect;
        // Get the position of the tabs container
        const { x: containerLeft } = tabsRef.current.getBoundingClientRect() as DOMRect;
        // Get the width of the tabs container
        const { width: containerWidth } = tabsRef.current.getBoundingClientRect() as DOMRect;

        // Set the tab styles
        setTabStyles({
            width: `${(width) / containerWidth * 100}%`,
            left: `${(left - containerLeft) / containerWidth * 100}%`
        })
    }

    // 设置tab样式
    useEffect(() => {
        if (activeTab && tabsRef.current) {
            const index = findIndex(tabs, { key: activeTab });
            console.log(tabs, index, activeTab);
            setTabStylesFun(index)
        }
    }, [activeTab, tabsRef.current])

    // 点击tab
    const handleClick = (e: any, index: number, item: Items) => {
        // If the tabs line is not in use, set the tabs line to be in use
        console.log(useTabsLine.time);
        console.log(item)
        // if (!useTabsLine.time) {
        useTabsLine.setTime(Date.now())
        setActiveTab(item.key); // Highlight the tab with the given index
        useTabsLine.setTabIndex(item.key); // Set the tab index for the tabs line
        setTabStylesFun(index); // Set the tab styles for the tab with the given index
        // }
    }

    return <div className={cs([styles.tabs_container, 'animate__animated animate__slideInLeft animate__delay-2s'])}>
        <div className={styles.tabs} ref={tabsRef}>
            {tabs.map((item, index) => {
                return <div
                    key={index}
                    className={cs(styles.tabs_item, { [styles.active]: activeTab == item.key })}
                    onClick={(e: MouseEvent<HTMLElement>) => {
                        handleClick(e, index, item)
                    }}
                >
                    {item.name}
                </div>
            })}
            <div className={styles.tab_base} style={tabStyles}></div>
        </div>
        {timeRender}
    </div>
}
export default Tabs;