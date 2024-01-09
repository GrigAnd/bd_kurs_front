import {
  Panel,
  PanelHeader,
  Input,
  FormItem,
  Div,
  Group,
  Button,
  ScreenSpinner
} from "@vkontakte/vkui";
import React from "react";

const Auth = (props) => {
  return (
    <Panel className="scroll" id={props.id}>
      <PanelHeader>
        Авторизация
      </PanelHeader>
      {props.isAuthing &&
        <ScreenSpinner size="large" />
      }

      <Group>
        <FormItem
          top="Логин"
        >
          <Input
            onChange={(e) => localStorage.setItem("login", e.target.value)}
            maxLength={40}
          />
        </FormItem>
        <FormItem
          top="Пароль"
        >
          <Input
            onChange={(e) => localStorage.setItem("pwd", e.target.value)}
            maxLength={40}
            type="password"
          />
        </FormItem>
        <Div>
          <Button
            onClick={props.auth}
            size="l"
            stretched
            mode="primary"
          >Войти
          </Button>
        </Div>
      </Group>
      <Group>
        <Div>
          <Button
            onClick={props.register}
            size="l"
            stretched
            mode="secondary"
          >Регистрация
          </Button>
        </Div>
      </Group>
      {props.snackbar}
    </Panel>
  );
};
export default Auth;
