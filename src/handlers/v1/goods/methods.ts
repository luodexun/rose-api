
import { ServerCache } from "../../../services";
import { paginateServer, sql } from "../../../utils"
// import  mssql from "mssql";

const goodsCate = async request => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query(`select id,name from cs_goods_cate limit ${(page-1)*limit},${limit};`);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_goods_cate');
    return { data, sum}
};

const goods = async request => {
    const pool = request.mysql.pool;
    let {limit, page, scene_cate, production_cate} = request.query;
    let [data] = await pool.query(`select id,title,main_img,price,sale from cs_goods ${await sql.where({scene_cate,production_cate})} limit ?,?;`,[(page-1)*limit,limit]);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_goods');
    return { data, sum}
};

const details = async request => {
    const pool = request.mysql.pool;
    let { id } = request.payload;
    let [data] = await pool.query('select id,title,main_img,price,link,images,description from cs_goods where id = ?;',[id]);
    return { data }
};

export const registerMethods = server => {
    ServerCache.make(server)
        .method("goodsCate", goodsCate, 6, request => ({
        ...paginateServer(request)
    }))
        .method("goods", goods, 6, request => ({
            ...paginateServer(request)
        })).method("details", details, 6, request => ({
        ...paginateServer(request)
        }));
};
