import { useState } from "react";
import Character, { iCharacter } from "../../entities/Character";
import { Skill, SkillsDefaultStats } from "../../entities/types";
import SCharacterDisplay from "./style";

export default function CharacterDisplay({ data }) {
  const [editable, setEditable] = useState(false);
  const [entity, setEntity] = useState(new Character(data));

  const enableEdit = () => {
    setEditable(true);
  };
  const resetEdit = () => {
    setEditable(false);
  };
  const saveEdit = () => {
    setEditable(false);
  };

  return (
    <SCharacterDisplay>
      <ul>
        <li>
          STR: {entity.baseStr} ({entity.str})
        </li>
        <li>
          DEX: {entity.baseDex} ({entity.dex})
        </li>
        <li>
          CON: {entity.baseCon} ({entity.con})
        </li>
        <li>
          INT: {entity.baseInt} ({entity.int})
        </li>
        <li>
          WIS: {entity.baseWis} ({entity.wis})
        </li>
        <li>
          CHA: {entity.baseCha} ({entity.cha})
        </li>
      </ul>
      <ul>
        {Object.keys(SkillsDefaultStats).map((skill) => {
          return (
            <li key={skill}>
              {skill}: {entity.mod(skill as Skill)}
            </li>
          );
        })}
      </ul>
      <div>
        {editable ? (
          <>
            <button onClick={resetEdit}>Cancel</button>
            <button onClick={saveEdit}>Save</button>
          </>
        ) : (
          <button onClick={enableEdit}>Edit</button>
        )}
      </div>
    </SCharacterDisplay>
  );
}
