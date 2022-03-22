import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IWebInfo, Web } from "@pnp/sp/webs";
export interface IHelloWorldState {
   webInfo:IWebInfo;
   webInfoBatch:IWebInfo;
}
