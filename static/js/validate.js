import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'//引入中文文件

// 配置中文
Validator.addLocale(zh);

const config = {
  errorBagName: 'errors',
  fieldsBagName: 'fields',
  delay: 10,  //错误提示的延迟时间 ms
  locale: 'zh_CN',  //对语言（中文）的配置
  strict: true,  //没有设置规则的表单不进行校验，
  enableAutoClasses: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'blur',  //**input|blur** 在用户输入和表单失去焦点时都进行校验 可单独写  blur或input
  inject: true
};

Vue.use(VeeValidate,config);

// 自定义validate
const dictionary = {
  zh_CN: {
    messages: {
      required:( field )=> '请输入' + field,
      // max: () => '昵称不能超过5字',
      email: () => '邮箱格式错误',
    },
    attributes:{
      pwd:'密码',
      // nickname: '昵称',
      telphone: '手机号码',
      // sign: '签名'
    }
  }
};
Validator.updateDictionary(dictionary);

// 扩展
// 电话号码验证
Validator.extend('telphone', {
  messages: {
    zh_CN:field => '手机号码错误',
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});
// 密码验证
Validator.extend('pwd', {
  messages: {
      zh_CN: field => '请设置6-16位数字、字母'
  },
  validate: value => {
      return /^[0-9A-Za-z]{6,20}$/.test(value);
  }
});
