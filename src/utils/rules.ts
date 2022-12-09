import { checkIdCardNo } from './idCard'

interface _rulesT {
  Any: object,
  Number: object,
  String: object,
  Boolean: object,
  Array: object,
  Object: object,
  Function: object
}

// 类型验证
const rulesT: _rulesT = {
  Any: {
    type: null
  },
  Number: {
    type: Number,
    default: 0
  },
  String: {
    type: String,
    default: ''
  },
  Boolean: {
    type: Boolean,
    default: false
  },
  Array: {
    type: Array,
    default: () => {
      return []
    }
  },
  Object: {
    type: Object,
    default: () => {
      return {}
    }
  },
  Function: {
    type: Function
  }
}

// 内容验证
const blur = { required: true, message: "请输入", trigger: "blur" }
const change = { required: true, message: "请选择", trigger: "change" }
// 判断函数
const is = (required: boolean = true, fn: any): any => ({
  required,
  validator: (rule: any, value: any, callback: any) => {
    // 是否可以为空
    if (!required) {
      // 空直接跳过
      if (!value) {
        return new callback()
      } else {
        // fn存在进行验证
        if (fn && fn(value)) {
          return callback(new Error('请输入正确的值'));
        } else {
          return new callback()
        }
      }
    }
    if (!value || (fn ? fn(value) : true)) {
      return callback(new Error('请输入正确的值'));
    }
    return new callback()
  },
  trigger: "blur"
})
// 手机号/座机
const phoneBoolean = (value: string): boolean => {
  return !/(^[0][0-9]{2,3}\-?[0-9]{7,8}$)|^[0-9]{7,8}$|^1[3-9]\d{9}$/.test(value)
}
const blurPhone = is(true, phoneBoolean)
const blurPhoneNotRequired = is(false, phoneBoolean)
// 11位手机号
const mobileBoolean = (value: string): boolean => {
  return !/^1[3-9]\d{9}$/.test(value)
}
const blurMobile = is(true, mobileBoolean)
const blurMobileNotRequired = is(false, mobileBoolean)
// 座机
const telBoolean = (value: string): boolean => {
  return !/(^[0][0-9]{2,3}\-?[0-9]{7,8}$)|^[0-9]{7,8}$/.test(value)
}
const blurTel = is(true, telBoolean)
const blurTelNotRequired = is(false, telBoolean)
// 18位字符
const codeBoolean18 = (value: string): boolean => {
  return !/(^[0-9|A-Z]{15}$)|(^[0-9A-Z]{18}$)/.test(value)
}
const blurCode18 = is(true, codeBoolean18)
const blurCode18NotRequired = is(false, codeBoolean18)
// 中文验证
const nameBoolean = (value: string): boolean => {
  return !/[\u4e00-\u9fa5]/.test(value)
}
const blurName = is(true, nameBoolean)
const blurNameNotRequired = is(false, nameBoolean)
// 
// 邮编验证
const zipBoolean = (value: string): boolean => {
  return !/^[0-9]{6,6}$/.test(value)
}
const blurZip = is(true, zipBoolean)
const blurZipNotRequired = is(false, zipBoolean)
// 
// 邮箱验证
const emailBoolean = (value: string): boolean => {
  return !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
}
const blurEmail = is(true, emailBoolean)
const blurEmailNotRequired = is(false, emailBoolean)
// 身份证验证

const blurIdCard = is(true, (value: any) => !checkIdCardNo(value))
const blurIdCardNotRequired = is(false, (value: any) => !checkIdCardNo(value))
// 多数据验证
const slot = (fn: any): any => function (_this: any, attr: string, type: string = 'time', size: string = 'min', obj: any = 'form') {
  return {
    required: true,
    validator: (rule: any, value: any, callback: any) => {
      // 是否可以为空
      // 空直接跳过
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        // fn存在进行验证
        const other = _this[obj][attr]
        if (!['', undefined, null].includes(other)) {
          if (!fn({ type, size, value, other })) {
            return new callback(new Error('内容不符合'))
          }
        }
      }
      return callback();
    },
    trigger: ["blur", 'change']
  }
}
// 时间验证
const slotBoolean = (data: any): boolean => {
  const { type, size, value, other } = data
  let bool = false;
  if (type === 'time') {
    if (size === 'min') {
      if (new Date(value).getTime() <= new Date(other).getTime()) {
        bool = true;
      } else {
        bool = false;
      }
    } else {
      if (new Date(value).getTime() >= new Date(other).getTime()) {
        bool = true;
      } else {
        bool = false;
      }
    }
  } else {
    if (size === 'min') {
      if (+value <= +other) {
        bool = true;
      } else {
        bool = false;
      }
    } else {
      if (+value >= +other) {
        bool = true;
      } else {
        bool = false;
      }
    }
  }
  return bool
}
const blurSlot = slot(slotBoolean)
// 导出
export {
  rulesT,
  blur,
  change,
  blurPhone,
  blurPhoneNotRequired,
  blurMobile,
  blurMobileNotRequired,
  blurTel,
  blurTelNotRequired,
  blurCode18,
  blurCode18NotRequired,
  blurIdCard,
  blurIdCardNotRequired,
  blurName,
  blurNameNotRequired,
  blurZip,
  blurZipNotRequired,
  blurEmail,
  blurEmailNotRequired,
  blurSlot
}
