/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-12-07 10:42:19
 * @LastEditTime: 2023-02-03 14:40:36
 */
import { Pagination, Input, Button } from 'antd';
import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import styles from './index.less';
import { String } from 'lodash';
interface YtableProps {
    total: number;
    showSizeChanger?: boolean;
    initialPageSize?: number;
    initiJumpTitle?: string;
    onChange: (pageNumber: number, pageSize: number) => void;
}
const CustomPagination = forwardRef((props: YtableProps, ref) => {
    const {
        total = 1,
        onChange,
        showSizeChanger = true,
        initialPageSize,
        initiJumpTitle = '跳至',
    } = props;
    // const [pageIndex, setPageIndex] = useState(1);
    const [inputvalue, setInputvalue] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const handleKeyDown = (e: any) => {
        // console.log(e.target.value);
        // console.log(actionRef?.current?.pageInfo);
        // actionRef?.current?.setPageInfo({
        //     current: 2,
        // });
        if (!/^[0-9]*[1-9][0-9]*$/.test(e.target.value)) {
            setInputvalue(e.target.value.replace(/\D/g, ''));
        }

        // setInputvalue(e.target.value.replace(/\D/g, ""));
        const keyCode = e.code;
        if (keyCode === 'Enter') {
            // actionRef?.current?.setPageInfo({
            //     current: Number(inputvalue.replace(/\D/g, "")),
            // });
            onChange(Number(inputvalue.replace(/\D/g, '')), pageSize);
            setPageNumber(Number(inputvalue.replace(/\D/g, '')));
            setInputvalue('');
            return;
        }
        // console.log(inputRef!.current?.value, inputRef);

        const max = Math.ceil(total / pageSize);

        if (Number(inputvalue) > max) {
            setInputvalue(String(max));
        }

        // if(isNumber(Number(e.target.value)))
    };
    useEffect(() => {
        setPageSize(pageSize);
    }, [initialPageSize]);
    useImperativeHandle(ref, () => ({
        handleSetDefaultPage: () => {
            handleSetDefaultPage();
        },
    }));
    const handleSetDefaultPage = () => {
        setPageSize(10);
        setPageNumber(1);
    };
    const onClick = () => {
        onChange(Number(inputvalue.replace(/\D/g, '')), pageSize);
        setPageNumber(Number(inputvalue.replace(/\D/g, '')));
        setInputvalue('');
    };
    const ondefaultChange = (currentpageNumber: number, currentpageSize: number) => {
        setPageNumber(currentpageNumber);
        setPageSize(currentpageSize);
        onChange(currentpageNumber, currentpageSize);
    };
    return (
        <div className={styles.Pagination}>
            <div style={{ display: 'flex' }}>
                <Pagination
                    defaultCurrent={1}
                    current={pageNumber}
                    total={total}
                    showSizeChanger={showSizeChanger}
                    className={styles.pagenation}
                    style={{ marginRight: '10px' }}
                    onChange={ondefaultChange}
                />
                <div className={styles.quickjumper}>
                    {initiJumpTitle}
                    <Input
                        style={{ width: '50px', marginLeft: '10px' }}
                        onKeyUp={handleKeyDown}
                        value={inputvalue}
                        onChange={(e) => {
                            setInputvalue(e?.target?.value);
                        }}
                    />
                    <span style={{ marginRight: '20px', marginLeft: '10px' }}>页</span>
                    <Button type="primary" onClick={onClick}>
                        确定
                    </Button>
                </div>
            </div>
        </div>
    );
});

export default CustomPagination;
