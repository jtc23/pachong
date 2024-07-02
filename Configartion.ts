/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-05-27 15:26:44
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-05-27 18:34:24
 * @FilePath: \Project_AoGangLian-Web\Configartion.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const getBasePath = (path: string) => {
    // TODO: 临时处理，后续需要修改

   
    if (import.meta.env?.MODE) {
        return `${import.meta.env.MODE=="suzhou" ? '/companyPolicy' : ''}${path}`
    }
    return "/"
};
