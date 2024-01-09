import {
  Panel,
  PanelHeader,
  Group,
  CellButton,
  MiniInfoCell
} from "@vkontakte/vkui";
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
        <MiniInfoCell
          before="Имя"
          textLevel="primary"
        >
          {props.whoami.first_name}
        </MiniInfoCell>
        <MiniInfoCell
          before="Фамилия"
          textLevel="primary"
        >
          {props.whoami.last_name}
        </MiniInfoCell>
        <MiniInfoCell
          before="Возраст"
          textLevel="primary"
        >
          {props.whoami.age}
        </MiniInfoCell>
        <MiniInfoCell
          before="Пол"
          textLevel="primary"
        >
          {props.whoami.gender ? "Мужской" : "Женский"}
        </MiniInfoCell>
        <MiniInfoCell
          before="Страна"
          textLevel="primary"
        >
          {props.nameByCountryId(props.whoami.country_id)}
        </MiniInfoCell>
      </Group>


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