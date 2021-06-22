import * as _ from "lodash"
export const addDomain = <T>(data:T,keys: string[] = ['show_img','select_img']):T => {
    let domain = process.env.IMAGEDOMAIN || 'http://zhuangbiaoimg.haipaitv.cn'
    if (_.isArray(data)){
        for (let [key, item] of Object.entries(data)) {
            for (let value of  keys) {
                data[key][value] = `${domain}${item[value]}`;
            }
        }
    }else {
        for (let value of  keys) {
            data[value] = `${domain}${data[value]}`;
        }
    }

    return data
};
