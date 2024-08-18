// pokerogueLoginPhase 登陆阶段额外出发的回调 Function
// pokerougeBypassLoginObj 模拟离线模式的参数 { list: any[],fn:Function }
// pokerogueDailyRunSeed 每日运行参数获取方式 接口or本地时间  boolean
// pokerogueTimedEvents 定时事件参数 
// pokerogueImportDataGuest 导入离线模式数据 boolean
// pokerogueImportData 是否禁用导入存档 boolean
// isOpenUpdown 是否放开初始化系列操作 boolean
// isOpenPokerogueClearLocalData 是否允许清除本地存档 boolean
// pokerougeMessagesList 实时通知参数 ()=> string[]
// pokerougeOnReplaceApiOptionFn 替换api参数的回调 Function
// pokerogueModeArr 当前可选的游戏模式 string[]
// pokerogueModeofflineModeText 离线模式文本

// 增加游戏结束时的对局信息记录
function handleFetchGameOver() {

  // 默认进入离线模式
  if(!localStorage.getItem("pokerogue_sessionId")) {
    localStorage.setItem("pokerogue_sessionId", 'offline');
  }
  
  const findFirstDataKey = () => {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key && key.startsWith("data_") && key !== "data_Guest") {
        // 提取变量部分xxx
        let variablePart = key.substring(5); // 去除"data_"部分
        return variablePart;
      }
    }
    return null; // 如果没有找到符合条件的key，返回null或者其他适合的默认值
  };

  const makePostRequest = (url, data) => {
    // 创建一个新的 XMLHttpRequest 对象
    var xhr = new XMLHttpRequest();

    // 配置请求类型和目标 URL
    xhr.open("POST", url, true);

    // 设置请求头
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.setRequestHeader(
      "Authorization",
      "Bearer 162970dbd8d78e3d9614f608a4d934e7501a70906ad5f959d4edc1b7deb5127726432625727a0f91786d20bab8cc8128bcd8c0cd58a957a7b2e75b5c1d35f7247a3709761ac0ac70aaf820298788fd80b83987b992bd6ac06ebd7985302395ddbf1460220fed1efeebb66cc0542c8e2b61dc98709f5278cdf7e2b820f1eb978f"
    );

    // 定义请求完成时的回调函数
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
          // 请求成功时的处理
        } else {
          // 请求失败时的处理
          console.error("Request failed. Status:", xhr.status);
        }
      }
    };

    // 发送请求，并将数据转换为 JSON 字符串
    xhr.send(JSON.stringify(data));
  };

  const handleParty = (source, forHistory = false) => {
    const obj = {};
    obj.id = source.id;
    obj.name = source.name;
    obj.player = source.player;
    obj.species = source.species;
    // obj.formIndex = Math.max(Math.min(source.formIndex, getPokemonSpecies(obj.species).forms.length - 1), 0);
    obj.abilityIndex = source.abilityIndex;
    obj.passive = source.passive;
    obj.shiny = source.shiny;
    obj.variant = source.variant;
    obj.pokeball = source.pokeball;
    obj.level = source.level;
    obj.exp = source.exp;
    if (!forHistory) {
      obj.levelExp = source.levelExp;
    }
    obj.gender = source.gender;
    if (!forHistory) {
      obj.hp = source.hp;
    }
    obj.stats = source.stats;
    obj.ivs = source.ivs;
    obj.nature = source.nature !== undefined ? source.nature : 0;
    obj.natureOverride =
      source.natureOverride !== undefined ? source.natureOverride : -1;
    // obj.friendship = source.friendship !== undefined ? source.friendship : getPokemonSpecies(obj.species).baseFriendship;
    obj.metLevel = source.metLevel || 5;
    obj.metBiome = source.metBiome !== undefined ? source.metBiome : -1;
    obj.luck =
      source.luck !== undefined
        ? source.luck
        : source.shiny
        ? source.variant + 1
        : 0;
    if (!forHistory) {
      obj.pauseEvolutions = !!source.pauseEvolutions;
    }
    obj.pokerus = !!source.pokerus;

    obj.fusionSpecies = {
      name: source?.fusionSpecies?.name,
      speciesId: source?.fusionSpecies?.speciesId,
    };
    obj.fusionFormIndex = source.fusionFormIndex;
    obj.fusionAbilityIndex = source.fusionAbilityIndex;
    obj.fusionShiny = source.fusionShiny;
    obj.fusionVariant = source.fusionVariant;
    obj.fusionGender = source.fusionGender;
    obj.fusionLuck =
      source.fusionLuck !== undefined
        ? source.fusionLuck
        : source.fusionShiny
        ? source.fusionVariant + 1
        : 0;

    obj.moveset = JSON.parse(JSON.stringify(source.moveset));
    return obj;
  };

  const handleModifiers = (source) => {
    const obj = {};
    obj.typeId = source?.type?.id || source?.typeId;
    obj.typeGeneratorId = source?.type?.generatorId || source?.typeGeneratorId;
    if (source) {
      if ("getPregenArgs" in source.type) {
        obj.typePregenArgs = source?.type?.getPregenArgs?.();
      }
    } else if (source.typePregenArgs) {
      obj.typePregenArgs = source.typePregenArgs;
    }
    obj.args = source?.getArgs?.() || source?.args || [];
    obj.stackCount = source.stackCount;
    obj.className = source?.constructor?.name || source?.className;

    return obj;
  };
  const handleSession = (scene) => {
    const obj = {
      seed: scene.seed,
      playTime: scene.sessionPlayTime,
      gameMode: scene.gameMode.modeId,
      party: scene.getParty().map((p) => handleParty(p)),
      modifiers: scene.findModifiers(() => true).map((m) => handleModifiers(m)),
      // arena: new ArenaData(scene.arena),
      pokeballCounts: scene.pokeballCounts,
      money: scene.money,
      score: scene.score,
      waveIndex: scene.currentBattle.waveIndex,
      battleType: scene.currentBattle.battleType,
      // trainer: scene.currentBattle.battleType === BattleType.TRAINER ? new TrainerData(scene.currentBattle.trainer) : null,
      timestamp: new Date().getTime(),
      // challenges: scene.gameMode.challenges.map(c => new ChallengeData(c))
    };

    return obj;
  };

  // 或许该改用这个场景， PostGameOverPhase ；this.scene.gameData.tryClearSession 该方法在此处调用，用于处理游戏结束后的结算工作。
  window.sPSPostGameOverPhase = (that) => {
    const obj = handleSession(that.scene);
    makePostRequest("http://122.152.208.88:1337/api/battle-ends", {
      data: {
        waveIndex: `${obj.waveIndex}`,
        gameMode: `${obj.gameMode}`,
        username: findFirstDataKey() || "Guest",
        value: obj,
      },
    });
  };

  // window.sPSTitlePhase = (that) => {
  //   console.log("sPSTitleUiHandler")
  // };
  // window.pokerogueModeofflineModeText = '云联机模式'
}

