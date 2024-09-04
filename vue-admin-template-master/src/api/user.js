//引入axios模块（经过二次封装的http请求模块）
import request from '@/utils/request'

//对外暴露登录接口
export function login(data) {
  return request({
    url: '/admin/acl/index/login',
    method: 'post',
    data
  })
}

//对外暴露获取用户信息接口
export function getInfo(token) {
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}

//对外暴露登出接口
export function logout() {
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}
