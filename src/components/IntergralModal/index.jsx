/*
 * 通过高阶组件给普通组件加上弹窗功能
 *
 * 不需要标签，通过 show 展示弹窗
 * 不需要 visible state
 * SetText 只要处理本身的逻辑，注意一下关闭弹窗的时机，此外不用在意弹窗；如果不需要弹窗了，那么不使用高阶组件，直接使用 SetText 即可
 * 任何组件通过 withDialog 都可以拥有弹窗功能
 */
import React from "react";
import { Modal } from "antd";
import Ybutton from "../../Hoc/Ybutton";
import styles from "./index.module.less";
import withDialog from "./withDialog";

class WanInfo extends React.Component {
    static defaultProps = {
        onClose: () => {},
    };

    handleOk = () => {
        const { onOk } = this.props;
        if (onOk) {
            onOk(this.props.onClose);
        } else {
            this.props.onClose();
        }
    };

    onCancel = () => {
        const { onclenter } = this.props;
        if (onclenter) {
            onclenter(this.props.onClose);
        } else {
            this.props.onClose();
        }
    };

    render() {
        let { style = {}, contentObj = {}, canelButton = true, okButton = true } = this.props;

        let arr = [...document.querySelectorAll(".maker_login_repeated")];
        if (arr?.length) {
            arr.length = arr.length - 1;
            // console.log(arr);
            arr.forEach(el => {
                document.body.removeChild(el.parentNode.parentNode);
            });
        }

        // 判断是否是删除提示
        const type = contentObj.title?.includes("删除提示");

        return (
            <div style={{padding:"0 56px"}}>
                <p
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 18,
                        fontWeight: "bold",
                        marginTop: 20,
                        marginLeft: "-25px"
                    }}>
        
                        {contentObj?.title}
                  
                    
                </p>
                <div
                    style={{
                        height: 100,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    {/* <img src="/registered/warn.png" alt="" /> */}
                    <div style={{ marginLeft: 10 }} className="model_text">
                        {contentObj?.copy ? <Paragraph copyable>{contentObj?.text}</Paragraph> : contentObj?.text}
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <div></div>

                    <div
                        style={{
                            width: "50%",
                            display: "flex",
                            justifyContent: canelButton && okButton ? "space-between" : "center",
                            alignItems: "center",
                            marginTop: 20,
                        }}>
                        {canelButton ? (
                            <Ybutton type="y_edit" onClick={this.onCancel}>
                                {contentObj?.canel ?? "取消"}
                            </Ybutton>
                        ) : null}
                        {okButton ? (
                            type ? (
                                <Ybutton type="y_error" onClick={this.handleOk}>
                                    {"删除"}
                                </Ybutton>
                            ) : (
                                <Ybutton type="primary" onClick={this.handleOk}>
                                    {contentObj?.ok ?? "保存"}
                                </Ybutton>
                            )
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export const wanInfo = withDialog(WanInfo, true);
