/**
 * 生成菜单
 * @param {*} data 原始数据 
 * @param {*} arr 接收处理完成数据的数组
 * @returns {list,arr} 原始数据 处理完成的数据
 */
interface _menuGenerate {
  list: any[],
  arr: any[]
}
const menuGenerate = (data: any[], arr: any[] = [], code: string = "parentId"): _menuGenerate => {
  // 遍历生成树形数据
  for (let i in data) {
    let el: any = data[i];
    menuFilter(el, 0, arr, code);
  }

  return { list: data, arr };
}

/**
 * 
 * @param {*} item 当前数据
 * @param {*} pid 上一级数据id
 * @param {*} arr 接收处理完成数据的数组
 */
const menuFilter = (item: any, pid: number | string, arr: any[] = [], code: string) => {
  if (item[code] === pid) {
    arr.push({ ...item, children: [] });
  } else {
    for (let i in arr) {
      let { id, children } = arr[i];
      menuFilter(item, id, children, code);
    }
  }
}


/**
 * 去除空数组
 * @param data 原始数据
 * @param type 数组的值
 * @returns []
 */
const menuCancelNull = (data: any[], type: string = "children") => {
  for (let i in data) {
    const el = data[i]
    if (el[type] && el[type].length) {
      menuCancelNull(el[type])
    } else {
      el[type] = null
    }
  }
  return data
}

export {
  menuGenerate,
  menuFilter,
  menuCancelNull
}