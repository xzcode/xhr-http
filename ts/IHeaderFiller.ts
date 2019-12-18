/**
 * 请求头填充器
 */
export interface IHeaderFiller {

    /**
     * 填充请求头信息
     * @param xhr XMLHttpRequest对象
     */
    fillerHeaders(xhr:XMLHttpRequest) : void;

}