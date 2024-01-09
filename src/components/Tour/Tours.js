import { Icon24GlobeOutline, Icon56InfoOutline } from "@vkontakte/icons";
import {
  Panel,
  PanelHeader,
  FormItem,
  Div,
  Group,
  Button,
  Placeholder,
  RichCell,
  CustomSelect,
  Spinner
} from "@vkontakte/vkui";
import React from "react";

const Tours = (props) => {
  console.log(props.tours)
  return (
    <Panel className="scroll" id={props.id}>
      <PanelHeader>
        Каталог туров
      </PanelHeader>
      <Group>
        <FormItem
          top="В какую страну вы хотите поехать?"
        >

          <CustomSelect
            before={<Icon24GlobeOutline />}
            placeholder="Введите название страны"
            searchable
            options={props.countryList}
            onChange={(e) => {
              props.setSelectedCountry(e.target.value)
              props.searchTours(e.target.value)
            }}
            defaultValue={props.selectedCountry}
          />

        </FormItem>
      </Group>


      <Group>

        {props.tours == -1 &&
          <Div>
            <Spinner size="large" />
          </Div>
        }

        {props.tours == undefined &&
          <Placeholder
            icon={<Icon56InfoOutline />}
            header="Тут пусто"
          >
            Выберите страну чтобы начать поиск
          </Placeholder>
        }

        {props.tours?.length == 0 &&
          <Placeholder
            icon={<Icon56InfoOutline />}
            header="По вашему запросу ничего не найдено"
          >
            Попробуйте изменить параметры поиска
          </Placeholder>
        }

        {props.tours?.length > 0 && props.tours.map((tour, index) => {
          let stars = "";
          for (let i = 0; i < tour.satisfaction_level; i++) {
            stars += "☆";
          }
          return (
            <RichCell
              key={index}
              subhead={tour.start_date.slice(0, 10) + " - " + tour.end_date.slice(0, 10)}
              caption={tour.travel_agency_name}
              after={tour.price}
              afterCaption={tour.satisfaction_level + " " + stars}
              actions={
                <Button mode="primary" size="s"
                  onClick={() => props.selectTour(index)}
                >
                  Выбрать
                </Button>
              }
              disabled
            >
              {tour.name}
            </RichCell>
          )
        }
        )}
      </Group>
    
</Panel>
  );
};
export default Tours;
