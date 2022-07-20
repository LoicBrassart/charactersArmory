import { useState } from "react";
import Dd5Sheet, { iDd5Sheet } from "../../entities/Dd5Sheet";
import { Skill, SkillsDefaultStats } from "../../entities/types";
import SCharacterDisplay from "./style";

//export default function CharacterDisplay({ data }: { data: iCharacter }) { // wtf ?!
interface Dd5SheetDisplayProps {
  data: iDd5Sheet;
}
export default function Dd5SheetDisplay({ data }: Dd5SheetDisplayProps) {
  const [editable, setEditable] = useState(false);
  const [tmp, setTmp] = useState(data);
  const [entity, setEntity] = useState(new Dd5Sheet(data));

  const hEdit = () => {
    setEditable(true);
  };

  const hReset = () => {
    setEditable(false);
    setTmp(entity.export());
  };

  const hSave = (evt) => {
    evt.preventDefault();
    setEditable(false);
    setEntity(new Dd5Sheet(tmp));
  };

  const hChange = (evt) => {
    setTmp({ ...tmp, [evt.target.name]: Number(evt.target.value) });
  };

  return (
    <SCharacterDisplay>
      <form onSubmit={hSave} onReset={hReset}>
        <label htmlFor="str">
          <span>STR</span>
          <input
            type="number"
            name="str"
            value={tmp.str}
            onChange={hChange}
            disabled={!editable}
          />
          {!editable && (
            <span>
              ({entity.str >= 0 && "+"}
              {entity.str})
            </span>
          )}
        </label>
        <label htmlFor="dex">
          <span>DEX</span>
          <input
            type="number"
            name="dex"
            value={tmp.dex}
            onChange={hChange}
            disabled={!editable}
          />
          {!editable && (
            <span>
              ({entity.dex >= 0 && "+"}
              {entity.dex})
            </span>
          )}
        </label>
        <label htmlFor="con">
          <span>CON</span>
          <input
            type="number"
            name="con"
            value={tmp.con}
            onChange={hChange}
            disabled={!editable}
          />
          {!editable && (
            <span>
              ({entity.con >= 0 && "+"}
              {entity.con})
            </span>
          )}
        </label>
        <label htmlFor="int">
          <span>INT</span>
          <input
            type="number"
            name="int"
            value={tmp.int}
            onChange={hChange}
            disabled={!editable}
          />
          {!editable && (
            <span>
              ({entity.int >= 0 && "+"}
              {entity.int})
            </span>
          )}
        </label>
        <label htmlFor="wis">
          <span>WIS</span>
          <input
            type="number"
            name="wis"
            value={tmp.wis}
            onChange={hChange}
            disabled={!editable}
          />
          {!editable && (
            <span>
              ({entity.wis >= 0 && "+"}
              {entity.wis})
            </span>
          )}
        </label>
        <label htmlFor="cha">
          <span>CHA</span>
          <input
            type="number"
            name="cha"
            value={tmp.cha}
            onChange={hChange}
            disabled={!editable}
          />
          {!editable && (
            <span>
              ({entity.cha >= 0 && "+"}
              {entity.cha})
            </span>
          )}
        </label>
        <div className="actions">
          {editable ? (
            <>
              <input type="reset" value="Cancel" />
              <input type="submit" value="Save" />
            </>
          ) : (
            <button className="big" onClick={hEdit}>
              Edit
            </button>
          )}
        </div>
      </form>
      <ul>
        {Object.keys(SkillsDefaultStats).map((skill) => {
          return (
            <li key={skill}>
              {skill}: {entity.mod(skill as Skill)}
            </li>
          );
        })}
      </ul>
    </SCharacterDisplay>
  );
}
