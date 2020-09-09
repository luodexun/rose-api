import Hapi from "@hapi/hapi";
import { FrameController } from "./controller";
import * as Schema from "./schema";
export const registerRoutes = (server: Hapi.Server): void => {
    const controller = new FrameController();
    server.bind(controller);

    server.route({
        method: "GET",
        path: "/v1/frameOut",
        handler: controller.frameOut,
        options: {
            validate: Schema.paginationDefine,
        },
    });

    server.route({
        method: "GET",
        path: "/v1/frameInner",
        handler: controller.frameInner,
        options: {
            validate: Schema.paginationDefine,
        },
    });

    server.route({
        method: "GET",
        path: "/v1/frameCate",
        handler: controller.frameCate,
        options: {
            validate: Schema.paginationDefine,
        },
    });
};
