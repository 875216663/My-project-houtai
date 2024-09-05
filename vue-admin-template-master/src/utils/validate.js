
// 用于检查给定的路径 path 是否为外部链接。如果 URL 以 http://、https://、mailto: 或 tel: 开头，那么该路径会被认为是外部链接。
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}




//判断当前输入的用户名是否在允许的用户名列表中。
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
