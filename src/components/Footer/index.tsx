import styles from './index.module.less'
import cs from "classnames";
const Footer = () => {
    return (
        <footer className={cs(styles.footer_contanier, ['animate__animated animate__slideInUp animate__delay-4s'])}>
            <div className={styles.footer}></div>
        </footer>
    )
}
export default Footer