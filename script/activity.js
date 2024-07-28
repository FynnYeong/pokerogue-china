const scriptList = [
  { url: "/script/activityScript/main.js", time: "0727" },
  { url: "/script/activityScript/versionMap.js", time: "0727" },
];

function insertMainScript() {
  const host =
    window?.location?.hostname === "localhost"
      ? "."
      : "https://pokerogue-1319656550.cos.ap-nanjing.myqcloud.com";
  scriptList.forEach((i) => {
    var script = document.createElement("script");
    script.src = host + i.url + "?key=" + i.time;
    document.head.appendChild(script);
  });
}

insertMainScript();
