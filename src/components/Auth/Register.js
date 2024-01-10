import { Icon24GlobeOutline } from "@vkontakte/icons";
import {
  Panel,
  PanelHeader,
  Input,
  FormItem,
  CustomSelect,
  Div,
  Group,
  Button,
  SliderSwitch,
  PanelHeaderBack
} from "@vkontakte/vkui";
import React from "react";

const Register = (props) => {
  let registration = {
    first_name: "",
    last_name: "",
    age: 0,
    gender: undefined,
    citizenship_id: "",
    login: "",
    password: "",
  }

  return (
    <Panel className="scroll" id={props.id}>
      <PanelHeader
        left={
          <PanelHeaderBack
            onClick={() => props.setActivePanel("auth_view")}
           />}
      
      >
        Регистрация
      </PanelHeader>

      <Group>

        <FormItem
          top="Имя"
        >
          <Input
            onChange={(e) => registration.first_name = e.target.value}
            maxLength={40}
          />
        </FormItem>

        <FormItem
          top="Фамилия"
        >
          <Input
            onChange={(e) => registration.last_name = e.target.value}
            maxLength={40}
          />
        </FormItem>

        <FormItem

          top="Возраст"
        >
          <Input
            onChange={(e) => registration.age = +e.target.value}
            maxLength={40}
            type="number"
          />
        </FormItem>

        <FormItem
          top="Пол"
        >

          <SliderSwitch
            options={[
              {
                name: 'Мужской',
                value: true,
              },
              {
                name: 'Женский',
                value: false,
              },
            ]}

            onSwitch={(e) => registration.gender = e}
          />

        </FormItem>
        <FormItem
          top="Гражданство"
        >
          <CustomSelect
            before={<Icon24GlobeOutline />}
            placeholder="Введите название страны"
            searchable
            options={props.countryList}
            onChange={(e) => registration.citizenship_id = e.target.value}
          />
        </FormItem>

        <FormItem
          top="Логин"
        >
          <Input
            onChange={(e) => registration.login = e.target.value}
            maxLength={40}
          />
        </FormItem>
        <FormItem
          top="Пароль"
        >
          <Input
            onChange={(e) => registration.password = e.target.value}
            maxLength={40}
            type="password"
          />
        </FormItem>
        <Div>
          <Button
            onClick={() => {
              console.log(registration)
              props.register(registration)
            }}
            size="l"
            stretched
            mode="primary"
          >Зарегистрироваться
          </Button>
        </Div>
      </Group>
    {props.snackbar}
</Panel>
  );
};
export default Register;
