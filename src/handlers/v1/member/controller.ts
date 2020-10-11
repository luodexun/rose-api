import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import  {BaseController} from "../../baseController"
import WechatOAuth from 'wechat-oauth-ts';
import tencentcloud from "tencentcloud-sdk-nodejs";
import * as _ from 'lodash';
import { RandNum } from "../../../utils/code";
export class MemberController extends BaseController{
    public async loginWithWx(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            const authClient = new WechatOAuth('wxa79d43a07d290f16', '0e6fec3fea1c7303572debd1ff2ae82b');
            const pool = request.mysql.pool;
            let result = await authClient.getUserByCode(request.payload.code, 'zh_CN');
            let [rows] = await pool.query(`select * from cs_member where unionid = ?`, [result.unionid]);
            if (_.isEmpty(rows)) {
                await pool.query('INSERT INTO cs_member (nickname,openid,unionid,avatar,login_time) VALUES (?,?,?,?,?)', [result.nickname, result.openid, result.unionid, result.headimgurl, Date.now().toString().substr(0, 10)])
            } else {
                await pool.query('UPDATE cs_member SET nickname=?,avatar=?,login_time=? WHERE unionid=?', [result.nickname, result.headimgurl, Date.now().toString().substr(0, 10), result.unionid])
            }
            let [[data]] = await pool.query(`select * from cs_member where unionid = ?`, [result.unionid]);
            request.yar.set('member', data);
            return h.response({code:1000, msg:'登录成功',data:{id:data.id,nickname:data.nickname,avatar:data.avatar,mobile:data.mobile}});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }

