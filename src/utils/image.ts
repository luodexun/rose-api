import * as _ from "lodash"
export const addDomain = <T>(data:T,keys: string[] = ['show_img','select_img']):T => {
    if (_.isArray(data)){
        for (let [key, item] of Object.entries(data)) {
            for (let value of  keys) {
                data[key][value] = `http://zhuangbiaoimg.haipaitv.cn${item[value]}`;
            }
        }
    }else {
        for (let value of  keys) {
            console.log(keys);
            data[value] = `http://zhuangbiaoimg.haipaitv.cn${data[value]}`;
        }
    }

    return data
};