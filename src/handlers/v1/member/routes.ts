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
        path: "/v1/userInformation",
        handler: controller.userInformation
    });

    server.route({
        method: "POST",
        path: "/v1/outLogin",
        handler: controller.outLogin
    });
};
