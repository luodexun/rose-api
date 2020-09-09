
import { ServerCache } from "../../../services";
import { paginateServer } from "../../../utils"
import Hapi from "@hapi/hapi";
import {addDomain} from "../../../utils/image";
const scene = async request => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query(`select id,cate,show_img,select_img from cs_scene limit ${(page-1)*limit},${limit};`);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_background');
    return { data, sum}
};

const sceneCate = async request => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query(`select id,name,icon from cs_scene_cate limit ${(page-1)*limit},${limit};`);
    data = addDomain(data,["icon"]);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_background_cate');
    return { data, sum}
};

const sceneMine = async (request: Hapi.Request|any, uid:number) => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query('select id,cate,show_img,select_img from cs_scene_uid where uid = ? limit ?,?;',[uid,(page-1)*limit,limit]);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_scene_uid where uid = ?',[uid]);
    return { data, sum}
};

export const registerMethods = server => {
    ServerCache.make(server)
        .method("scene", scene, 6, request => ({
            ...paginateServer(request)
        })).method("sceneCate", sceneCate, 6, request => ({
        ...paginateServer(request)
    })).method("sceneMine", sceneMine, 6, request => ({
        ...paginateServer(request),
        uid:request.yar.get('member').id
    }));
};
