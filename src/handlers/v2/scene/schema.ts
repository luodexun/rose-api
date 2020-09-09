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

export const mine:object ={
    payload: Joi.object(
        {
            name:Joi.string().max(10).required().description('背景名称'),
            cate:Joi.number().default(1).description('场景分类'),
            show_img:Joi.string().max(200).required().description('显示图片'),
            select_img:Joi.string().max(200).required().description('选项卡图片')
        }
    )
};