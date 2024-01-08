import {
  Cell,
  Panel,
  PanelHeader,
  Group,
} from "@vkontakte/vkui";
import React from "react";
import {
  Icon28Profile,
  Icon28BankOutline,
  Icon28HomeOutline,
  Icon28Rectangle2Outline
} from "@vkontakte/icons"

const Sidebar = (props) => {
  return (
    <Panel>
      <PanelHeader>
        {localStorage.getItem("login")}
      </PanelHeader>
      <Group >
        <Cell disabled={"tours_view" === props.activeStory} before={<Icon28Rectangle2Outline width={28} height={28} />} style={"tours_view" === props.activeStory ? { backgroundColor: "var(--button_secondary_background)", borderRadius: 8 } : {}} onClick={() => props.setTab("tours_view")}>Каталог туров</Cell>
        <Cell disabled={"books_view" === props.activeStory} before={<Icon28HomeOutline />} style={"books_view" === props.activeStory ? { backgroundColor: "var(--button_secondary_background)", borderRadius: 8 } : {}} onClick={() => props.setTab("books_view")}>Бронирование</Cell>
        <Cell disabled={"attraction_view" === props.activeStory} before={<Icon28BankOutline />} style={"attraction_view" === props.activeStory ? { backgroundColor: "var(--button_secondary_background)", borderRadius: 8 } : {}} onClick={() => props.setTab("attraction_view")}>Достопримечательности</Cell>
        <Cell disabled={"profile_view" === props.activeStory} before={<Icon28Profile />} style={"profile_view" === props.activeStory ? { backgroundColor: "var(--button_secondary_background)", borderRadius: 8 } : {}} onClick={() => props.setTab("profile_view")}>Личный кабинет</Cell>
      </Group>
    </Panel>
  );
};

export default Sidebar;