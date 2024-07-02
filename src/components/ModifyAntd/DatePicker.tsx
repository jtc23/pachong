import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import cs from "classnames";
import styles from './index.module.less';
import locale from 'antd/es/date-picker/locale/zh_CN';

import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
dayjs.locale('zh-cn');

const DatePickerModify: React.FC<DatePickerProps> = (props) => {
    const { className, ...rest } = props;

    return <DatePicker
        className={cs(styles.date)}
        showToday={false}
        allowClear={false}
        suffixIcon={null}
        locale={locale}
        popupClassName={styles.popup}
        {...props}
    />
}

export default DatePickerModify;