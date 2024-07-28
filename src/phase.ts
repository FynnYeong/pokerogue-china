import BattleScene from "./battle-scene";

export class Phase {
  protected scene: BattleScene;

  constructor(scene: BattleScene) {
    this.scene = scene;
    console.log("Current-Phase-Type-Constructor【", this?.constructor?.name,"】");
    window?.["sPCAll"]?.(this);
    window?.[`sPC${this?.constructor?.name}`]?.(this);
  }

  start() {
    window?.["sPSAll"]?.(this);
    console.log("Current-Phase-Type-Start【", this?.constructor?.name,"】");
    window?.[`sPS${this?.constructor?.name}`]?.(this);
    console.log(`%cStart Phase ${this.constructor.name}`, "color:green;");
    if (this.scene.abilityBar.shown) {
      this.scene.abilityBar.resetAutoHideTimer();
    }
  }

  end() {
    window?.["sPEAll"]?.(this);
    console.log("Current-Phase-Type-End【", this?.constructor?.name,"】");

    window?.[`sPE${this?.constructor?.name}`]?.(this);
    this.scene.shiftPhase();
  }
}
