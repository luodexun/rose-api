import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import  {BaseController} from "../../baseController";
import { addDomain } from "../../../utils/image";
export class BackgroundController extends BaseController{

    public async list(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.background(request);
            return h.response({results: addDomain(data), totalCount: sum.count});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }

    public async backgroundCate(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.backgroundCate(request);
            return h.response({results: data, totalCount: sum.count});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }

    public async backgroundMine(request: Hapi.Request|any, h: Hapi.ResponseToolkit){
        if(!this.isLogin(request)){
            return h.response({code:2004,msg:"未登录!!"});
        }
        try {
            let { data, sum} = await request.server.methods.backgroundMine(request,this.memberInformation.id);
            return h.response({results: addDomain(data), totalCount: sum.count});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }

    public async mine(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        if(!this.isLogin(request)){
            return h.response({code:2004,msg:"未登录!!"});
        }
        try {
            const pool = request.mysql.pool;
             await pool.query('INSERT INTO cs_background_uid (uid,name,cate,show_img,select_img,create_time) VALUES (?,?,?,?,?,?)',[this.memberInformation.id,request.payload.name,request.payload.cate,request.payload.show_img,request.payload.select_img,Date.now().toString().substr(0,10)]);
            return h.response({code:1000,msg:"上传成功"});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }
}
