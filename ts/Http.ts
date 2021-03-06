import { XhrProvider } from "./XhrProvider";
import { IHeaderFiller } from "./IHeaderFiller";



/**
 * http连接工具类
 */
export class Http {

    serverUrl:string = 'localhost';
    defaultParams:Object = {};
    xhrProvider: XhrProvider;
    headerFillers: IHeaderFiller[] = [];

    /**
     * 
     * @param serverUrl 服务器地址
     * @param xhrProvider XMLHttpRequest对象提供者
     * @param headerFillers 请求头填充器
     */
    constructor(serverUrl:string, xhrProvider:XhrProvider, headerFillers: IHeaderFiller[]) 


    /**
     * 构造器
     * @param serverUrl 服务器地址
     * @param xhrProvider XMLHttpRequest对象提供者
     */
    constructor(serverUrl:string, xhrProvider:XhrProvider) 
    /**
     * 构造器
     * @param serverUrl 服务器地址
     */
    constructor(serverUrl:string)

    /**
     * 基础构造器
     * @param args 参数素组
     */
    constructor(...args:any) {
        this.serverUrl = args[0];
        this.xhrProvider = args[1]
        this.headerFillers = args[2]
        this.defaultParams = {};
    }

    /**
     * 添加请求头填充器
     * @param headerFiller 请求头填充器
     */
    addHeaderFiller(headerFiller: IHeaderFiller) {
        this.headerFillers.push(headerFiller);
    }
    
    /**
     * 设置请求头
     * @param xhr 
     */
    private setCommonHeaders(xhr:XMLHttpRequest):void {
        for (let index = 0; index < this.headerFillers.length; index++) {
            let headerFiller = this.headerFillers[index];
            headerFiller.fillerHeaders(xhr);
        }
    }


    /**
     * GET请求
     * @param path 请求路径
     * @param params 参数
     * @param successCallback 成功回调
     * @param errorCallback 错误回调
     */
    get(path:string, params:Object, successCallback:Function, errorCallback:Function):void;
    get(path:string, params:Object, successCallback:Function):void;
    get(path:string, successCallback:Function):void;
    get(...args:any) : void{
        this.sendRequest('GET', args[0], args[1], args[2], args[3]);
    }

    
    
 
    /**
     * post请求
     * @param path 请求路径
     * @param params 参数
     * @param successCallback 成功回调
     * @param errorCallback 错误回调
     */
    post(path:string, params:Object, successCallback:Function, errorCallback:Function) {
        this.sendRequest("POST", path, params, successCallback, errorCallback);
    }



    private sendRequest(method:string, path:string, params:Object, callback:Function, errorCallback?:Function) {
        if (typeof (params) == 'function') callback = params;
        let xhr = this.xhrProvider.getXMLHttpRequest();
        xhr.timeout = 10000;// 10 seconds for timeout
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                var respone = xhr.responseText;
                if ((xhr.status >= 200 && xhr.status < 300)) {
                    callback && callback(JSON.parse(respone));
                }
                else if (xhr.status >= 400) {
                    errorCallback && errorCallback();
                }
                else if (xhr.status == 0) {
                    errorCallback && errorCallback();
                }
            }
        };
       
        let paramsObj:Object = {};
 
        (<any>Object).assign(paramsObj, params, this.defaultParams);

        let paramString:string = '?' + Object.keys(paramsObj).map(key => key + '=' + (<any>paramsObj)[key]).join('&');

        if(paramString === '?') {
            paramString = '';
        }
 
        xhr.open(method, this.serverUrl + path + paramString, true);

        this.setCommonHeaders(xhr);
 
        if(method === 'GET') {
            xhr.send();
        }else {
            xhr.send(JSON.stringify(params));
        }

    }

}