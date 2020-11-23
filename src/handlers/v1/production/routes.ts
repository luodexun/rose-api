import Hapi from "@hapi/hapi";
import { ProductionController } from "./controller";
import * as Schema from "./schema";
export const registerRoutes = (server: Hapi.Server): void => {
    const controller = new ProductionController();
    server.bind(controller);

    server.route({
        method: "GET",
        path: "/v1/productionCate",
        handler: controller.productionCate,
        options: {
            validate: Schema.paginationDefine,
        },
    });

    server.route({
        method: "GET",
        path: "/v1/productionMine",
        handler: controller.productionMine,
        options: {
            validate: Schema.paginationDefine,
        },
    });
    server.route({
        method: "GET",
        path: "/v1/productionRecommendation",
        handler: controller.productionRecommendation,
        options: {
            validate: Schema.paginationDefine,
        },
    });

    server.route({
        method: "POST",
        path: "/v1/productionMineCustom",
        handler: controller.productionMineCustom,
        options: {
            validate: Schema.mine,
        },
    });
    server.route({
        method: "POST",
        path: "/v1/productionMineDelete",
        handler: controller.productionMineDelete,
        options: {
            validate: Schema.del,
        },
    });
};
