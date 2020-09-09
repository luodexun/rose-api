
import { ServerCache } from "../../../services";
import { paginateServer } from "../../../utils"
import Hapi from "@hapi/hapi";
import {cateType} from "../../../interface/cateType";
import {addDomain} from "../../../utils/image";
import * as _ from "lodash";

const scene = async request => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [cate]:[[cateType]] = await pool.query(`select id,name from cs_scene_cate order by sort desc limit ${(page-1)*limit},${limit};`);

    for (let [index,item] of Object.entries(cate)) {
        let [data] = await pool.query(`select id,cate,show_img,select_img from cs_scene where cate=${item.id} order by sort desc;`);
        cate[index].list = addDomain(data)
    }

    let [[ sum ]] = await pool.query('select count(*) as count from cs_scene_cate;');
    return { data:cate, sum }
};


const sceneMine = async (request: Hapi.Request|any, uid:number) => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [cate]:[[cateType]] = await pool.query(`select id,name from cs_scene_cate order by sort desc limit ${(page-1)*limit},${limit};`);
    for (let [index,item] of Object.entries(cate)) {
        let [data] = await pool.query(`select id,cate,show_img,select_img from cs_scene_uid where cate=${item.id} and uid = ${uid} order by sort desc;`);
        cate[index].list = addDomain(data)
    }
    _.remove(cate ,(item:any) =>{
        return _.isEmpty(item.list)
    });
    return { data:cate, sum:cate.length }
};

export const registerMethods = server => {
    ServerCache.make(server)
        .method("sceneV2", scene, 6, request => ({
            ...paginateServer(request)
        })).method("sceneMineV2", sceneMine, 6, request => ({
        ...paginateServer(request),
        uid:request.yar.get('member').id
    }));
};
