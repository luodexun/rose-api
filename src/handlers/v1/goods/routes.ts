import Hapi from "@hapi/hapi";
import { GoodsController } from "./controller";
import * as Schema from "./schema";
export const registerRoutes = (server: Hapi.Server): void => {
    const controller = new GoodsController();
    server.bind(controller);

    server.route({
        method: "GET",
        path: "/v1/goods",
        handler: controller.goods,
        options: {
            validate: Schema.goods,
        },
    });
};
