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
            frame_out_id:Joi.number().default(0).max(10).description('外框id'),
            frame_out_ratio:Joi.number().default(0).description('外框长宽比'),
            frame_inner_id:Joi.number().default(0).max(10).description('内框框id'),
            frame_inner_ratio:Joi.number().default(0).description('内框长宽比'),
            paperboard_out_id:Joi.number().default(0).max(10).description('外卡纸id'),
            paperboard_out_ratio:Joi.string().default("").description('外卡纸留边占比'),
            paperboard_inner_id:Joi.number().default(0).max(10).description('内卡纸id'),
            paperboard_inner_ratio:Joi.number().default(0).description('内卡纸留边占比'),
            background_id:Joi.number().default(0).max(10).description('背景id'),
            scene_id:Joi.number().default(0).max(10).description('场景id'),
            scene_origin_x:Joi.number().default(0).description('场景x坐标占比'),
            scene_origin_y:Joi.number().default(0).description('场景y坐标占比'),
            beginning_img:Joi.string().max(200).required().description('用户初始图片'),
            ending_img:Joi.string().max(200).required().description('用户完成图片'),
            goods_url:Joi.string().max(200).default('').description('商品连接')
        }
    )
};

export const del:object ={
    payload: Joi.object(
        {
            production_id:Joi.number().required().max(10).description('作品id')
        }
    )
};
