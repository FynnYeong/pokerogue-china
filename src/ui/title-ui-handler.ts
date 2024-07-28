import BattleScene, { bypassLogin } from "../battle-scene";
import { DailyRunScoreboard } from "./daily-run-scoreboard";
import OptionSelectUiHandler from "./settings/option-select-ui-handler";
import { Mode } from "./ui";
import * as Utils from "../utils";
import { TextStyle, addTextObject } from "./text";
import {
  getBattleCountSplashMessage,
  getSplashMessages,
} from "../data/splash-messages";
import i18next from "i18next";
import { TimedEventDisplay } from "#app/timed-event-manager.js";

export default class TitleUiHandler extends OptionSelectUiHandler {
  private titleContainer: Phaser.GameObjects.Container;
  private playerCountLabel: Phaser.GameObjects.Text;
  private splashMessage: string;
  private splashMessageText: Phaser.GameObjects.Text;
  private eventDisplay: TimedEventDisplay;

  private titleStatsTimer: NodeJS.Timeout;

  constructor(scene: BattleScene, mode: Mode = Mode.TITLE) {
    super(scene, mode);
  }

  setup() {
    super.setup();

    const ui = this.getUi();

    this.titleContainer = this.scene.add.container(0, -(this.scene.game.canvas.height / 6));
    this.titleContainer.setName("title");
    this.titleContainer.setAlpha(0);
    ui.add(this.titleContainer);

    const logo = this.scene.add.image(
      this.scene.game.canvas.width / 6 / 2,
      8,
      "logo"
    );
    logo.setOrigin(0.5, 0);
    this.titleContainer.add(logo);

    this.dailyRunScoreboard = new DailyRunScoreboard(this.scene, 1, 44);
    this.dailyRunScoreboard.setup();
    this.titleContainer.add(this.dailyRunScoreboard);

    // if (this.scene.eventManager.isEventActive()) {
    //   const event = this.scene.eventManager.activeEvent();
    //   const banner = this.scene.add.image(29, 64, event.bannerFilename);
    //   banner.setName("img-event-banner");
    //   banner.setOrigin(0, 0);
    //   banner.setScale(0.07);
    //   const bannerShadow = this.scene.add.rectangle(
    //     banner.x - 2,
    //     banner.y + 2,
    //     banner.width,
    //     banner.height,
    //     0x484848
    //   );
    //   bannerShadow.setName("rect-event-banner-shadow");
    //   bannerShadow.setScale(0.07);
    //   bannerShadow.setAlpha(0.5);
    //   bannerShadow.setOrigin(0,0);
    //   this.eventTimerText = addTextObject(
    //     this.scene,
    //     banner.x + 8,
    //     banner.y + 100,
    //     this.timeToGo(event.endDate),
    //     TextStyle.WINDOW
    //   );
    //   this.eventTimerText.setName("text-event-timer");
    //   this.eventTimerText.setScale(0.15);
    //   this.eventTimerText.setOrigin(0,0);
    // if (this.scene.eventManager.isEventActive()) {
    //   this.eventDisplay = new TimedEventDisplay(this.scene, 0, 0, this.scene.eventManager.activeEvent());
    //   this.eventDisplay.setup();
    //   this.titleContainer.add(this.eventDisplay);
    // }

    //   this.titleContainer.add(bannerShadow);
    //   this.titleContainer.add(banner);
    //   this.titleContainer.add(this.eventTimerText);
    // }

    this.playerCountLabel = addTextObject(
      this.scene,
      this.scene.game.canvas.width / 6 - 2,
      this.scene.game.canvas.height / 6 - 109,
      `? ${i18next.t("menu:playersOnline")}`,
      TextStyle.MESSAGE,
      { fontSize: "54px" }
    );
    this.playerCountLabel.setOrigin(1, 0);
    this.titleContainer.add(this.playerCountLabel);

    this.splashMessageText = addTextObject(
      this.scene,
      logo.x + 64,
      logo.y + logo.displayHeight - 8,
      "",
      TextStyle.MONEY,
      { fontSize: "54px" }
    );
    this.splashMessageText.setOrigin(0.5, 0.5);
    this.splashMessageText.setAngle(-20);
    this.titleContainer.add(this.splashMessageText);

    const originalSplashMessageScale = this.splashMessageText.scale;

    this.scene.tweens.add({
      targets: this.splashMessageText,
      duration: Utils.fixedInt(350),
      scale: originalSplashMessageScale * 1.25,
      loop: -1,
      yoyo: true,
    });
  }

  updateTitleStats(): void {
    Utils.apiFetch("game/titlestats")
      .then((request) => request.json())
      .then((stats) => {
        this.playerCountLabel.setText(
          `（版本v${this.scene?.game?.manifest?.version?.name || ".dev"}）  ${
            bypassLogin("mode")
              ? "离线模式"
              : `${stats.playerCount} ${i18next.t("menu:playersOnline")} `
          }`
        );
        if (this.splashMessage === getBattleCountSplashMessage()) {
          this.splashMessageText.setText(
            getBattleCountSplashMessage().replace(
              "{COUNT}",
              stats.battleCount.toLocaleString("en-US")
            )
          );
        }
      })
      .catch((err) => {
        console.error("Failed to fetch title stats:\n", err);
      });
  }

  show(args: any[]): boolean {
    const ret = super.show(args);

    if (ret) {
      const info = this.scene?.pokerogueConfig?.messages;



      if (info?.length) {
        localStorage.setItem("pokerouge_messages", JSON.stringify(info));
      }

      const arr =!!this.scene?.pokerogueConfig?.messages ? JSON.parse(localStorage.getItem("pokerouge_messages")||"[]")  : [];
      const list = window?.pokerougeMessagesList ? window?.pokerougeMessagesList?.(arr,info) : arr;

      this.splashMessage = Utils.randItem(getSplashMessages(list));
      this.splashMessageText.setText(
        this.splashMessage.replace("{COUNT}", "?")
      );

      const ui = this.getUi();

      this.dailyRunScoreboard.update();

      // if (this.scene.eventManager.isEventActive()) {
      //   this.updateCountdown();

      //   this.eventTimer = setInterval(() => {
      //     this.updateCountdown();
      //   }, 1000);
      // }
      // if (this.scene.eventManager.isEventActive()) {
      //   this.eventDisplay.show();
      // }

      this.updateTitleStats();

      this.titleStatsTimer = setInterval(() => {
        this.updateTitleStats();
      }, 60000);

      this.scene.tweens.add({
        targets: [this.titleContainer, ui.getMessageHandler().bg],
        duration: Utils.fixedInt(325),
        alpha: (target: any) => (target === this.titleContainer ? 1 : 0),
        ease: "Sine.easeInOut",
      });
    }

    return ret;
  }

  clear(): void {
    super.clear();

    const ui = this.getUi();

    this.eventDisplay?.clear();

    clearInterval(this.titleStatsTimer);
    this.titleStatsTimer = null;

    this.scene.tweens.add({
      targets: [this.titleContainer, ui.getMessageHandler().bg],
      duration: Utils.fixedInt(325),
      alpha: (target: any) => (target === this.titleContainer ? 0 : 1),
      ease: "Sine.easeInOut",
    });
  }
}
