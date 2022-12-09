/*省,直辖市代码表*/
interface City {
  [key: number]: any
}

const provinceAndCity: City = {
  11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江",
  31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东",
  45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏",
  65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
}

/*每位加权因子*/
const powers: string[] = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"]

/*第18位校检码*/
const parityBit: string[] = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"]

/*性别*/
const genders = { male: "M", female: "F" }

/*校验地址码*/
const checkAddressCode = (addressCode: string): boolean => {
  var check: boolean = /^[1-9]\d{5}$/.test(addressCode);
  if (!check) return false;
  if (provinceAndCity[parseInt(addressCode.substring(0, 2))]) {
    return true;
  } else {
    return false;
  }
}

/*校验日期码*/
const checkBirthDayCode = (birDayCode: string): boolean => {
  var check: boolean = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
  if (!check) return false;
  var yyyy: number = parseInt(birDayCode.substring(0, 4), 10);
  var mm: number = parseInt(birDayCode.substring(4, 6), 10);
  var dd: number = parseInt(birDayCode.substring(6), 10);
  var xData = new Date(yyyy, mm - 1, dd);
  if (xData > new Date()) {
    return false;//生日不能大于当前日期
  } else if ((xData.getFullYear() == yyyy) && (xData.getMonth() == mm - 1) && (xData.getDate() == dd)) {
    return true;
  } else {
    return false;
  }
}

/*计算校检码*/
const getParityBit = (idCardNo: string): any => {
  var id17 = idCardNo.substring(0, 17);
  /*加权 */
  var power = 0;
  for (var i = 0; i < 17; i++) {
    power += parseInt(id17.charAt(i), 10) * parseInt(powers[i]);
  }
  /*取模*/
  var mod = power % 11;
  return parityBit[mod];
}

/*验证校检码*/
const checkParityBit = (idCardNo: string): boolean => {
  var parityBit = idCardNo.charAt(17).toUpperCase();
  if (getParityBit(idCardNo) == parityBit) {
    return true;
  } else {
    return false;
  }
}

//校验15位的身份证号码
export const check15IdCardNo = (idCardNo: string): boolean => {
  //15位身份证号码的基本校验
  var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
  if (!check) return false;
  //校验地址码
  var addressCode = idCardNo.substring(0, 6);
  check = checkAddressCode(addressCode);
  if (!check) return false;
  var birDayCode = '19' + idCardNo.substring(6, 12);
  //校验日期码
  check = checkBirthDayCode(birDayCode);
  if (!check) return false;
  //验证校检码
  return checkParityBit(idCardNo);
}

//校验18位的身份证号码
export const check18IdCardNo = (idCardNo: string): boolean => {
  //18位身份证号码的基本格式校验
  var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
  if (!check) return false;
  //校验地址码
  var addressCode = idCardNo.substring(0, 6);
  check = checkAddressCode(addressCode);
  if (!check) return false;
  //校验日期码
  var birDayCode = idCardNo.substring(6, 14);
  check = checkBirthDayCode(birDayCode);
  if (!check) return false;
  //验证校检码
  return checkParityBit(idCardNo);
}

/*校验15位或18位的身份证号码*/
export const checkIdCardNo = (idCardNo: string): boolean => {
  //15位和18位身份证号码的基本校验
  var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
  if (!check) return false;
  //判断长度为15位或18位
  if (idCardNo.length == 15) {
    return check15IdCardNo(idCardNo);
  } else if (idCardNo.length == 18) {
    return check18IdCardNo(idCardNo);
  } else {
    return false;
  }
}

// 返回生日
const formateDateCN = (day: string): string => {
  var yyyy = day.substring(0, 4);
  var mm = day.substring(4, 6);
  var dd = day.substring(6);
  return yyyy + '-' + mm + '-' + dd;
}

//获取信息
export const getIdCardInfo = (idCardNo: string): { gender: string, birthday: string } => {
  var idCardInfo = {
    gender: "",  //性别
    birthday: "" // 出生日期(yyyy-mm-dd)
  };
  if (idCardNo.length == 15) {
    var aDay = '19' + idCardNo.substring(6, 12);
    idCardInfo.birthday = formateDateCN(aDay);
    if (parseInt(idCardNo.charAt(14)) % 2 == 0) {
      idCardInfo.gender = genders.female;
    } else {
      idCardInfo.gender = genders.male;
    }
  } else if (idCardNo.length == 18) {
    var aDay = idCardNo.substring(6, 14);
    idCardInfo.birthday = formateDateCN(aDay);
    if (parseInt(idCardNo.charAt(16)) % 2 == 0) {
      idCardInfo.gender = genders.female;
    } else {
      idCardInfo.gender = genders.male;
    }

  }
  return idCardInfo;
}

/*18位转15位*/
export const getId15 = (idCardNo: string): any => {
  if (idCardNo.length == 15) {
    return idCardNo;
  } else if (idCardNo.length == 18) {
    return idCardNo.substring(0, 6) + idCardNo.substring(8, 17);
  } else {
    return null;
  }
}

/*15位转18位*/
export const getId18 = (idCardNo: string): any => {
  if (idCardNo.length == 15) {
    var id17 = idCardNo.substring(0, 6) + '19' + idCardNo.substring(6);
    var parityBit = getParityBit(id17);
    return id17 + parityBit;
  } else if (idCardNo.length == 18) {
    return idCardNo;
  } else {
    return null;
  }
}