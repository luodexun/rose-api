
import { ServerCache } from "../../../services";
import { paginateServer } from "../../../utils"

const paperboardOut = async request => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query(`select id,cate,show_img,select_img from cs_paperboard_inner limit ${(page-1)*limit},${limit};`);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_paperboard_inner');
    return { data, sum}
};
const paperboardInner = async request => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query(`select id,cate,show_img,select_img from cs_paperboard_outside limit ${(page-1)*limit},${limit};`);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_paperboard_outside');
    return { data, sum}
};

const paperboardCate = async request => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query(`select id,name from cs_paperboard_cate limit ${(page-1)*limit},${limit};`);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_paperboard_cate');
    return { data, sum}
};

export const registerMethods = server => {
    ServerCache.make(server)
        .method("paperboardOut", paperboardOut, 6, request => ({
            ...paginateServer(request)
        })).method("paperboardInner", paperboardInner, 6, request => ({
        ...paginateServer(request)
    })).method("paperboardCate", paperboardCate, 6, request => ({
        ...paginateServer(request)
    }));
};
