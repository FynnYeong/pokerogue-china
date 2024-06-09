import { AchievementTranslationEntries } from "#app/plugins/i18n.js";

export const achv: AchievementTranslationEntries = {
  "Achievements": {
    name: "成就",
  },
  "Locked": {
    name: "未解锁",
  },

  "MoneyAchv": {
    description: "累计总共 ₽{{moneyAmount}}",
  },
  "10K_MONEY": {
    name: "有钱人",
  },
  "100K_MONEY": {
    name: "富有",
  },
  "1M_MONEY": {
    name: "百万富翁",
  },
  "10M_MONEY": {
    name: "亿万富翁",
  },

  "DamageAchv": {
    description: "在一次攻击中造成 {{damageAmount}} 伤害",
  },
  "250_DMG": {
    name: "重击者",
  },
  "1000_DMG": {
    name: "更强的重击者",
  },
  "2500_DMG": {
    name: "巨额伤害",
  },
  "10000_DMG": {
    name: "一拳超人",
  },

  "HealAchv": {
    description: "通过招式、技能或携带道具一次性恢复 {{healAmount}} {{HP}}",
  },
  "250_HEAL": {
    name: "初级治疗者",
  },
  "1000_HEAL": {
    name: "高级治疗者",
  },
  "2500_HEAL": {
    name: "牧师",
  },
  "10000_HEAL": {
    name: "恢复大师",
  },

  "LevelAchv": {
    description: "将宝可梦升级到 Lv{{level}}",
  },
  "LV_100": {
    name: "但这还没完！",
  },
  "LV_250": {
    name: "精英",
  },
  "LV_1000": {
    name: "突破极限",
  },

  "RibbonAchv": {
    description: "累计获得 {{ribbonAmount}} 个缎带",
  },
  "10_RIBBONS": {
    name: "宝可梦联盟冠军",
  },
  "25_RIBBONS": {
    name: "高级联盟冠军",
  },
  "50_RIBBONS": {
    name: "超级联盟冠军",
  },
  "75_RIBBONS": {
    name: "流浪联盟冠军",
  },
  "100_RIBBONS": {
    name: "大师联盟冠军",
  },

  "TRANSFER_MAX_BATTLE_STAT": {
    name: "团队合作",
    description: "接力棒传递给至少一项属性满值的队员",
  },
  "MAX_FRIENDSHIP": {
    name: "友谊满分",
    description: "与宝可梦达到最高友好度",
  },
  "MEGA_EVOLVE": {
    name: "超级进化",
    description: "让宝可梦进行超级进化",
  },
  "GIGANTAMAX": {
    name: "巨无霸",
    description: "让宝可梦进行极巨化",
  },
  "TERASTALLIZE": {
    name: "属性狂热者",
    description: "让宝可梦进行太晶化",
  },
  "STELLAR_TERASTALLIZE": {
    name: "隐藏属性",
    description: "让宝可梦进行星光太晶化",
  },
  "SPLICE": {
    name: "无限融合",
    description: "使用DNA融合器将两只宝可梦融合",
  },
  "MINI_BLACK_HOLE": {
    name: "物品黑洞",
    description: "获得一个小型黑洞",
  },
  "CATCH_MYTHICAL": {
    name: "神秘宝可梦",
    description: "捕捉一只神秘宝可梦",
  },
  "CATCH_SUB_LEGENDARY": {
    name: "准传奇宝可梦",
    description: "捕捉一只准传奇宝可梦",
  },
  "CATCH_LEGENDARY": {
    name: "传奇宝可梦",
    description: "捕捉一只传奇宝可梦",
  },
  "SEE_SHINY": {
    name: "闪光宝可梦",
    description: "在野外发现一只闪光宝可梦",
  },
  "SHINY_PARTY": {
    name: "全闪光队伍",
    description: "拥有一个全闪光宝可梦的队伍",
  },
  "HATCH_MYTHICAL": {
    name: "神秘蛋",
    description: "从蛋中孵化一只神秘宝可梦",
  },
  "HATCH_SUB_LEGENDARY": {
    name: "准传奇蛋",
    description: "从蛋中孵化一只准传奇宝可梦",
  },
  "HATCH_LEGENDARY": {
    name: "传奇蛋",
    description: "从蛋中孵化一只传奇宝可梦",
  },
  "HATCH_SHINY": {
    name: "闪光蛋",
    description: "从蛋中孵化一只闪光宝可梦",
  },
  "HIDDEN_ABILITY": {
    name: "隐藏潜力",
    description: "捕捉一只拥有隐藏能力的宝可梦",
  },
  "PERFECT_IVS": {
    name: "鉴定书",
    description: "获得一只六项全满的宝可梦",
  },
  "CLASSIC_VICTORY": {
    name: "无敌",
    description: "在经典模式中通关",
  },
} as const;
