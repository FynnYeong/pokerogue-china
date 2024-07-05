function insertScript() {
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
      "Bearer 9d76709d20b624c0b1fd94fd36384732bf1829165d9406851e8066e6195a82c78c970be63b68f16de7971ada69bef990dcca191a8efc821c1d3ce60ec29c3d60b1bc18969e2d15da8486d3c2ef96b4b2020f2bebeeaf7f944ff32df166905d66dbab1c2ca0558d0a4facbc2b0a9d1cdf2fe300c7cdad7787f70bb2990b8f7675"
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

  window.sPCGameOverPhase = (that) => {
    const obj = handleSession(that.scene);
    makePostRequest("http://101.37.161.82:1337/api/battle-ends", {
      data: {
        waveIndex: `${obj.waveIndex}`,
        gameMode: `${obj.gameMode}`,
        username: findFirstDataKey() || "Guest",
        value: obj,
      },
    });
  };

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
  window.onload = function () {
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
  };
}

insertScript();
