import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
export class FrameController {
    public async frameOut(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.frameOutV2(request);
            return h.response({results:  data, totalCount: sum.count});
        } catch (err) {
            console.log(err);
            return Boom.badImplementation('terrible implementation');
        }
    }

    public async frameInner(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.frameInnerV2(request);
            return h.response({results:  data, totalCount: sum.count});
        } catch (err) {
            console.log(err)
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
