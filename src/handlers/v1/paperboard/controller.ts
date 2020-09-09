import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import { addDomain } from "../../../utils/image";
export class PaperboardController {
    public async paperboardOut(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.paperboardOut(request);
            return h.response({results: addDomain(data), totalCount: sum.count});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }

    public async paperboardInner(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.paperboardInner(request);
            return h.response({results: addDomain(data), totalCount: sum.count});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }

    public async paperboardCate(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.paperboardCate(request);
            return h.response({results: data, totalCount: sum.count});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }
}
