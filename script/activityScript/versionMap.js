const versionMap = {};

function insertVersionMapScript() {
  window.sPSLoginPhase = (that) => {
    that.scene.pokerogueConfig = versionMap;
  };
}

insertVersionMapScript();
