import Hapi from "@hapi/hapi";
import { GoodsController } from "./controller";
import * as Schema from "./schema";
export const registerRoutes = (server: Hapi.Server): void => {
    const controller = new GoodsController();
    server.bind(controller);

    server.route({
        method: "GET",
        path: "/v1/goodsCate",
        handler: controller.goodsCate,
        options: {
            validate: Schema.paginationDefine,
        },
    });

    server.route({
        method: "GET",
        path: "/v1/goods",
        handler: controller.goods,
        options: {
            validate: Schema.goods,
        },
    });

    server.route({
        method: "POST",
        path: "/v1/goodsDetails",
        handler: controller.details,
        options: {
            validate: Schema.details,
        },
    });
};
