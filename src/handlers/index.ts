import Hapi from "@hapi/hapi";
import * as Information from "./v1/information";
import * as Background from "./v1/backgroud";
import * as Paperboard from "./v1/paperboard";
import * as Frame from "./v1/frame";
import * as Scene from "./v1/scene";
import * as Member from "./v1/member";
import * as Production from "./v1/production";
import * as Goods from "./v1/goods";
/**
 * v2
 */
import * as FrameV2 from "./v2/frame";
import * as PaperboardV2 from "./v2/paperboard";
import * as SceneV2 from  "./v2/scene";
import * as BackgroundV2 from "./v2/backgroud";
export = {
    async register(server: Hapi.Server): Promise<void> {
        const modules = [Information, Background, Paperboard, Frame, Scene, Member, Production, Goods, FrameV2, PaperboardV2, SceneV2, BackgroundV2];

        for (const module of modules) {

           module.register(server);

        }

    },
    name: "Public API",
    version: "2.0.0",
};
