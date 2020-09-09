
import { ServerCache } from "../../../services";
import { paginateServer } from "../../../utils"
import {addDomain} from "../../../utils/image";
import { cateType } from "../../../interface/cateType"
import * as _ from "lodash";
const paperboardOut = async request => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [cate]:[[cateType]] = await pool.query(`select id,name from cs_paperboard_cate order by sort desc limit ${(page-1)*limit},${limit};`);

    for (let [index,item] of Object.entries(cate)) {
        let [data] = await pool.query(`select id,cate,show_img,select_img from cs_paperboard_inner where cate=${item.id} order by sort desc;`);
        cate[index].list = addDomain(data)
    }
    _.remove(cate ,(item:any) =>{
        return _.isEmpty(item.list)
    });
    return { data:cate, sum:cate.length }
};

const paperboardInner = async request => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [cate]:[[cateType]] = await pool.query(`select id,name from cs_paperboard_cate order by sort desc limit ${(page-1)*limit},${limit};`);

    for (let [index,item] of Object.entries(cate)) {
        let [data] = await pool.query(`select id,cate,show_img,select_img from cs_paperboard_outside where cate=${item.id} order by sort desc;`);
        cate[index].list = addDomain(data)
    }
    _.remove(cate ,(item:any) =>{
        return _.isEmpty(item.list)
    });
    return { data:cate, sum:cate.length }
};

const paperboardCate = async request => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query(`select id,name from cs_paperboard_cate order by sort desc limit ${(page-1)*limit},${limit};`);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_paperboard_cate;');
    return { data, sum}
};

export const registerMethods = server => {
    ServerCache.make(server)
        .method("paperboardOutV2", paperboardOut, 60, request => ({
            ...paginateServer(request)
        })).method("paperboardInnerV2", paperboardInner, 60, request => ({
        ...paginateServer(request)
    })).method("paperboardCateV2", paperboardCate, 60, request => ({
        ...paginateServer(request)
    }));
};
