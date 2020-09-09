import Hapi from "@hapi/hapi";
import { PaperboardController } from "./controller";
import * as Schema from "./schema";
export const registerRoutes = (server: Hapi.Server): void => {
    const controller = new PaperboardController();
    server.bind(controller);

    server.route({
        method: "GET",
        path: "/v1/paperboardOut",
        handler: controller.paperboardOut,
        options: {
            validate: Schema.paginationDefine,
        },
    });

    server.route({
        method: "GET",
        path: "/v1/paperboardInner",
        handler: controller.paperboardInner,
        options: {
            validate: Schema.paginationDefine,
        },
    });

    server.route({
        method: "GET",
        path: "/v1/paperboardCate",
        handler: controller.paperboardCate,
        options: {
            validate: Schema.paginationDefine,
        },
    });
};
