import { Skill, SkillsDefaultStats, Stat } from "./types";

export interface iDd5Sheet {
  str?: number;
  dex?: number;
  con?: number;
  int?: number;
  wis?: number;
  cha?: number;
  race?: string;
  classes?: Array<string>;
}

export default class Dd5Sheet {
  private _STR: number = 10;
  private _DEX: number = 10;
  private _CON: number = 10;
  private _INT: number = 10;
  private _WIS: number = 10;
  private _CHA: number = 10;
  private _race: string;
  private _classes: Array<string>;

  constructor(data: iDd5Sheet) {
    this.str = data.str || 10;
    this.dex = data.dex || 10;
    this.con = data.con || 10;
    this.int = data.int || 10;
    this.wis = data.wis || 10;
    this.cha = data.cha || 10;
    this._race = data.race || "Human";
    this._classes = data.classes || ["Warrior"];
  }
  public export() {
    const data: iDd5Sheet = {
      str: this._STR,
      dex: this._DEX,
      con: this._CON,
      int: this._INT,
      wis: this._WIS,
      cha: this._CHA,
      race: this._race,
      classes: this._classes,
    };
    return data;
  }

  public get classes() {
    return this._classes;
  }
  public set addClass(newClass: string) {
    this._classes.push(newClass);
  }

  public get str() {
    return Math.floor((this._STR - 10) / 2);
  }
  public get baseStr() {
    return this._STR;
  }
  public set str(value: number) {
    if (value < 1 || value > 20 || Math.floor(value) !== value) {
      throw new Error("The new strength is invalid");
    }
    this._STR = value;
  }

  public get dex() {
    return Math.floor((this._DEX - 10) / 2);
  }
  public get baseDex() {
    return this._DEX;
  }
  public set dex(value: number) {
    if (value < 1 || value > 20 || Math.floor(value) !== value) {
      throw new Error("The new dexterity is invalid");
    }
    this._DEX = value;
  }

  public get con() {
    return Math.floor((this._CON - 10) / 2);
  }
  public get baseCon() {
    return this._CON;
  }
  public set con(value: number) {
    if (value < 1 || value > 20 || Math.floor(value) !== value) {
      throw new Error("The new constitution is invalid");
    }
    this._CON = value;
  }

  public get int() {
    return Math.floor((this._INT - 10) / 2);
  }
  public get baseInt() {
    return this._INT;
  }
  public set int(value: number) {
    if (value < 1 || value > 20 || Math.floor(value) !== value) {
      throw new Error("The new intelligence is invalid");
    }
    this._INT = value;
  }

  public get wis() {
    return Math.floor((this._WIS - 10) / 2);
  }
  public get baseWis() {
    return this._WIS;
  }
  public set wis(value: number) {
    if (value < 1 || value > 20 || Math.floor(value) !== value) {
      throw new Error("The new wisdom is invalid");
    }
    this._WIS = value;
  }

  public get cha() {
    return Math.floor((this._CHA - 10) / 2);
  }
  public get baseCha() {
    return this._CHA;
  }
  public set cha(value: number) {
    if (value < 1 || value > 20 || Math.floor(value) !== value) {
      throw new Error("The new charisma is invalid");
    }
    this._CHA = value;
  }

  mod(skill: Skill, overrideStat?: Stat) {
    const stat: Stat = overrideStat || (SkillsDefaultStats[skill] as Stat);
    let statMod = 0;
    let skillMod = 0; //TODO
    switch (stat) {
      case "STR":
        statMod = this.str;
        break;
      case "DEX":
        statMod = this.dex;
        break;
      case "CON":
        statMod = this.con;
        break;
      case "INT":
        statMod = this.int;
        break;
      case "WIS":
        statMod = this.wis;
        break;
      case "CHA":
        statMod = this.cha;
        break;
    }

    return statMod + skillMod;
  }

  roll(skill: Skill, overrideStat?: Stat) {
    const die = Math.floor(Math.random() * 20 + 1);
    if (die === 1) return false;
    if (die === 20) return true;

    return die + this.mod(skill, overrideStat);
  }

  rollAdv(skill: Skill, overrideStat?: Stat) {
    const roll1 = this.roll(skill, overrideStat);
    const roll2 = this.roll(skill, overrideStat);

    // Edge case - One die got an edge value
    if (roll1 === false) return roll2;
    if (roll2 === false) return roll1;
    if (roll1 === true || roll2 === true) return true;

    // Nominal case
    return Math.max(roll1, roll2);
  }

  rollDisadv(skill: Skill, overrideStat?: Stat) {
    const roll1 = this.roll(skill, overrideStat);
    const roll2 = this.roll(skill, overrideStat);

    // Edge case - One die got an edge value
    if (roll1 === true) return roll2;
    if (roll2 === true) return roll1;
    if (roll1 === false || roll2 === false) return false;

    // Nominal case
    return Math.min(roll1, roll2);
  }
}
