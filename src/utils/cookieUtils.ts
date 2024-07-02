import Cookie from 'js-cookie';

/**
 * cookies工具类
 */
class CookieUtils {
    public cookie;

    constructor() {
        this.cookie = Cookie;
    }

    /**
     * 在cookie中添加值
     * @param key
     * @param token
     */
    setCookies(key: string, token: string) {
        this.cookie.set(key, token);
    }

    /**
     * 获取cookie中的值
     * @param key
     */
    getCookies(key: string) {
        return this.cookie.get(key);
    }

    /**
     * 删除cookie中的值
     * @param key
     */
    removeCookies(key: string) {
        this.cookie.remove(key);
    }

    /**
     * JOSN化cookie中的值
     */
    getJSONCookies(key: string) {
        return this.cookie.getJSON(key);
    }
}

export default new CookieUtils();
