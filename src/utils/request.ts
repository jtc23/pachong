/*
 *@description:
 * @author wayne
 * @date 2022-12-05 10:45
 */
import { message } from "antd";
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { values } from "lodash-es";
import { ResultCode, infoResultCode, notInterceptResultCode, CodeMessage, OUT_OF_LOGIN } from "./ResultCode";
import { useNavigate, Navigate } from "react-router-dom";
export type HttpRequestConfig = { timeout?: number }
//登录失效只触发一次
let LoginStatusFlag = false;

const InitialConfig = {
	// 默认地址请求地址
	baseURL: "/CarbonFootprint/gov",
	// 设置超时时间（10s）
	timeout: 10000,
	// 跨域时候允许携带凭证（cookie）
	withCredentials: true
};

class RequestHttp {
	service: AxiosInstance;
	constructor(config: AxiosRequestConfig) {
		//实例化axios
		this.service = axios.create(config);
		// const navigate = useNavigate();


		//请求前的拦截处理，添加store中的token
		this.service.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				//浏览器进度条显示
				// NProgress.start();
				//如果当前请求需要显示 loading,在api服务中通过指定的第三个参数: { headers: { showLoading: true } }来控制显示loading
				// if (config.headers?.showLoading) showFullScreenLoading();
				// config.headers['Accept'] = '*/*'
				//添加token
				// const token = store.getState().global.token;
				const tokenObj: any = {};
				// if (token) {
				// 	tokenObj["X-STAGE-USER-ACCESS-TOKEN"] = token;
				// }
				return { ...config, headers: { ...config.headers, ...tokenObj } };
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);
		const ResultCodes = new ResultCode();
		//请求结束后返回的拦截处理
		this.service.interceptors.response.use(
			async (response: AxiosResponse) => {
				const { config, data } = response;
				// console.log(response);

				//关闭浏览器进度条
				// NProgress.done();
				//关闭全局loading
				// tryHideFullScreenLoading();

				/**
				 *处理下载文件
				 */
				if (config?.responseType === "blob") {
					const code = data?.code;
					// console.log(code);

					if (data?.code) {
						const arr = [
							ResultCodes.FILE_UPLOAD_ERROR,
							ResultCodes.FILE_DOWNLOAD_ERROR,
							ResultCodes.FILE_NOT_EXISTS_ERROR,
							ResultCodes.SERVER_EXCEPTION_ERROR
						];
						if (arr.indexOf(code) > -1) {
							message.error(ResultCodes.codeListMsg.get(code));
						}
						return undefined;
					} else {
						return response;
					}
				}

				/**
				 * 处理登录状态
				 */
				const LoginStatusCode = [
					infoResultCode.USER_NOT_LOGIN,
					infoResultCode.USER_NOT_EXIST,
					infoResultCode.USER_NOT_BOUND_COMPANY
				];
				if (LoginStatusCode.indexOf(data?.code) > -1) {

				}

				// /**
				//  * 处理登录状态
				//  */
				// const LogOut = [
				// 	OUT_OF_LOGIN.USER_LOGOUT,
				// 	OUT_OF_LOGIN.USER_TOKEN_EXPIRE,
				// 	OUT_OF_LOGIN.USER_NOT_EXIST,
				// ];
				// if (LogOut.indexOf(data?.code) > -1) {
				// 	location.href="/login"
				// 	userStore.getState().logout();
				// }
				/**
				 * 如果code在不拦截对象里面并且code不为0，则弹出提示
				 */
				if (!values(notInterceptResultCode).includes(data?.code) && data?.code && data?.code !== ResultCodes.SUCCESS) {
					// message.error(data?.msg);
					return data;
				}
				return data;
			},
			(error: AxiosError) => {
				const { response } = error;
				// console.log("=======error:", response, error);
				//关闭浏览器进度条
				// NProgress.done();
				//关闭全局loading
				// tryHideFullScreenLoading();

				// 根据响应的错误状态码，做不同的处理
				if (response) {
					const { data, status }: any = response;
					if (data && !data?.code) {
						// message.error(data?.msg);
					} else {
						const errorText = CodeMessage[status] || response.statusText;
						// message.error(errorText);
					}
				} else {
					// 请求超时单独判断，请求超时没有 response
					if (error.message.indexOf("timeout") !== -1) {
						message.error("请求超时，请稍后再试");
					}
				}
				return Promise.reject(error);
			}
		);
	}

	//get请求封装
	get(url: string, params?: object, _config: HttpRequestConfig = {}) {
		return this.service.get(url, { params, ..._config });
	}

	//post请求封装
	post(url: string, data?: object, _config: HttpRequestConfig = {}) {
		return this.service.post(url, data, { ..._config });
	}

	//delete请求封装
	delete(url: string, params?: object, _config: HttpRequestConfig = {}) {
		return this.service.delete(url, { params, ..._config });
	}
}
export const getRequestApi = (baseUrl: string) => new RequestHttp({ ...InitialConfig, baseURL: baseUrl });
/**
 * 下载服务器返回的二进制数据流文件
 * @param blobData
 * @param fileName
 */
export function downloadFile(blobData, fileName) {
	let url = URL.createObjectURL(blobData);
	let a = document.createElement('a');
	a.href = url;
	a.download = fileName;
	a.click();
}
/**
 * 从标准response返回数据下载文件
 * @param response
 */
export function downloadFileFromResponse(response) {
	// 从header中获取服务端命名的文件名，服务端需要把文件名通过URLEncoder.encode转码，防止乱码，然后前端获取时解码
	const fileName = response?.headers?.filename ? decodeURIComponent(response.headers.filename) : 'exports.xls';
	downloadFile(new Blob([response.data]), fileName);
}

export default new RequestHttp(InitialConfig);
