import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
export class PaperboardController {
    public async paperboardOut(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.paperboardOutV2(request);
            return h.response({results: data, totalCount: sum.count});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }

    public async paperboardInner(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.paperboardInnerV2(request);
            return h.response({results: data, totalCount: sum.count});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }

    public async paperboardCate(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let { data, sum} = await request.server.methods.paperboardCateV2(request);
            return h.response({results: data, totalCount: sum.count});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }
}
