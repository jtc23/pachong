import styles from "./index.module.less";
import cs from "classnames";
import { useEffect, useLayoutEffect, useState } from "react";

const FullScreenContainer = (props: any) => {
    const { children } = props;
    const [st, setStyles] = useState({});
    useEffect(() => {
        setLayoutStyle();
        window.addEventListener("resize", setLayoutStyle);
    }, [])

    const setLayoutStyle = () => {
        const { clientWidth, clientHeight } = document.documentElement;
        console.log(clientWidth, clientHeight)
        const { width, height } = {
            width: 1920,
            height: 1080,
        }

        console.log(clientWidth, width, clientHeight, height)
        console.log(clientWidth / width, clientHeight / height)

        // TODO: 这是为什么？？
        if ((clientWidth / width) < (clientHeight / height)) {
            setStyles({
                transform: `scale(${clientWidth / width})`,
                // transformOrigin: 'left top'
            })
        } else {
            setStyles({
                transform: `scale(${clientHeight / height})`,
                // transformOrigin: 'top'
            })
        }
    }

    return (
        <div className={cs([styles.full_screen_container])} style={st}>
            {children}
        </div>
    )
}
export default FullScreenContainer