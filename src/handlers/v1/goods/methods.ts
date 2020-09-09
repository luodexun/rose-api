
import { ServerCache } from "../../../services";
import { paginateServer, sql } from "../../../utils"
// import  mssql from "mssql";


const goods = async request => {
    const pool = request.mysql.pool;
    let {limit, page, scene_cate, production_cate} = request.query;
    console.log(await sql.where({scene_cate,production_cate}));
    let [data] = await pool.query(`select id,title,picture,sale from cs_goods ${await sql.where({scene_cate,production_cate})} limit ?,?;`,[(page-1)*limit,limit]);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_goods');
    return { data, sum}
};

export const registerMethods = server => {
    ServerCache.make(server)
        .method("goods", goods, 6, request => ({
            ...paginateServer(request)
        }));
};
