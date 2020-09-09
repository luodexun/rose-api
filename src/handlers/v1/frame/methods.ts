
import { ServerCache } from "../../../services";
import { paginateServer } from "../../../utils"

const frameOut = async request => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query(`select id,cate,show_img,select_img from cs_frame_outside  order by sort desc limit ${(page-1)*limit},${limit};`);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_frame_outside');
    return { data, sum}
};
const frameInner = async request => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query(`select id,cate,show_img,select_img from cs_frame_inner limit ${(page-1)*limit},${limit};`);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_frame_inner');
    return { data, sum}
};

const frameCate = async request => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query(`select id,name from cs_frame_cate limit ${(page-1)*limit},${limit};`);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_frame_cate');
    return { data, sum}
};

export const registerMethods = server => {
    ServerCache.make(server)
        .method("frameOut", frameOut, 6, request => ({
            ...paginateServer(request)
        })).method("frameInner", frameInner, 6, request => ({
        ...paginateServer(request)
    })).method("frameCate", frameCate, 6, request => ({
        ...paginateServer(request)
    }));
};
