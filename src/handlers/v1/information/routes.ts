import Hapi from "@hapi/hapi";
import { BlockchainController } from "./controller";
import * as Schema from "./schema";
export const registerRoutes = (server: Hapi.Server): void => {
    const controller = new BlockchainController();
    server.bind(controller);

    server.route({
        method: "GET",
        path: "/v1/information",
        handler: controller.index,
        options: {
            validate: Schema.paginationDefine,
        },
    });

    server.route({
        method: "POST",
        path: "/v1/search",
        handler: controller.search,
        options: {
            validate: Schema.paginationDefine,
        },
    });
};
