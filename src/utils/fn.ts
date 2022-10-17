/**
* 
* @param {Array} arr  需要处理的数组
* @param {Object:{child,key,value}} option 需要处理的对应的字段
* @returns {Object}
*/
interface _json {
  [propName: string]: any,
}
const fnArrToJson = (arr: any[], option: object = {}, json: _json = {}) => {
  const _option = { key: 'value', value: 'label', children: "children", ...option }
  const { children, key, value } = _option
  for (let el of arr) {
    json[el[key]] = el[value]
    if (el[children]) {
      fnArrToJson(el[children], _option, json)
    }
  }
  return json
}
/**
* 
* @param {Array} arr  需要处理的数组
* @param {Object:{child,key,value}} option 需要处理的对应的字段
* @returns {Object}
*/
const fnArrFlat = (arr: any[], option: object = {}) => {
  const _option = { key: 'name', value: 'code', children: 'children', ...option }
  const { key, value, children } = _option
  return arr.map((el: any) => {
    const option: _json = {
      ...el,
      label: el[key],
      value: el[value],
    }
    if (children) {
      option.children = fnArrFlat(el[children], _option)
    }
    return option
  })
}

export {
  fnArrToJson,
  fnArrFlat
}

