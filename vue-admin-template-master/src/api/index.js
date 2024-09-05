//将四个模块请求的接口函数统一暴露
// *导入指定模块的所有导出内容，并通过 trademark 对象来访问这些导出的内容。
import * as trademark from './product/tradeMark';
import * as attr from './product/attr';
import * as spu from './product/spu';
import * as sku from './product/sku';

//对外暴露
export default {
    trademark,
    attr,
    sku,
    spu,

}