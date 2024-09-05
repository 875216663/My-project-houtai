//这个模块主要获取的是品牌管理的数据的模块
//获取品牌列表接口：/admin/product/baseTrademark/{page}/{limit}
import request from '@/utils/request'

export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' });


  