    public async loginWithUser(request: Hapi.Request|any, h: Hapi.ResponseToolkit) {
        try {
            let {nickname, openid, unionid, avatar} = request.payload;
            const pool = request.mysql.pool;
            let [rows] = await pool.query(`select * from cs_member where unionid = ?`, [unionid]);
            if (_.isEmpty(rows)) {
                await pool.query('INSERT INTO cs_member (nickname,openid,unionid,avatar,login_time) VALUES (?,?,?,?,?)', [nickname, openid, unionid, avatar, Date.now().toString().substr(0, 10)])
            } else {
                await pool.query('UPDATE cs_member SET nickname=?,avatar=?,login_time=? WHERE unionid=?', [nickname, avatar, Date.now().toString().substr(0, 10), unionid])
            }
            let [[data]] = await pool.query(`select * from cs_member where unionid = ?`, [unionid]);
            request.yar.set('member', data);
            return h.response({code:1000, msg:'登录成功',data:{id:data.id,nickname:data.nickname,avatar:data.avatar,mobile:data.mobile}});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }

    public async userInformation(request: Hapi.Request|any, h: Hapi.ResponseToolkit){
        if(!this.isLogin(request)){
            return h.response({code:2004,msg:"未登录!!"});
        }
        try {
            return h.response({code:1000, msg:'获取用户信息成功',data:{id:this.memberInformation.id,nickname:this.memberInformation.nickname,avatar:this.memberInformation.avatar,mobile:this.memberInformation.mobile}});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }

    }

    public async outLogin(request: Hapi.Request|any, h: Hapi.ResponseToolkit){
        request.yar.set('member',null);
        h.response({code:1000, msg:'退出登录成功'})
    }

    public async code(request: Hapi.Request|any, h: Hapi.ResponseToolkit){
        const smsClient = tencentcloud.sms.v20190711.Client;
        const models = tencentcloud.sms.v20190711.Models;

        const Credential = tencentcloud.common.Credential;
        const ClientProfile = tencentcloud.common.ClientProfile;
        const HttpProfile = tencentcloud.common.HttpProfile;
        let code = await RandNum(6);
        let mobile = `+86${request.payload.mobile}`;
        let cred = new Credential(process.env.APPID, process.env.APPKEY);
        /* 非必要步骤:
         * 实例化一个客户端配置对象，可以指定超时时间等配置 */
        let httpProfile = new HttpProfile();
        /* SDK 默认使用 POST 方法
         * 如需使用 GET 方法，可以在此处设置，但 GET 方法无法处理较大的请求 */
        httpProfile.reqMethod = "POST";
        /* SDK 有默认的超时时间，非必要请不要进行调整
         * 如有需要请在代码中查阅以获取最新的默认值 */
        httpProfile.reqTimeout = 30;
        httpProfile.endpoint = "sms.tencentcloudapi.com";

       // 实例化一个 client 选项，可选，无特殊需求时可以跳过
        let clientProfile = new ClientProfile();
        /* SDK 默认用 TC3-HMAC-SHA256 进行签名，非必要请不要修改该字段 */
        clientProfile.signMethod = "HmacSHA256";
        clientProfile.httpProfile = httpProfile;

        /* SDK 会自动指定域名，通常无需指定域名，但访问金融区的服务时必须手动指定域名
         * 例如 SMS 的上海金融区域名为 sms.ap-shanghai-fsi.tencentcloudapi.com *
         * 实例化 SMS 的 client 对象
         * 第二个参数是地域信息，可以直接填写字符串 ap-guangzhou，或者引用预设的常量 */
        let client = new smsClient(cred, "ap-guangzhou", clientProfile);

        /* 实例化一个请求对象，根据调用的接口和实际情况，可以进一步设置请求参数
         * 您可以直接查询 SDK 源码确定 SendSmsRequest 有哪些属性可以设置
         * 属性可能是基本类型，也可能引用了另一个数据结构
         * 推荐使用 IDE 进行开发，可以方便地跳转查阅各个接口和数据结构的文档说明 */
        let req = new models.SendSmsRequest();

        /* 基本类型的设置:
         * SDK 采用的是指针风格指定参数，即使对于基本类型也需要用指针来对参数赋值
         * SDK 提供对基本类型的指针引用封装函数
         * 帮助链接：
         * 短信控制台：https://console.cloud.tencent.com/smsv2
         * sms helper：https://cloud.tencent.com/document/product/382/3773 */

        /* 短信应用 ID: 在 [短信控制台] 添加应用后生成的实际 SDKAppID，例如1400006666 */
        req.SmsSdkAppid = "1400039006";
        /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名，可登录 [短信控制台] 查看签名信息 */
        req.Sign = "海拍";
        /* 短信码号扩展号: 默认未开通，如需开通请联系 [sms helper] */
        req.ExtendCode = "";
        /* 国际/港澳台短信 senderid: 国内短信填空，默认未开通，如需开通请联系 [sms helper] */
        req.SenderId = "";
        /* 用户的 session 内容: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
        req.SessionContext = "";
        /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
         * 例如+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
        req.PhoneNumberSet = [mobile];
        /* 模板 ID: 必须填写已审核通过的模板 ID，可登录 [短信控制台] 查看模板 ID */
        req.TemplateID = "40613";
        /* 模板参数: 若无模板参数，则设置为空*/
        req.TemplateParamSet = ["绑定手机",code];
         let data = await new Promise((resolve, reject)=>{
             client.SendSms(req, async (err, response)=>{
                 // 请求异常返回，打印异常信息
                 if (err) {
                     reject(0);
                 }
                 // 请求正常返回，打印 response 对象
                 await request.yar.set('code',code);
                 resolve(1);
             });
         });
        if(data === 1){
            return h.response({code:1000, msg:'发送验证码成功，有效时间3分钟'});
        }else {
            return Boom.badImplementation('terrible implementation');
        }
     // 通过 client 对象调用想要访问的接口，需要传入请求对象以及响应回调函数

    }

    public async mobileBind(request: Hapi.Request|any, h: Hapi.ResponseToolkit){
        if(!this.isLogin(request)){
            return h.response({code:2004,msg:"未登录!!"});
        }
        let {mobile, code} = request.payload;
         if(code != request.yar.get('code')){
             return h.response({code:3000, msg:'验证码错误'});
         }
        const pool = request.mysql.pool;
        await pool.query('UPDATE cs_member SET mobile=? WHERE id=?', [mobile, this.memberInformation.id]);
        this.memberInformation.mobile = mobile;
        return h.response({code:1000, msg:'绑定成功',data:{id:this.memberInformation.id,nickname:this.memberInformation.nickname,avatar:this.memberInformation.avatar,mobile:this.memberInformation.mobile}});
    }
}
