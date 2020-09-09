import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import  {BaseController} from "../../baseController"
import WechatOAuth from 'wechat-oauth-ts';
import * as _ from 'lodash';
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
            return h.response({code:1000, msg:'登录成功',data:{id:data.id,nickname:data.nickname,avatar:data.avatar}});
        } catch (err) {
            return Boom.badImplementation('terrible implementation');
        }
    }

    public async userInformation(request: Hapi.Request|any, h: Hapi.ResponseToolkit){
        if(!this.isLogin(request)){
            return h.response({code:2004,msg:"未登录!!"});
        }
        try {
            return h.response({code:1000, msg:'获取用户信息成功',data:{id:this.memberInformation.id,nickname:this.memberInformation.nickname,avatar:this.memberInformation.avatar}});
        } catch (err) {
            console.log(err);
            return Boom.badImplementation('terrible implementation');
        }

    }

    public async outLogin(request: Hapi.Request|any, h: Hapi.ResponseToolkit){
        request.yar.set('member',null);
        h.response({code:1000, msg:'退出登录成功'})
    }
}
