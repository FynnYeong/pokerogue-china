import { SimpleTranslationEntries } from "#app/interfaces/locales";

/**
 * The menu namespace holds most miscellaneous text that isn't directly part of the game's
 * contents or directly related to Pokemon data. This includes menu navigation, settings,
 * account interactions, descriptive text, etc.
 */
export const menu: SimpleTranslationEntries = {
  cancel: "取消",
  continue: "继续",
  dailyRun: "每日挑战 (Beta)",
  loadGame: "加载游戏",
  newGame: "新游戏",
  settings: "设置",
  selectGameMode: "选择一个游戏模式",
  logInOrCreateAccount: "登录或创建账户以开始游戏。无需邮箱！",
  username: "用户名",
  password: "密码",
  login: "登录",
  register: "注册",
  emptyUsername: "用户名不能为空",
  invalidLoginUsername: "输入的用户名无效",
  invalidRegisterUsername: "用户名只能包含字母、数字或下划线",
  invalidLoginPassword: "输入的密码无效",
  invalidRegisterPassword: "密码必须至少包含 6 个字符",
  usernameAlreadyUsed: "输入的用户名已被使用",
  accountNonExistent: "输入的用户不存在",
  unmatchingPassword: "输入的密码不匹配",
  passwordNotMatchingConfirmPassword: "密码必须与确认密码一致",
  confirmPassword: "确认密码",
  registrationAgeWarning: "注册即表示您确认您已年满 13 岁。",
  backToLogin: "返回登录",
  failedToLoadSaveData:
    "读取存档数据失败。请重新加载页面。如果\n问题仍然存在，请联系管理员。",
  sessionSuccess: "会话加载成功。",
  failedToLoadSession: "无法加载您的会话数据。它可能已损坏。",
  boyOrGirl: "你是男孩还是女孩？",
  boy: "男孩",
  girl: "女孩",
  selectServerAddress: "叮～请选择你要连接的电脑",
  serverAddress1: "联盟的官方电脑",
  serverAddress2: "在线模式",
  serverAddress3: "离线模式",
  evolving: "咦？\n{{pokemonName}} 开始进化了！",
  stoppedEvolving: "{{pokemonName}} 停止了进化。",
  pauseEvolutionsQuestion:
    "你确定要停止 {{pokemonName}} 的进化吗？\n你可以在队伍界面中重新进化。",
  evolutionsPaused: "{{pokemonName}} 的进化停止了。",
  evolutionDone:
    "恭喜！\n你的 {{pokemonName}} 进化成了 {{evolvedPokemonName}}！",
  dailyRankings: "每日排名",
  weeklyRankings: "每周排名",
  noRankings: "无排名",
  positionIcon: "#",
  usernameScoreboard: "用户名",
  score: "分数",
  wave: "层数",
  loading: "加载中...",
  loadingAsset: "加载资源： {{assetName}}",
  playersOnline: "在线玩家",
  yes: "是",
  no: "否",
  disclaimer: "DISCLAIMER",
  disclaimerDescription:
    "This game is an unfinished product; it might have playability issues (including the potential loss of save data),\n change without notice, and may or may not be updated further or completed.",
  errorServerDown:
    "糟糕！访问服务器时发生了错误。\n\n你可以保持页面开启，\n游戏会自动重新连接。",
} as const;
