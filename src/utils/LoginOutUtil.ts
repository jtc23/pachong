
import { WebSocketUrl } from "@/utils/constant";
import { userStore } from "@/store";
import { wanInfo } from "@/components/IntergralModal";
// import { setToken } from "@/store/modules/global";
// import { localGet } from "@/utils/utils";
// import { LOGIN_PLATFORM } from "../enums";

class LoginOutUtils {
	timer: null|any;

	//一个账号只能一处登录
	handleOnlyLoginOnePlace(token: string) {
        // console.log(token);
        
		const _this = this;

		const websocket = new WebSocket(`${WebSocketUrl}/${token}/1`);
		//连接成功建立的回调方法
		websocket.onopen = function () {
			console.log("==========WebSocket连接成功");
		};
		//接收到消息的回调方法
		websocket.onmessage = function (e) {
			console.log("==========wb接受消息",e);
			if (e?.data === "404" && userStore.getState().token) {
				_this.handelAddBrowserListener();
				wanInfo.show({
                    contentObj: {
                        title: "下线通知",
                        text: `您的账号在其他设备登录，请误将账号借给其他人使用。`,
                        ok: "确定",
                    },
					
                    canelButton: false,
                    onOk: (close: () => void) => {
                        location.href = `/login`;
                        userStore.getState().logout();
                        _this.handelRemoveBrowserListener();
                        close();
                    },
				});
			}
		};
		//连接关闭的回调方法
		websocket.onclose = function (e) {
			console.log("==========WebSocket连接关闭", e);
		};
	}

	//监听浏览器刷新清空token
	handelAddBrowserListener() {
		const callback = () => {
			userStore.getState().logout();
			this.handelRemoveBrowserListener();
		};
		window.addEventListener("beforeunload", callback);
		window.addEventListener("unload", callback);
	}

	//移除
	handelRemoveBrowserListener() {
		window.removeEventListener("beforeunload", () => {});
		window.removeEventListener("unload", () => {});
	}

	//长时间不操作自动退出登录-添加监听
	handleLongTimeNoOperateAddListener() {
        // console.log(Date.now());
        
		sessionStorage.setItem("lastClickTime", `${Date.now()}`);
	
		window.addEventListener("click", () => sessionStorage.setItem("lastClickTime", `${Date.now()}`));

		this.timer && clearInterval(this.timer);
		this.timer = setInterval(() => {
			const lastClickTime = sessionStorage.getItem("lastClickTime") * 1; // 把上次点击时候的字符串时间转换成数字时间
			const nowTime = Date.now(); // 获取当前时间
			if (nowTime - lastClickTime > 60 * 60 * 1000) {
				this.handelAddBrowserListener();
                wanInfo.show({
                    contentObj: {
                        title: "温馨提示",
                        text: `长时间未操作，系统已自动退出。`,
                        ok: "确定",
                    },
					
                    canelButton: false,
                    onOk: (close: () => void) => {
                        location.href = `/login`;
                        userStore.getState().logout();
                        this.handleLongTimeNoOperateRemoveListener();
                        this.handelRemoveBrowserListener();
                        close();
                    },
				});
			}
		}, 1000 * 60);
	}
	//长时间不操作自动退出登录-移除监听
	handleLongTimeNoOperateRemoveListener() {
		window.removeEventListener("click", () => {});
		this.timer && clearInterval(this.timer);
	}
}

export default new LoginOutUtils();
