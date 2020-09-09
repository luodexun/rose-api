import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import  {BaseController} from "../../baseController";
export class BackgroundController extends BaseController{

    public async list(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.backgroundV2(request);
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
            let { data, sum} = await request.server.methods.backgroundMineV2(request,this.memberInformation.id);
            return h.response({results: data, totalCount: sum.count});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }

}
