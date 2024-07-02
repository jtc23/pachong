/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2023-07-26 09:54:00
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-03-08 09:47:40
 * @FilePath: \caculator\src\pages\Login\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2023-07-26 09:54:00
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2023-07-26 13:45:19
 * @FilePath: \caculator\src\pages\Login\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-10-27 17:41:45
 * @LastEditTime: 2023-07-06 15:52:19
 */
// import Footer from '@/components/Footer';

import useGetFakeCaptcha from "@/hooks/useGetFakeCaptcha";
// import { checkPhone, login, systemLogin } from "@/services/user";
// import { getPhoneCaptcha } from "@/services/global";
import type { ProFormInstance } from "@ant-design/pro-form";
import { ProForm, ProFormText } from "@ant-design/pro-form";
import { Alert, Col, message, Row, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.less";
import { infoResultCode, notInterceptResultCode } from "@/utils/ResultCode";
import classNames from "classnames";
import useCaptcha from "@/hooks/useCaptcha";
import useResultRequest from "@/hooks/useResultRequest";
import cs from "classnames";
import { GLOBAL } from "@/enums/global";
import { homeinfo } from "@/utils/constant";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { RESPONSECODE } from "@/enums/global";
import { userStore } from "@/store";
import { fetchAllpermison } from "@/store/user/async";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "./constant";
import { wanInfo } from "@/components/IntergralModal";
import { moretoolsmenus, routes } from "@/utils/menu";
import LoginOutUtils from "@/utils/LoginOutUtil";
import { systemLogin } from "@/service/global";

const SECONDS = 14400;
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Register: React.FC = () => {
  const history = createBrowserHistory();
  const navigate = useNavigate();
  const [state, setState] = useState<number>(0);
  const formRef = useRef<ProFormInstance>();
  const { src, captchaToken, run: getFakeCaptchaRun } = useGetFakeCaptcha({});
  const [errInfoData, setErrorInfoData] = useState<any>();
  const { setLoginData, token } = userStore();
  const { count, setCountFn } = useCaptcha({
    initExecution: false,
  });
  const timeRef = useRef<any>();

  useEffect(() => {
    if (!token) {
      timeRef.current = setInterval(() => {
        getFakeCaptchaRun();
      }, 60000);
    } else {
      clearInterval(timeRef.current);
    }
  }, [token]);
  useEffect(() => {
    return () => {
      clearInterval(timeRef.current);
    };
  }, []);
  const setErrorInfo = (name: string, res: any, isCaptchen: boolean = true) => {
    formRef?.current?.setFields([
      {
        name,
        errors: [res?.msg],
      },
    ]);
    setErrorInfoData(res);
    if (isCaptchen) getFakeCaptchaRun();
  };

  const onSubmit = async () => {
    formRef?.current
      ?.validateFieldsReturnFormatValue?.()
      .then(async (values) => {
        try {
          // 登录
          systemLogin({ ...values })
            .then(async (res) => {
              if (res?.code > RESPONSECODE.SUCCESS) {
                message.error(res?.msg);
                getFakeCaptchaRun().then();
              } else {
                setLoginData(res.data);
                navigate("/admin/energymonitor");
              }
            })
            .catch((err) => {
              // console.log(err);
            });
        } catch (error) {
          const defaultLoginFailureMessage = "登录失败，请重试";
          message.error(defaultLoginFailureMessage);
          getFakeCaptchaRun().then();
        }
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.content}>
          <div className={styles.register}>
            <div className={styles.registerframe}>
              <h2>{LOGIN.TITLE}</h2>
              <h3>{LOGIN.SUBTITLE}</h3>
              <div className={styles.registerlayout}>
                <ProForm
                  // logo={<img alt="logo" src="/logo.svg" />}
                  // title="Ant Design"
                  // subTitle={'Ant Design 是西湖区最具影响力的 Web 设计规范'}
                  // onFinish={false}
                  className={styles.registerform}
                  formRef={formRef}
                  layout={"horizontal"}
                  labelCol={{ span: 6 }}
                  labelAlign={"left"}
                  colon={false}
                  isKeyPressSubmit
                  requiredMark={false}
                  onFinish={onSubmit}
                  submitter={false}
                >
                  {
                    <>
                      <ProFormText
                        name="username"
                        placeholder={LOGIN.ACCOUNT_PLACEHOLDER}
                        // label="账户"
                        fieldProps={{
                          // bordered: false,
                          prefix: (
                            <img
                              src="/home_img/user.png"
                              className={styles.prefixIcon}
                            />
                          ),
                        }}
                        rules={[
                          {
                            required: true,
                            message: LOGIN.ACCOUNT_PLACEHOLDER,
                          },
                          // {
                          //   pattern: /^1\d{10}$/,
                          //   message: LOGIN.ACCOUNT_ERROR,
                          // },
                        ]}
                      />

                      <ProFormText.Password
                        name="password"
                        placeholder={LOGIN.CODE_PLACEHOLDER}
                        // label="密码"
                        fieldProps={{
                          // bordered: false,
                          prefix: (
                            <img
                              src="/home_img/lock.png"
                              className={styles.prefixIcon}
                            />
                          ),
                        }}
                        rules={[
                          {
                            required: true,
                            message: LOGIN.CODE_PLACEHOLDER,
                          },
                        ]}
                      />
                      {/* <Button
                            type="text"
                            onClick={getPhonecaptchaFn}
                            disabled={count > 0}
                            className={classNames([
                              styles.captchabutton,
                              count > 0 ? styles.disabled : null,
                            ])}
                          >
                            {!count ? "发送验证码" : `${count}s后刷新`}
                          </Button> */}

                      <Row>
                        <Col span={12}>
                          <ProFormText
                            name="captcha"
                            placeholder={LOGIN.CAPACHA_PLACEHOLDER}
                            fieldProps={{
                              // bordered: false,
                              prefix: (
                                <img
                                  src="/home_img/security.png"
                                  className={styles.prefixIcon}
                                />
                              ),
                            }}
                            labelCol={{ span: 6 }}
                            rules={[
                              {
                                required: true,
                                message: LOGIN.CAPACHA_PLACEHOLDER,
                              },
                            ]}
                          />
                        </Col>

                        <Col span={12} className={styles.captcha}>
                          <div
                            className={styles.login_captcha}
                            onClick={getFakeCaptchaRun}
                          >
                            <img src={src} alt="" />
                          </div>
                        </Col>
                      </Row>
                    </>
                  }
                  <div className={styles.submit}>
                    <Button
                      type="primary"
                      // loading={loading}
                      className={classNames([styles.login_button])}
                      onClick={onSubmit}
                    >
                      {LOGIN.BUTTON}
                    </Button>
                  </div>
                </ProForm>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*<Footer />*/}
    </div>
  );
};

export default Register;
