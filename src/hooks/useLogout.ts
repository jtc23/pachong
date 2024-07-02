/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-10-28 17:32:06
 * @LastEditTime: 2023-07-06 15:54:15
 */
import { useEffect, useRef, useState } from "react";
import { setCookies, removeCookies, getCookies } from "@/utils/utils";
import { TOKEN_KEY } from "@/utils/constant";
import { wanInfo } from "@/components/IntergralModal";
import  {GLOBAL} from "@/enums/global"

/**
 * 倒计时hooks
 * @param option
 */
const useLogout = () => {
    const [isInitExecution, setIsInitExecution] = useState(false);
    const timeRef = useRef<any>();
    const flagRef = useRef(false);
    const setIntervalFn = () => {
        flagRef.current=true
        timeRef.current = setInterval(() => {
            const afkLogout = localStorage.getItem(GLOBAL.IS_AFK);
                // console.log(flagRef.current, "out", Date.now());
                if (afkLogout && afkLogout === "1") {
                    if (!!flagRef.current) {
                        flagRef.current = false;
                        wanInfo.show({
                            contentObj: {
                                title: "提示",
                                text: `长时间未操作,系统已自动退出`,
                                ok: "确定",
                            },
                            canelButton: false,
                            onOk: (close: () => void) => {
                                flagRef.current = true;
                                localStorage.setItem(GLOBAL.IS_AFK, "1");
                                window.location.reload();
                                close();
                            },
                        });

                        document.addEventListener("visibilitychange", () => {
                            const afkState = localStorage.getItem(GLOBAL.IS_AFK);
                            const isHidden = document.hidden;

                            if (isHidden) {
                            } else {
                                if (afkState === "1") {
                                    window.location.reload();
                                    document.removeEventListener("visibilitychange", () => {});
                                }
                            }
                        });
                    }
                } else if (getCookies(GLOBAL.POLLING_TIME) && Number(Date.now()) >= Number(getCookies(GLOBAL.POLLING_TIME))) {
                    if (!!flagRef.current) {
                        flagRef.current = false;
                        wanInfo.show({
                            contentObj: {
                                title: "提示",
                                text: `长时间未操作,系统已自动退出`,
                                ok: "确定",
                            },
                            canelButton: false,
                            onOk: (close: () => void) => {
                                flagRef.current = true;
                                localStorage.setItem("is_afk", "1");
                                window.location.reload();
                                close();
                            },
                        });
                        setCookies("isPath", location.pathname);
                        removeCookies(GLOBAL.USER);
                        removeCookies(TOKEN_KEY);
                        localStorage.removeItem(GLOBAL.MENU);
                        localStorage.removeItem(GLOBAL.PERMISSION);
                        localStorage.removeItem(GLOBAL.VIP);
                        localStorage.removeItem(GLOBAL.GPT);
                        document.addEventListener("visibilitychange", () => {
                            const afkState = localStorage.getItem(GLOBAL.IS_AFK);
                            const isHidden = document.hidden;

                            if (isHidden) {
                            } else {
                                if (afkState === "1") {
                                    window.location.reload();
                                    document.removeEventListener("visibilitychange", () => {});
                                }
                            }
                        });
                    }
                }
        }, 30000);
    };

    useEffect(() => {
        if (isInitExecution) {
            // console.log("设置定时");
            setIntervalFn();
        }

        return () => {
            clearInterval(timeRef.current);
        };
    }, [ isInitExecution]);

    const setLogoutTime = () => {
        // console.log(v)
        setIsInitExecution(true);
       
    };

    return {
        setLogoutTime,
    };
};
export default useLogout;
