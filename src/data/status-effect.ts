import * as Utils from "../utils";

export enum StatusEffect {
  NONE,
  POISON,
  TOXIC,
  PARALYSIS,
  SLEEP,
  FREEZE,
  BURN,
  FAINT
}

export class Status {
  public effect: StatusEffect;
  public turnCount: integer;
  public cureTurn: integer;

  constructor(effect: StatusEffect, turnCount: integer = 0, cureTurn?: integer) {
    this.effect = effect;
    this.turnCount = turnCount === undefined ? 0 : turnCount;
    this.cureTurn = cureTurn;
  }

  incrementTurn(): void {
    this.turnCount++;
  }

  isPostTurn(): boolean {
    return this.effect === StatusEffect.POISON || this.effect === StatusEffect.TOXIC || this.effect === StatusEffect.BURN;
  }
}

export function getStatusEffectObtainText(statusEffect: StatusEffect, sourceText?: string): string {
  const sourceClause = sourceText ? ` ${statusEffect !== StatusEffect.SLEEP ? "由" : "从"} ${sourceText}` : "";
  switch (statusEffect) {
    case StatusEffect.POISON:
      return `\n中了毒${sourceClause}！`;
    case StatusEffect.TOXIC:
      return `\n中了剧毒${sourceClause}！`;
    case StatusEffect.PARALYSIS:
      return ` 麻痹了${sourceClause}！\n可能无法行动！`;
    case StatusEffect.SLEEP:
      return `\n睡着了${sourceClause}！`;
    case StatusEffect.FREEZE:
      return `\n被冻住了${sourceClause}！`;
    case StatusEffect.BURN:
      return `\n被烧伤了${sourceClause}！`;
  }

  return "";
}

export function getStatusEffectActivationText(statusEffect: StatusEffect): string {
  switch (statusEffect) {
    case StatusEffect.POISON:
    case StatusEffect.TOXIC:
      return " 中毒了\n正在受伤！";
    case StatusEffect.PARALYSIS:
      return " 麻痹了！\n无法行动！";
    case StatusEffect.SLEEP:
      return " 正在熟睡。";
    case StatusEffect.FREEZE:
      return " 被\n冻住了！";
    case StatusEffect.BURN:
      return " 正在被\n烧伤！";
  }

  return "";
}

export function getStatusEffectOverlapText(statusEffect: StatusEffect): string {
  switch (statusEffect) {
    case StatusEffect.POISON:
    case StatusEffect.TOXIC:
      return " 已经\n中毒了！";
    case StatusEffect.PARALYSIS:
      return " 已经\n麻痹了！";
    case StatusEffect.SLEEP:
      return " 已经\n睡着了！";
    case StatusEffect.FREEZE:
      return " 已经\n冻住了！";
    case StatusEffect.BURN:
      return " 已经\n烧伤了！";
  }

  return "";
}

export function getStatusEffectHealText(statusEffect: StatusEffect): string {
  switch (statusEffect) {
    case StatusEffect.POISON:
    case StatusEffect.TOXIC:
      return " 的\n毒已经治愈了！";
    case StatusEffect.PARALYSIS:
      return " 的\n麻痹已经治愈了！";
    case StatusEffect.SLEEP:
      return " 醒来了！";
    case StatusEffect.FREEZE:
      return " 已经\n解冻了！";
    case StatusEffect.BURN:
      return " 的\n烧伤已经治愈了！";
  }

  return "";
}

export function getStatusEffectDescriptor(statusEffect: StatusEffect): string {
  switch (statusEffect) {
    case StatusEffect.POISON:
    case StatusEffect.TOXIC:
      return "中毒";
    case StatusEffect.PARALYSIS:
      return "麻痹";
    case StatusEffect.SLEEP:
      return "睡眠";
    case StatusEffect.FREEZE:
      return "冻结";
    case StatusEffect.BURN:
      return "烧伤";
  }
}


export function getStatusEffectCatchRateMultiplier(statusEffect: StatusEffect): number {
  switch (statusEffect) {
  case StatusEffect.POISON:
  case StatusEffect.TOXIC:
  case StatusEffect.PARALYSIS:
  case StatusEffect.BURN:
    return 1.5;
  case StatusEffect.SLEEP:
  case StatusEffect.FREEZE:
    return 2.5;
  }

  return 1;
}

/**
* Returns a random non-volatile StatusEffect
*/
export function generateRandomStatusEffect(): StatusEffect {
  return Utils.randIntRange(1, 6);
}

/**
* Returns a random non-volatile StatusEffect between the two provided
* @param statusEffectA The first StatusEffect
* @param statusEffectA The second StatusEffect
*/
export function getRandomStatusEffect(statusEffectA: StatusEffect, statusEffectB: StatusEffect): StatusEffect {
  if (statusEffectA === StatusEffect.NONE || statusEffectA === StatusEffect.FAINT) {
    return statusEffectB;
  }
  if (statusEffectB === StatusEffect.NONE || statusEffectB === StatusEffect.FAINT) {
    return statusEffectA;
  }

  return Utils.randIntRange(0, 2) ? statusEffectA : statusEffectB;
}

/**
* Returns a random non-volatile StatusEffect between the two provided
* @param statusA The first Status
* @param statusB The second Status
*/
export function getRandomStatus(statusA: Status, statusB: Status): Status {
  if (statusA === undefined || statusA.effect === StatusEffect.NONE || statusA.effect === StatusEffect.FAINT) {
    return statusB;
  }
  if (statusB === undefined || statusB.effect === StatusEffect.NONE || statusB.effect === StatusEffect.FAINT) {
    return statusA;
  }


  return Utils.randIntRange(0, 2) ? statusA : statusB;
}

/**
 * Gets all non volatile status effects
 * @returns A list containing all non volatile status effects
 */
export function getNonVolatileStatusEffects():Array<StatusEffect> {
  return [
    StatusEffect.POISON,
    StatusEffect.TOXIC,
    StatusEffect.PARALYSIS,
    StatusEffect.SLEEP,
    StatusEffect.FREEZE,
    StatusEffect.BURN
  ];
}

/**
 * Returns whether a statuss effect is non volatile.
 * Non-volatile status condition is a status that remains after being switched out.
 * @param status The status to check
 */
export function isNonVolatileStatusEffect(status: StatusEffect): boolean {
  return getNonVolatileStatusEffects().includes(status);
}
