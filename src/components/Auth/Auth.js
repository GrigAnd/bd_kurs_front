import {
  Panel,
  PanelHeader,
  Input,
  FormItem,
  Div,
  Group,
  Button} from "@vkontakte/vkui";
import React from "react";

const Auth = (props) => {
  return (
    <Panel className="scroll" id={props.id}>
      <PanelHeader>
        Авторизация
    </PanelHeader>
      
          <Group>
          <FormItem
              top="Логин"
              // onSubmitCapture={props.auth}
            >
              <Input
                onChange={(e)=>localStorage.setItem("login", e.target.value)}
                maxLength={40}
              />
            </FormItem>
            <FormItem
              top="Пароль"
              // onSubmitCapture={props.auth}
            >
              <Input
                onChange={(e)=>localStorage.setItem("pwd", e.target.value)}
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
          {/* register button */}
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
    </Panel>
  );
};
export default Auth;
