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
            frame_out_id:Joi.number().max(10).required().description('外框id'),
            frame_out_ratio:Joi.number().description('外框长宽比'),
            frame_inner_id:Joi.number().max(10).required().description('内框框id'),
            frame_inner_ratio:Joi.number().description('内框长宽比'),
            paperboard_out_id:Joi.number().max(10).required().description('外卡纸id'),
            paperboard_out_ratio:Joi.number().description('外卡纸留边占比'),
            paperboard_inner_id:Joi.number().max(10).required().description('内卡纸id'),
            paperboard_inner_ratio:Joi.number().description('内卡纸留边占比'),
            background_id:Joi.number().max(10).required().description('背景id'),
            scene_id:Joi.number().max(10).required().description('场景id'),
            scene_origin_x:Joi.number().description('场景x坐标占比'),
            scene_origin_y:Joi.number().description('场景y坐标占比'),
            beginning_img:Joi.string().max(200).required().description('用户初始图片'),
            ending_img:Joi.string().max(200).required().description('用户完成图片')
        }
    )
};