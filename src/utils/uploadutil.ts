/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2023-09-13 10:36:16
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2023-09-13 14:42:50
 * @FilePath: \caculator\src\utils\uploadutil.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 根据接口返回的文件数据组装一个上传组件需要的文件数据
 * @param respObj 上传成功返回类型，格式：{id:"xxx", name:"xxx", type:"pdf", url:"xxx" }
 * @param uploadedObj 上传组件需要的文件数据，如果该值为空则创建一个新的
 * @returns {{}}
 */
import { getFiles, getFilesList, getdownLoadUrlNew } from "@/services/apiUpload";

/**
 * 根据文件后缀名获取对应的文件图片
 * @param {*} fileExt 后缀名
 */
export function getFileImageByFileExt(fileExt, respObj) {
    !fileExt && (fileExt = "");
    switch (fileExt.toLowerCase()) {
        case "doc":
        case "docx":
            return "./fileImage/doc.png";
        case "xls":
        case "xlsx":
            return "./fileImage/xls.png";
        case "ppt":
            return "./fileImage/ppt.png";
        case "pdf":
            return "./fileImage/pdf.png";
        case "zip":
            return "./fileImage/zip.png";
        case "png":
        case "jpg":
        case "jpeg":
            return getdownLoadUrlNew(respObj?.id);
    }
    return "/fileImage/else.png";
}

export function makeupUploadedObjByResponseObj(respObj, uploadedObj = null) {
    const obj = uploadedObj ?? { uid: respObj.id };
    obj.id = respObj.id;
    obj.name = respObj.title;
    obj.url = getdownLoadUrlNew(respObj.id);
    obj.type = respObj.type;
    obj.thumbUrl = getFileImageByFileExt(respObj.type, respObj);
    obj.status = "done";
    obj.made = 1; // 是否是组装好的数据
    obj.percent = 100; // 默认进度
    obj.size = 1; //默认size
    return obj;
}
/**
 * 根据接口返回的文件数据组装一个上传组件需要的文件数据 @有水印
 * @param respObj 上传成功返回类型，格式：{id:"xxx", name:"xxx", type:"pdf", url:"xxx" }
 * @param uploadedObj 上传组件需要的文件数据，如果该值为空则创建一个新的
 * @returns {{}}
 */
export function makeupUploadedObjByResponseObjNewWithWater(respObj, uploadedObj = null) {
    const obj = uploadedObj ?? { uid: respObj.id };
    obj.id = respObj.id;
    obj.name = respObj.title;
    obj.url = getdownLoadUrlNew(respObj.id);
    obj.type = respObj.type;
    obj.thumbUrl = getFileImageByFileExt(respObj.type, respObj);
    obj.status = "done";
    obj.made = 1; // 是否是组装好的数据
    obj.percent = 100; // 默认进度
    obj.size = 1; //默认size
    return obj;
}
