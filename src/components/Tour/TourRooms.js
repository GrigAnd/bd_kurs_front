import { Icon24GlobeOutline, Icon28BusOutline, Icon28HomeOutline, Icon28PlaneOutline, Icon28Profile, Icon28TrainOutline, Icon56InfoOutline } from "@vkontakte/icons";
import {
  Panel,
  PanelHeader,
  Div,
  Group,
  Text,
  Button,
  Placeholder,
  Spinner,
  Header,
  Cell
} from "@vkontakte/vkui";
import React, { useEffect } from "react";
import { get } from "../../fetchDecorated";


const TourRooms = (props) => {
  const [groupedRooms, setGroupedRooms] = React.useState()
  const [selectedRooms, setSelectedRooms] = React.useState([])
  useEffect(() => {
    get(`http://localhost:12345/tour/freeRooms?tour_id=${props.tour.id}`)
      .then((r) => {
        console.log('/tour/freeRooms?tour_id=' + props.tour.id)
        console.log(r)
        let rooms = r.json

        const grouped = rooms?.reduce((acc, room) => {
          const countryId = room.country_id;
          if (!acc[countryId]) {
            acc[countryId] = [];
          }
          acc[countryId].push(room);
          return acc;
        }, {});

        setGroupedRooms(grouped);
      }
      )




    // let rooms = [
    //   {
    //     room_id: 1,
    //     hotel_id: 1,
    //     hotel_name: "Название отеля",
    //     hotel_address: "Адрес отеля",
    //     rating: 5,
    //     country_id: 1,
    //     start_date: "2021-05-01",
    //     end_date: "2021-05-01",
    //     places: 4,
    //     price: 1000,
    //   }
    // ]

    // Группировка комнат по country_id

  }, []);

  useEffect(() => {
    console.log(selectedRooms)
  }
    , [selectedRooms])


  return (
    <Panel className="scroll" id={props.id}>
      <PanelHeader>
        Доступные номера
      </PanelHeader>
      <Group
        hidden={groupedRooms != undefined && Object.keys(groupedRooms)?.length != 0}
      >
        {groupedRooms == undefined &&

          <Div>
            <Spinner size="large" />
          </Div>

        }

        {groupedRooms != undefined && Object.keys(groupedRooms)?.length == 0 &&

          <Placeholder
            icon={<Icon56InfoOutline />}
            header="Нет доступных номеров"
          >
            В данном туре нет доступных номеров
          </Placeholder>

        }
      </Group>

      {groupedRooms != undefined && Object.keys(groupedRooms)?.length > 0 && Object.keys(groupedRooms).map((countryId) => (
        <Group
          key={countryId}
          header={<Header mode="secondary">{props.nameByCountryId(countryId)}</Header>}
        >
          {groupedRooms[countryId].map((room, index) => (
            <Cell
              key={index}
              selectable
              description={`${room.start_date.slice(0, 10)} - ${room.end_date.slice(0, 10)}`}
              after={room.price}
              onChange={() => {
                if (selectedRooms?.findIndex((r) => r.room_id == room.room_id && r.hotel_id == room.hotel_id) == -1) {
                  setSelectedRooms([...selectedRooms]?.concat({ room_id: room.room_id, hotel_id: room.hotel_id, start_date: room.start_date, end_date: room.end_date }))
                } else {
                  setSelectedRooms([...selectedRooms]?.filter((r) => !(r.room_id == room.room_id && r.hotel_id == room.hotel_id)))
                }
              }
              }
            >
              <Text weight="medium">{room.hotel_name} ({room.hotel_address})</Text>
              <Text weight="regular">Номер {room.room_id}, {room.places} мест</Text>
            </Cell>
          ))}
        </Group>
      ))}

      <Group>
        <Div>
          <Button
            onClick={() => props.bookRooms(selectedRooms)}
            size="l"
            stretched
            mode="primary"
          >Далее
          </Button>
        </Div>
      </Group>


    </Panel>
  );
};
export default TourRooms;
