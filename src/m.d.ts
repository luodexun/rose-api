declare namespace tencentcloud{
    namespace sms{
          namespace v20190711{
                 class Client {
                     constructor(cred:common.Credential,endpoint:string,clientProfile:common.ClientProfile):void;
                     SendSms:(req:Models.SendSmsRequest,onSuccess:(err:any,response:any)=>void)=>void;
                 }
                 namespace Models{
                     class SendSmsRequest {
                         SmsSdkAppid?:string;
                         Sign?:string;
                         ExtendCode?:string;
                         SenderId?:string;
                         SessionContext?:string;
                         PhoneNumberSet?:string[];
                         TemplateID?:string;
                         TemplateParamSet?:string[];
                     }
                 }
          }
    }
    namespace common{
         class Credential {
             constructor(id:string,key:string):void
         }
       class HttpProfile {
             reqMethod:string;
             reqTimeout:number;
             endpoint:string;
         }
         class ClientProfile {
             signMethod:string;
             httpProfile:HttpProfile;
         }
    }
}
export = tencentcloud;
