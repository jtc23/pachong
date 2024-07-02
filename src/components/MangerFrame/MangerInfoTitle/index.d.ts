/*
 * @Descripttion: 功能
 * @Author: yoke
 * @Date: 2021-10-15 14:17:48
 */
export interface InfoTitleProps {
    title?: string | number;
    isBoult?: boolean;
    isOpen?: boolean;
    setOpenClick?: (T) => void;
    isUpdate?: boolean;
    subtitle?: string;
    isSmall?: boolean;
    children?: React.ReactElement | null;
    time?: string;
}
