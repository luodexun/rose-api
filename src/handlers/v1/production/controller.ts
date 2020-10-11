import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import  {BaseController} from "../../baseController";
import {addDomain} from "../../../utils/image";
export class ProductionController extends BaseController{
    public async productionCate(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.productionCate(request);
            return h.response({results: data, totalCount: sum.count});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }
    public async productionMine(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        if (!this.isLogin(request)) {
            return h.response({code: 2004, msg: "未登录!!"});
        }
        try {
            let {data, sum} = await request.server.methods.productionMine(request, this.memberInformation.id);
            return h.response({results:  addDomain(data,['beginning_img','ending_img']), totalCount: sum.count});
        } catch (err) {
            return Boom.badImplementation(err.messages);
        }
    }

    public async productionRecommendation(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let {data, sum} = await request.server.methods.productionRecommendation(request);
            return h.response({results:  addDomain(data,['beginning_img','ending_img']), totalCount: sum.count});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }

    public async productionMineCustom(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        if(!this.isLogin(request)){
            return h.response({code:2004,msg:"未登录!!"});
        }
        console.log(request.payload);
        try {
            const pool = request.mysql.pool;
            await pool.query('INSERT INTO cs_production_uid (uid,frame_out_id,frame_out_ratio,frame_inner_id,frame_inner_ratio,paperboard_out_id,paperboard_out_ratio,paperboard_inner_id,paperboard_inner_ratio,background_id,scene_id,scene_origin_x,scene_origin_y,beginning_img,ending_img,create_time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[this.memberInformation.id,request.payload.frame_out_id,request.payload.frame_out_ratio,request.payload.frame_inner_id,request.payload.frame_inner_ratio,request.payload.paperboard_out_id,request.payload.paperboard_out_ratio,request.payload.paperboard_inner_id,request.payload.paperboard_inner_ratio,request.payload.background_id,request.payload.scene_id,request.payload.scene_origin_x,request.payload.scene_origin_y,request.payload.beginning_img,request.payload.ending_img,Date.now().toString().substr(0,10)]);
            return h.response({code:1000,msg:"上传成功"});
        } catch (err) {
            console.log(err,err.message);
            return Boom.badImplementation('terrible implementation');
        }
    }
}
