import Hapi from "@hapi/hapi";
import { SceneController } from "./controller";
import * as Schema from "./schema";
export const registerRoutes = (server: Hapi.Server): void => {
    const controller = new SceneController();
    server.bind(controller);

    server.route({
        method: "GET",
        path: "/v1/scene",
        handler: controller.scene,
        options: {
            validate: Schema.paginationDefine,
        },
    });

    server.route({
        method: "GET",
        path: "/v1/sceneCate",
        handler: controller.sceneCate,
        options: {
            validate: Schema.paginationDefine,
        },
    });

    server.route({
        method: "GET",
        path: "/v1/sceneMine",
        handler: controller.sceneMine,
        options: {
            validate: Schema.paginationDefine,
        },
    });

    server.route({
        method: "POST",
        path: "/v1/sceneMineCustom",
        handler: controller.mine,
        options: {
            validate: Schema.mine,
        },
    });
};
