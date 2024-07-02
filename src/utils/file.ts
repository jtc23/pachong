/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2023-08-14 13:41:16
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2023-09-13 14:50:40
 * @FilePath: \caculator\src\utils\file.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import api from "@/utils/request";
import Cookies from "js-cookie";
/**
 * 下载服务器返回的二进制数据流文件
 * @param blobData
 * @param fileName
 */
export function downloadFile(blobData, fileName) {
    let url = URL.createObjectURL(blobData);
    let a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
}
/**
 * 从标准response返回数据下载文件
 * @param response
 */
export function downloadFileFromResponse(response,name) {
    if (response?.data) {
        // 从header中获取服务端命名的文件名，服务端需要把文件名通过URLEncoder.encode转码，防止乱码，然后前端获取时解码
        let headers = response?.response?.headers;
        let fileName = "";
        if (headers?.get("filename")) {
            fileName = decodeURIComponent(decodeURIComponent(headers?.get("filename").replace(/\+/g, "%20")))
        }

        // 从content-disposition中获取文件名称
        if (headers?.get("content-disposition")) {
            let contentDisposition = headers?.get("content-disposition");
            let contentDispositionObj = {};
            contentDisposition.split(";").forEach(item => {
                let arr = item.split("=");
                contentDispositionObj[arr?.[0]?.trim()] = arr?.[1] ?? undefined;
            })
            if (contentDispositionObj?.filename) {
                fileName = decodeURIComponent(decodeURIComponent(contentDispositionObj?.filename.replace(/\+/g, "%20")))
            }
        }
        if (!headers?.get("content-disposition") && !headers?.get("filename")) {
            // 如果没有获取到文件名，则使用export.xls作为文件名
            fileName = "exports.xls";
        }
        if(name){
            fileName = name;
        }

        downloadFile(new Blob([response.data]), fileName);
    }
}

/**
 * 获取cookie中的值
 * @param key
 */
export function getCookies(key: string) {
    return Cookies.get(key);
}

/**
 * 获取文件信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export async function getFiles(params) {
    return await api.get("/api/file/get", params);
}
/**
 * 文件查看，返回查看的文件的在线服务链接
 * @param params
 * @returns {AxiosPromise<any>}
 */
export async function fileView(action, params) {
    const Access_Token = getCookies("Authorization");
    let fileUrl = "http://124.71.238.103:16322";
    // if (process.env.NODE_ENV === "production") {
    //     fileUrl = window.location?.origin;
    // }
    const base_file_url = `${fileUrl}/api/c/high/quality/submit/export/word?id=${params?.fileId}&Authorization=${Access_Token}&fullfilename=${params?.fullfilename}`;
   // console.log(params);
    
    //const base_file_url = `${fileUrl}/api/file/download?fileId=${params?.fileId}&Authorization=${Access_Token}&fullfilename=${params?.fullfilename}`;
    // console.log(base_file_url);
    const encodeUrl_file = encodeURIComponent(encode(base_file_url));
//console.log(encodeUrl_file);
    

    const resolveUrl = `http://121.36.55.179:14020/onlinePreview?url=${encodeUrl_file}`;

    return Promise.resolve(resolveUrl);
}
export const onlineReviewFile = (id: string|number) => {

        if (id) {
            // console.log(id);
            
            fileView(null, {
                fileId: id,
                fullfilename: `高质量指标报告${new Date().getTime()}.docx`,
            }).then((result: any) => {
                if (result) {
                    window.open(result);
                }
            });
           
        }
    
};