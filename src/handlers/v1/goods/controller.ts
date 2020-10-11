import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import {addDomain} from "../../../utils/image";
export class GoodsController {

    public async goodsCate(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.goodsCate(request);
            return h.response({results: data, totalCount: sum.count});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }

    public async goods(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.goods(request);
            return h.response({results: addDomain(data,["main_img"]), totalCount: sum.count});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }
    public async details(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data} = await request.server.methods.details(request);
            return h.response({code:1000, msg:'登录成功',data})
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }

}
