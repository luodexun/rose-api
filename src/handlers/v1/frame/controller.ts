import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import { addDomain } from "../../../utils/image";
export class FrameController {
    public async frameOut(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.frameOut(request);
            return h.response({results:  addDomain(data), totalCount: sum.count});
        } catch (err) {
            console.log(err);
            return Boom.badImplementation('terrible implementation');
        }
    }

    public async frameInner(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.frameInner(request);
            return h.response({results:  addDomain(data), totalCount: sum.count});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }

    public async frameCate(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.frameCate(request);
            return h.response({results: data, totalCount: sum.count});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }
}
