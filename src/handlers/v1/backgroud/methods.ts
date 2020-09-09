
import { ServerCache } from "../../../services";
import { paginateServer } from "../../../utils"
import Hapi from "@hapi/hapi";

const background = async request => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query(`select id,cate,show_img,select_img from cs_background limit ${(page-1)*limit},${limit};`);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_background');
    return { data, sum}
};

const backgroundCate = async request => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query(`select id,name from cs_background_cate limit ${(page-1)*limit},${limit};`);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_background_cate');
    return { data, sum}
};

const backgroundMine = async (request: Hapi.Request|any, uid:number) => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query('select id,cate,show_img,select_img from cs_background_uid where uid = ? limit ?,?;',[uid,(page-1)*limit,limit]);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_background_uid where uid = ?',[uid]);
    return { data, sum}
};

export const registerMethods = server => {
    ServerCache.make(server)
        .method("background", background, 6, request => ({
            ...paginateServer(request)
        })).method("backgroundCate", backgroundCate, 6, request => ({
        ...paginateServer(request)
    })).method("backgroundMine", backgroundMine, 6, request => ({
        ...paginateServer(request),
        uid:request.yar.get('member').id
    }));
};
