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
  CustomSelect
} from "@vkontakte/vkui";
import React from "react";

const Tours = (props) => {
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
            onChange={(e) => props.setSelectedCountry(e.target.value)}
            defaultValue={props.selectedCountry}
          />

        </FormItem>
        <Div>
          <Button
            onClick={props.searchTours}
            size="l"
            stretched
            mode="primary"
            disabled={props.selectedCountry == undefined}
          >Подобрать туры
          </Button>
        </Div>
      </Group>


      <Group hidden={props.tours?.length == undefined}>

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
              // before={<Avatar size={72} src={getAvatarUrl('')} />}
              subhead={tour.start_date.slice(0, 10) + " - " + tour.end_date.slice(0, 10)}
              // text="."
              // caption=".."
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
