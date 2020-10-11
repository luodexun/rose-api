import Hapi from "@hapi/hapi";
import { MemberController } from "./controller";
import * as Schema from "./schema";
export const registerRoutes = (server: Hapi.Server): void => {
    const controller = new MemberController();
    server.bind(controller);

    server.route({
        method: "POST",
        path: "/v1/loginWithWx",
        handler: controller.loginWithWx,
        options: {
            validate: Schema.loginWithWx,
        },
    });

    server.route({
        method: "POST",
        path: "/v1/loginWithUser",
        handler: controller.loginWithUser,
        options: {
            validate: Schema.loginWithUser,
        },
    });

    server.route({
        method: "POST",
        path: "/v1/userInformation",
        handler: controller.userInformation
    });

    server.route({
        method: "POST",
        path: "/v1/outLogin",
        handler: controller.outLogin
    });

    server.route({
        method: "POST",
        path: "/v1/code",
        handler: controller.code,
        options: {
            validate: Schema.code,
        },
    });

    server.route({
        method: "POST",
        path: "/v1/mobileBind",
        handler: controller.mobileBind,
        options: {
            validate: Schema.mobileBind,
        },
    });
};
