/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-08-31 17:33:14
 * @LastEditTime: 2023-08-08 14:06:52
 */
/*
 * 通过高阶组件给普通组件加上弹窗功能
 *
 * 不需要标签，通过 show 展示弹窗
 * 不需要 visible state
 * SetText 只要处理本身的逻辑，注意一下关闭弹窗的时机，此外不用在意弹窗；如果不需要弹窗了，那么不使用高阶组件，直接使用 SetText 即可
 * 任何组件通过 withDialog 都可以拥有弹窗功能
 */
import React from "react";
import ReactDOM from "react-dom";
import { Modal } from "antd";

export default function withDialog(WrappedComponent, mask1) {
    function EnhancedComponent(props) {
        const { title = false, centered = true, width = "560px", maskClosable = false, footer = null, closable = false, onClose, mask, ...others } = props;
        return (
            <Modal
                visible={true}
                onCancel={() => {
                    onClose();
                }}
                title={title}
                closable={closable}
                footer={footer}
                width={width}
                maskClosable={maskClosable}
                centered={centered}
                mask={mask1}
                wrapClassName={"maker_login_repeated"}>
                <WrappedComponent {...others} onClose={onClose} />
            </Modal>
        );
    }

    EnhancedComponent.show = params => {
        let container = document.createElement("div");
        // container.className = "container";
        // if (!container) return null;
        document.body.appendChild(container);
        // let arr = [...document.querySelectorAll(".container")];
        // arr.forEach(el => {
        //     ReactDOM.unmountComponentAtNode(el);
        //     console.log(el);
        //     document.body.removeChild(el);
        // });

        function closeHandle() {
            ReactDOM.unmountComponentAtNode(container);
            document.body.removeChild(container);
            return (container = null);
        }

        return ReactDOM.render(<EnhancedComponent {...params} onClose={closeHandle} />, container);
    };

    return EnhancedComponent;
}
