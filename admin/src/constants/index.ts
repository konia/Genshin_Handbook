export const status = {
  registered: {
    code: '10000',
    message: '该用户已注册，请直接登录'
  },
  registerSuccess: {
    code: '10101',
    message: '注册成功'
  },
  unregister: {
    code: '10201',
    message: '用户还未注册'
  },
  loginFail: {
    code: '10300',
    message: '用户名或密码错误'
  },
  loginSuccess: {
    code: '10301',
    message: '登录成功'
  },
  tokenExpire: {
    code: '50000',
    message: 'token 已过期'
  }
};

export enum NAVIGATION {
  DASHBOARD = 0,
  CHARACTERS = 1,
  ARTIFACTS = 2
}

export const LANGUAGE = {
  en: 'English',
  ja: '日本語',
  zh: '简体中文'
};
