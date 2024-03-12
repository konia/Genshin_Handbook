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

export const LANGUAGE = [
  {
    label: '🇺🇸 English',
    value: 'en'
  },
  {
    label: '🇯🇵 日本語',
    value: 'ja'
  },
  {
    label: '🇨🇳 简体中文',
    value: 'zh'
  }
];

export const vision = [
  { label: 'vision', value: 'vision' },
  { label: 'Pyro', value: 'vision' },
  { label: 'Hydro', value: 'vision' },
  { label: 'Dendro', value: 'vision' },
  { label: 'Electro', value: 'vision' },
  { label: 'Anemo', value: 'vision' },
  { label: 'Cryo', value: 'vision' },
  { label: 'Geo', value: 'vision' },
  { label: 'vision', value: 'vision' }
];

export const weapon = [{}];

export const region = [{}];

export const quality = [{}];

// Pyro 炎元素; 火元素
// Hydro 水元素; 水元素
// Dendro 草元素; 草元素
// Electro 雷元素; 雷元素
// Anemo 風元素; 风元素
// Cryo 氷元素; 冰元素
// Geo 岩元素; 岩元素

// Mondstadt  モンド城  蒙德城
// Liyue Harbor  璃月港  璃月港
// Inazuma City  稲妻城  稻妻城
// Snezhnaya  スネージナヤ  至冬
// Sumeru  スメール  须弥
// Fontaine  フォンテーヌ  枫丹
// Natlan  ナタ  纳塔
// Other  その他  其他

// Sword  片手剣   单手剑;
// Claymore  両手剣   双手剑;
// Bow  弓   弓;
// Catalyst  法器   法器;
// Polearm  長柄武器   长柄武器;