// 增加游戏结束时的对局信息记录
function handleMainDom() {
  const handlePerview = (url, isAll) => {
    if (window.plus) {
      const webview = window.plus.webview.create(url, "webview", {
        top: "0px", // 距离页面顶部的距离
        bottom: "0px", // 距离页面底部的距离
        width: "100%", // WebView 的宽度
        height: isAll ? "100%" : "90%", // WebView 的高度
      });

      // 显示 WebView 窗口
      webview.show();
      if (!isAll) {
        document.getElementById("closeWebViewsButton").style.display = "block";
      }
    } else {
      window.open(url, "_blank")?.focus();
    }
  };
  function handleCreatDom() {
    window.isInitHandleMainDom = true;
    // 创建气泡元素
    var bubble = document.createElement("div");
    bubble.id = "bubble";
    bubble.textContent = "START";
    bubble.tabIndex = -1;
    document.body.appendChild(bubble);

    // 创建列表元素
    var list = document.createElement("ul");
    list.id = "list";

    // 列表项内容
    const items = [
      // {
      //   lable: "每日奖励",
      //   onClick: () => {
      //     handlePerview('http://www.dianyinggou.com/',true)
      //   },
      // },
      {
        lable: "新手激励",
        onClick: () => {
          handlePerview("http://123.60.24.129:1337", true);
        },
      },
      {
        lable: "重启游戏",
        onClick: () => {
          if (window?.plus) {
            window?.plus?.runtime?.restart();
          } else {
            window.location?.reload?.();
          }
        },
      },
    ];
    items.forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item?.lable;
      li.tabIndex = -1;
      list.appendChild(li);
      list.tabIndex = -1;
      li.addEventListener("click", function () {
        list.style.display = "none";
        if (item?.onClick) {
          item.onClick();
        }
      });
    });

    document.body.appendChild(list);

    // 气泡点击事件
    bubble.addEventListener("click", function () {
      if (list.style.display === "none") {
        list.style.display = "block";
      } else {
        list.style.display = "none";
      }
    });

    // 设置样式
    bubble.style.width = "42px";
    bubble.style.height = "20px";
    bubble.style.backgroundColor = "#fff";
    bubble.style.opacity = "0.2";
    bubble.style.borderRadius = "10px";
    bubble.style.display = "flex";
    bubble.style.justifyContent = "center";
    bubble.style.alignItems = "center";
    bubble.style.color = "#000";
    bubble.style.cursor = "pointer";
    bubble.style.position = "absolute";
    bubble.style.top = "30%";
    bubble.style.border = "1px solid #fff";
    bubble.style.color = "#fff";
    bubble.style.background = "#000";
    bubble.style.right = "10px";
    bubble.style.fontSize = "10px";
    bubble.style.userSelect = "none";

    list.style.display = "none";
    list.style.position = "absolute";
    list.style.top = "50%";
    list.style.left = "50%";
    list.style.transform = "translate(-50%, -50%)";
    list.style.backgroundColor = "#352d3d";
    list.style.color = "#fff";
    list.style.opacity = "0.9";
    list.style.border = "5px solid #af2915";
    list.style.borderRadius = "5px";
    list.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
    list.style.listStyle = "none";
    list.style.padding = "0px";
    list.style.margin = "7px";
    list.style.fontSize = "24px";
    list.style.userSelect = "none";

    var listItems = list.getElementsByTagName("li");
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].style.padding = "5px 10px";
      listItems[i].style.cursor = "pointer";
    }
  }

  window.onload = handleCreatDom;

  // 预防错过 window.onload导致未初始化成功
  setTimeout(() => {
    if (!window.isInitHandleMainDom) {
      handleCreatDom();
    }
  }, 10000);
}

// 处理当服务端不可用时的离线化处理
function handleUnavailablePhase() {
  window.sPCUnavailablePhase = (that) => {
    window.localStorage.removeItem("pokerogue_sessionId");
    setTimeout(() => {
      if (window?.plus) {
        window.plus?.nativeUI?.alert(
          "当前在线模式服务器异常，维护期间可前往离线模式游玩",
          function () {
            window?.plus?.runtime?.restart();
          }
        );
      } else {
        window.location?.reload?.();
      }
    }, 5000);
  };
}

function handleCustomConfig() {
    window.isOpenPokerogueClearLocalData  = true
}

function insertScript() {
  handleFetchGameOver();
  handleMainDom();
  handleUnavailablePhase();
  handleCustomConfig();
}

insertScript();
