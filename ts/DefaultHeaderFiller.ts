import { IHeaderFiller } from "./IHeaderFiller";

/**
 * 默认请求头填充器
 */
export class DefaultHeaderFiller implements IHeaderFiller {


    fillerHeaders(xhr: XMLHttpRequest): void {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    }

}