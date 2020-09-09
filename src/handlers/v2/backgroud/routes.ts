import Hapi from "@hapi/hapi";
import { BackgroundController } from "./controller";
import * as Schema from "./schema";
export const registerRoutes = (server: Hapi.Server): void => {
    const controller = new BackgroundController();
    server.bind(controller);

    server.route({
        method: "GET",
        path: "/v2/background",
        handler: controller.list,
        options: {
            validate: Schema.paginationDefine,
        },
    });

    server.route({
        method: "GET",
        path: "/v2/backgroundMine",
        handler: controller.backgroundMine,
        options: {
            validate: Schema.paginationDefine,
        },
    });
};
