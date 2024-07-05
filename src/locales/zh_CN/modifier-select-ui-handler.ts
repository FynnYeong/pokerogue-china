import { SimpleTranslationEntries } from "#app/interfaces/locales";

export const modifierSelectUiHandler: SimpleTranslationEntries = {
  "transfer": "转移道具",
  "reroll": "重掷",
  "lockRarities": "锁定稀有度",
  "checkTeam": "检查队伍",
  "transferDesc": "将宝可梦携带的道具交换给其他宝可梦",
  "rerollDesc": "花钱刷新道具",
  "lockRaritiesDesc": "在刷新时锁定道具稀有度(影响刷新费用)",
  "checkTeamDesc": "检查队伍或使用形态改变道具",
  "rerollCost": "₽{{formattedMoney}}",
  "itemCost": "₽{{formattedMoney}}"
} as const;
