import styles from './index.module.less';
import cs from "classnames";
import { Col, Row } from 'antd';
import SeamlessScroll from '../SeamlessScroll';
import { useEffect } from 'react';


type SeamlessScrollListProps = {
    dangerList: any[];
    dangerData: any[];
    height?: number;
    className?: string;
    isRoll?: boolean;
    onClick?: (item: any, index: number) => void;
    activeIndex?: any;
}

const SeamlessScrollList = (props: SeamlessScrollListProps) => {
    const { dangerList, dangerData, height, className, isRoll = true, onClick, activeIndex } = props;

    if (!isRoll) {
        return <div className={cs([styles.listRow, className])}>
            <Row className={styles.row}>
                {
                    dangerList?.map((item: any, index: number) => {
                        return <Col key={index} title={item?.name} className={cs([styles.dangerItem, styles.header])} style={{
                            textAlign: item?.center ? 'center' : 'left',
                        }} span={item.span}>{item?.name}</Col>
                    })
                }
            </Row>
            <div style={{ height }} className={styles.rollContent}>
                {
                    dangerData?.map((item: any, index: number) => {
                        return <Row
                            key={index}
                            onClick={() => {
                                onClick?.(item, index);
                            }}
                            gutter={[10, 0]}
                            className={cs({
                                [styles.rows]: true,
                                [styles.rows_active]: activeIndex === index
                            })}>
                            {
                                dangerList?.map((items: any, index: number) => {
                                    return <Col key={index} className={styles.dangerItem} style={{
                                        textAlign: items?.center ? 'center' : 'left',
                                    }} title={item?.[items.value] ?? null} span={items.span}>{
                                            item?.[items.value] ?? null
                                        }</Col>
                                })
                            }
                        </Row>
                    })
                }
            </div>
        </div>
    }


    return <div className={cs([styles.listRow, className])}>
        <Row className={styles.row}>
            {
                dangerList?.map((item: any, index: number) => {
                    return <Col key={index} className={cs([styles.dangerItem, styles.header])} span={item.span}>{item?.name}</Col>
                })
            }
        </Row>
        <SeamlessScroll height={height} speed={2}>
            {
                dangerData?.map((item: any, index: number) => {
                    return <Row key={index} className={styles.rows}>
                        {
                            dangerList?.map((items: any, index: number) => {
                                return <Col key={index} className={styles.dangerItem} span={items.span}>{
                                    item?.[items.value] ?? null
                                }</Col>
                            })
                        }
                    </Row>
                })
            }
        </SeamlessScroll>
    </div>
}
export default SeamlessScrollList