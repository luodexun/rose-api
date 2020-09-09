// import Hapi from "@hapi/hapi";
// import Boom from "@hapi/boom";
import { memberInfomation } from "../interface/member";
import Hapi from "@hapi/hapi";
import * as _ from "lodash";
export class BaseController {
   private _memberInformation:memberInfomation;

   protected isLogin(request: Hapi.Request|any):boolean
   {
      let data = request.yar.get('member');
      if (_.isNull(data)){
         return false
      }
      this.memberInformation = data;
      return true
   }


   public get memberInformation(){
      return this._memberInformation
   }


   public set memberInformation(data:memberInfomation){
      this._memberInformation = data;
   }
}
