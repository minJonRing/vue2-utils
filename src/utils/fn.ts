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
    if (el[children]) {
      option.children = fnArrFlat(el[children], _option)
    }
    return option
  })
}

/**
* mixin 字典生成器
* @param {Array} arr  需要处理的数组
* @param {Object:{child,key,value}} option 需要处理的对应的字段
* @returns {Object}
*/

interface watch {
  [key: string]: any
}

interface list {
  [key: string]: any
}

interface vuex {
  mapGetters: any,
}

interface generateZd {
  data: Function,
  watch: object,
  computed: object,
  created(this: generateZd): any,
  [key: string]: any
}

const fnGenerateMixinZd = (zd: any[], vuex: vuex) => {
  // watch 监听
  const watch: watch = {}
  // 循环字典
  for (let el of zd) {
    watch[el] = function (data: any) {
      this.list[el] = data;
    }
  }
  const { mapGetters } = vuex
  const mixin: generateZd = {
    data() {
      return {
        list: {}
      }
    },
    watch,
    computed: {
      ...mapGetters(zd)
    },
    created() {
      // list 字典对象
      const list: list = {}
      for (let el of zd) {
        list[el] = this[el]
      }
      // 初始化字典
      this.list = {
        ...this.list,
        ...list
      }
    },
  }
  return mixin
}




export {
  fnArrToJson,
  fnArrFlat,
  fnGenerateMixinZd
}

