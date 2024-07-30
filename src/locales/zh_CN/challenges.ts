import { TranslationEntries } from "#app/interfaces/locales";

export const challenges: TranslationEntries = {
  "title": "适用挑战条件",
  "illegalEvolution": "{{pokemon}}变成了\n不符合此挑战条件的宝可梦！",
  "singleGeneration": {
    "name": "单一世代",
    "desc": "你只能使用第{{gen}}\n世代的宝可梦",
    "desc_default": "你只能使用所选\n世代的宝可梦",
    "gen_1": "一",
    "gen_2": "二",
    "gen_3": "三",
    "gen_4": "四",
    "gen_5": "五",
    "gen_6": "六",
    "gen_7": "七",
    "gen_8": "八",
    "gen_9": "九",
  },
  "singleType": {
    "name": "单属性",
    "desc": "你只能使用{{type}}\n属性的宝可梦",
    "desc_default": "你只能使用所选\n属性的宝可梦"
  },
  "freshStart": {
    "name": "全新开始",
    "desc": "您只能使用原始的启动器，并且只能像刚开始玩 Pokerogue 时那样使用。",
    "value.0": "关闭",
    "value.1": "开启"
  }
} as const;
