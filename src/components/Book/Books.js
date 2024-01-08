import {
  Panel,
  PanelHeader,
  Text,
  Group,
  Button,
  Header,
  Placeholder,
  RichCell,
  Cell
} from "@vkontakte/vkui";
import { React, useEffect, useState } from "react";
import "../../styles.css"
import { get } from "../../fetchDecorated";


const Books = (props) => {
  const [tours, setTours] = useState();
  const [rooms, setRooms] = useState();

  function updateTours() {


    // setTours([{
    //   id: 1,
    //   name: "Название тура",
    //   start_date: "01.01.2023",
    //   end_date: "02.01.2023",
    //   satisfaction_level: 4.8,
    //   price: "123456",
    // }])

    setTours(tours)
  }

  function updateRooms(rooms) {
    // setRooms([
    //   {
    //     room_number: 101,
    //     hotel_address: 'ffgfdfg',
    //     hotel_id: 1222,
    //     start_date: '1.1.01',
    //     end_date: '1.1.01'
    //   }
    // ])
    setRooms(rooms)
  }

  useEffect(() => {
    get('http://localhost:12345/getBooks').then((r) => {

      if (r.status == 200) {
        setTours(r.json.tours)
        setRooms(r.json.rooms)

      } else {
        setSnackbar('Ошибка ' + r.status)
      }
      return r.status == 200 ? true : false
    })


    updateTours()
    updateRooms()
  }, [])

  return (
    <Panel className="scroll" id={props.id}>
      <PanelHeader >
        Бронирование
      </PanelHeader>
      <Group
        header={<Header mode="secondary">Туры</Header>}
      >
        {tours?.length == 0 &&
          <Placeholder
            // icon={<Icon56InfoOutline />}
            header="Туры не забронированы"
          >
            Сначала забронируйте какой-нибудь тур
          </Placeholder>
        }

        {tours?.length > 0 && tours.map((tour, index) => {
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
                Date.parse(tour.start_date) < Date.now() &&
                <Button mode="primary" size="s"
                  onClick={() => props.goToReview(tour.id)}
                >
                  Написать отзыв
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

      <Group
        header={<Header mode="secondary">Номера</Header>}
      >
        {rooms?.length == 0 &&
          <Placeholder
            // icon={<Icon56InfoOutline />}
            header="Номера не забронированы"
          >
            Сначала забронируйте какой-нибудь номер
          </Placeholder>
        }

        {rooms?.length > 0 && rooms.map((room, index) => {
          return (
            // <RichCell
            //   key={index}
            //   // before={<Avatar size={72} src={getAvatarUrl('')} />}
            //   subhead={room.start_date + " - " + room.end_date}
            //   after={room.room_number}
            //   disabled
            // >

            //   {room.hotel_address}
            // </RichCell>

            <Cell
              key={index}
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
          )
        }
        )}
      </Group>
    </Panel>
  );
};

export default Books;