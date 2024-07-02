import styles from './index.module.less';
import cs from "classnames";

type MapClickRenderProps = {
    name?: string;
    close: (e: any) => void;
    children?: React.ReactNode | React.ReactNode[];
    className?: string
}

const MapClickRender = (props: MapClickRenderProps) => {
    const { name, close, children, className } = props;

    return (
        <div className={cs([styles.body, className])}>
            <div className={styles.mask}>

            </div>
            <div className={styles.close}>
                <div className={styles.close_icon} onClick={() => close(null)}>×</div>
            </div>
            <div className={styles.container}>
                <div className={styles.home}></div>
                <div className={styles.title}>{name}</div>
            </div>
            {
                children
            }
            <div className={styles.line}></div>
        </div>
    )
}
export default MapClickRender