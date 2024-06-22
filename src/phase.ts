import BattleScene from "./battle-scene";

export class Phase {
  protected scene: BattleScene;

  constructor(scene: BattleScene) {

    this.scene = scene;
    window?.["sPCAll"]?.(this);
    window?.[`sPC${this?.constructor?.name}`]?.(this);
  }

  start() {
    window?.["sPSAll"]?.(this);
    window?.[`sPS${this?.constructor?.name}`]?.(this);
    console.log(`%cStart Phase ${this.constructor.name}`, "color:green;");
    if (this.scene.abilityBar.shown) {
      this.scene.abilityBar.resetAutoHideTimer();
    }
  }

  end() {
    window?.["sPEAll"]?.(this);
    window?.[`sPE${this?.constructor?.name}`]?.(this);
    this.scene.shiftPhase();
  }
}
