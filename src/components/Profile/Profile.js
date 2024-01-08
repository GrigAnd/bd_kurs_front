import {
  Panel,
  PanelHeader,
  Group,
  CellButton} from "@vkontakte/vkui";
import { Icon28DoorArrowRightOutline } from "@vkontakte/icons"
import React from "react";

const Profile = (props) => {

  return (
    <Panel
      className="scroll"
      id={props.id}>
      <PanelHeader>
        Личный кабинет
      </PanelHeader>

      <Group>
        <CellButton
          onClick={props.exit}
          before={<Icon28DoorArrowRightOutline />}
        >Выход
        </CellButton>
      </Group>

    </Panel>
  );
};

export default Profile;