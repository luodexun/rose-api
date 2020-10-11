import Joi from "@hapi/joi";

export const paginationDefine: object = {
    query: Joi.object({
        limit: Joi.number().integer().min(1)
            .description('每页的条目数'),
        page: Joi.number().integer().min(1)
            .description('页码数'),
        pagination: Joi.boolean().description('是否开启分页，默认为true')
    }),
};

export const loginWithWx:object = {
    payload: Joi.object(
        {
            code:Joi.string().required().max(200).description('微信授权吗码')
        }
    )
};

export const loginWithUser:object = {
    payload: Joi.object(
        {
            nickname:Joi.string().required().max(200).description('昵称'),
            openid:Joi.string().required().max(200).description('开放id'),
            unionid:Joi.string().required().max(200).description('唯一id'),
            avatar:Joi.string().required().max(200).description('用户头像'),
        }
    )
};

export const code:object = {
    payload: Joi.object(
        {
            mobile:Joi.number().required().description('用户手机号码')
        }
    )
};

export const mobileBind:object = {
    payload: Joi.object(
        {
            mobile:Joi.number().required().description('用户手机号码'),
            code:Joi.number().required().description('用户手机验证码')
        }
    )
};
