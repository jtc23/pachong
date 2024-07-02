/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-08-23 16:05:11
 * @LastEditTime: 2024-03-07 09:35:31
 */
import { getFakeCaptcha } from "@/service/global";
import { log } from "console";
import { useEffect, useState } from "react";

type useGetFakeCaptchaProps = {
    manual?: boolean;
};

const useGetFakeCaptcha = (options: useGetFakeCaptchaProps) => {
    const [src, setSrc] = useState<string>();
    const [captchaToken, setCaptchaToken] = useState<string>();
    const { manual } = options;

    const run = () => {
        return getFakeCaptcha()
            .then(res => {
                // 图片地址
                // console.log(res)
                const imgUrl = URL.createObjectURL(res?.data);
  
                // 图片token
                const captchaTokens = res?.response?.headers.get("captcha-token");

                setSrc(imgUrl);
                setCaptchaToken(captchaTokens);
            })
            .catch(e => {
                setSrc("");
                setCaptchaToken("");
            });
    };

    useEffect(() => {
        if (!manual) {
            run().then();
        }
    }, []);

    return {
        src,
        captchaToken,
        run,
    };
};
export default useGetFakeCaptcha;
