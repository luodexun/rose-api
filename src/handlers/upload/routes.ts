import Hapi from "@hapi/hapi";
import {mkdirSync, renameSync} from "fs";
import moment from "moment";
import Boom from "@hapi/boom";
export const registerRoutes = (server: Hapi.Server): void => {

    server.route({
        method: "POST",
        path: "/upload",
        options: {
            payload: {
                parse: true,
                allow:'multipart/form-data',
                maxBytes: 1024 * 1024 * 5,
                multipart: {
                    output: "file"
                },
                output:'file'
            },
            handler: async (req, h) => {
                let upload_dir = process.env.UPLOADDIR||"uploads";
                let image_domain = process.env.IMAGEDOMAIN || "http://120.27.19.189:4200"
                let localPath= upload_dir+'/'+(req.payload as any).dir+'/'+moment().format('YYYYMMDD')
                let targetPath= '/'+(req.payload as any).dir+'/'+moment().format('YYYYMMDD')
                mkdirSync(localPath,{recursive: true});
               let err = renameSync((req.payload as any).file.path, localPath+'/'+(req.payload as any).file.filename);
                // @ts-ignore
                if(err) {
                    return Boom.badImplementation('terrible implementation');
                }
                return h.response({code:1000, msg:'上传成功',data:{"tmp_path":targetPath+'/'+(req.payload as any).file.filename,"url":image_domain+ targetPath+'/'+(req.payload as any).file.filename}});
            }
        }
    });

};
