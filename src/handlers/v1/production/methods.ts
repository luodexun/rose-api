
import { ServerCache } from "../../../services";
import { paginateServer } from "../../../utils"
import Hapi from "@hapi/hapi";
// import  mssql from "mssql";

const productionCate = async request => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query(`select id,name from cs_production_cate limit ${(page-1)*limit},${limit};`);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_production_cate');
    return { data, sum}
};
const productionMine = async (request: Hapi.Request|any, uid:number)=> {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query('select `id`,`frame_out_id`,`frame_out_ratio`,`frame_inner_id`,`frame_inner_ratio`,`paperboard_out_id`,`paperboard_out_ratio`,`paperboard_inner_id`,`paperboard_inner_ratio`,`background_id`,`scene_id`,`scene_origin_x`,`scene_origin_y`,`beginning_img`,`ending_img` from cs_production_uid where uid = ? limit ?,?;',[uid,(page-1)*limit,limit]);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_production_uid where uid = ?',[uid]);
    return { data, sum}
};

const productionRecommendation = async (request: Hapi.Request|any)=> {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query('select `id`,`scene_cate`,`production_cate`,`beginning_img`,`ending_img`,`link` from cs_production_recommendation  limit ?,?;',[(page-1)*limit,limit]);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_production_recommendation');
    return { data, sum}
};

export const registerMethods = server => {
    ServerCache.make(server)
        .method("productionMine", productionMine, 6, request => ({
            ...paginateServer(request)
        })).method("productionCate", productionCate, 6, request => ({
        ...paginateServer(request)
       })).method("productionRecommendation", productionRecommendation, 6, request => ({
        ...paginateServer(request)
    }));
};
