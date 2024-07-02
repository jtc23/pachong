/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-08-23 16:05:11
 * @LastEditTime: 2023-12-14 15:18:04
 */
import { getdownLoadUrl } from "@/services/apiUpload";
import { useEffect, useState } from "react";

type useGetFakeCaptchaProps = {
    id?: string;
    type?: string;
    withwater?: boolean;
};

const useGetImgSrc = (options: useGetFakeCaptchaProps) => {
    const { id, type, withwater = false } = options;
    const [src, setSrc] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    // const [captchaToken, setCaptchaToken] = useState<string>();

    const run = () => {
 
            return getdownLoadUrl(id)
                .then(res => {
                    // console.log(type);

                    // 图片地址
                    if (type && type === "svg") {
                        let blob = new Blob([res?.data], { type: "image/svg+xml" });
                        setSrc(URL.createObjectURL(blob));
                    } else if (res?.data) {
                        const imgUrl = URL.createObjectURL(res?.data);
                        setSrc(imgUrl);
                    }
                })
                .catch(e => {
                    setSrc("");
                    throw e;
                });
        
    };

    useEffect(() => {
        if (id) {
            run().then(() => {
                setLoading(false);
            });
        }
    }, [id]);

    return {
        src,
        loading,
        run,
    };
};
export default useGetImgSrc;
