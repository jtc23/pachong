/*
 * @Author: dingmeng
 * @Date: 2020-09-02 09:56:54
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2023-07-27 10:14:24
 * @FilePath: \ase\index.jsx
 * @name:
 */
import CryptoJS  from "crypto-js";

const key = "abcdefgabcdefg12"; //密钥
const iv = "abcdefgabcdefg12"; //密钥偏向量

/**
 * 加密方法
 * @param data
 * @param key
 * @param iv
 * @returns {string}
 */
function getAesString(data, key, iv) {
    //加密
    var key = CryptoJS.enc.Utf8.parse(key);
    var iv = CryptoJS.enc.Utf8.parse(iv);
    var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString(); //返回的是base64格式的密文
}

/**
 * 解密方法
 * @param encrypted
 * @param key
 * @param iv
 * @returns {string}
 */
function getDAesString(encrypted, key, iv) {
    var key = CryptoJS.enc.Utf8.parse(key);
    var iv = CryptoJS.enc.Utf8.parse(iv);
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8); //
}

/**
 * 加密
 * @param data
 * @returns {string}
 */
export function getAES(data) {
    return getAesString(data, key, iv); //密文
}

/**
 * 解密
 * @param encrypted
 * @returns {string}
 */
export function getDAes(encrypted) {
    return getDAesString(encrypted, key, iv);
}
