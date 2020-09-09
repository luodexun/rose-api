import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import {addDomain} from "../../../utils/image";
export class GoodsController {
    public async goods(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.goods(request);
            return h.response({results: addDomain(data,["picture"]), totalCount: sum.count});
        } catch (err) {
            console.log(err);
            return Boom.badImplementation('terrible implementation');
        }
    }
}
