import {
  Panel,
  PanelHeader,
  Text,
  Group,
  Button,
  Header,
  Placeholder,
  RichCell,
  Cell,
  Spinner,
  Div
} from "@vkontakte/vkui";
import { React, useEffect, useState } from "react";
import "../../styles.css"
import { get, ratingToStars } from "../../util";


const Books = (props) => {
  const [tours, setTours] = useState();
  const [rooms, setRooms] = useState();

  function update() {
    setRooms()
    setTours()

    get('http://localhost:12345/getBooks').then((r) => {

      if (r.status == 200) {
        setTours(r.json.tours)
        setRooms(r.json.rooms)

      } else {
        props.showSnackbar('Ошибка ' + r.status)
      }
      return r.status == 200 ? true : false
    })
  }

  function cancelTour(tour_id) {
    get(`http://localhost:12345/cancelTourBook?tour_id=${tour_id}`)
      .then((r) => {
        console.log('/cancelTour?tour_id=' + tour_id)
        console.log(r)
        if (r.status == 200) {
          props.showSnackbar('Тур успешно отменен')
          update()
        } else {
          props.showSnackbar('Ошибка ' + r.status)
        }
      }
      )
  }

  function cancelRoom(date) {
    get(`http://localhost:12345/cancelHotelBook?start_date=${date}`)
      .then((r) => {
        console.log('/cancelRoomBook?date=' + date)
        console.log(r)
        if (r.status == 200) {
          props.showSnackbar('Номер успешно отменен')
          update()
        } else {
          props.showSnackbar('Ошибка ' + r.status)
        }
      }
      )
  }

  useEffect(() => {
    update()
  }, [])

  return (
    <Panel className="scroll" id={props.id}>
      <PanelHeader >
        Бронирование
      </PanelHeader>
      <Group
        header={<Header mode="secondary">Туры</Header>}
      >

        {tours == undefined &&
          <Div>
            <Spinner size="large" />
          </Div>
        }

        {tours?.length == 0 &&
          <Placeholder
            header="Туры не забронированы"
          >
            Сначала забронируйте какой-нибудь тур
          </Placeholder>
        }

        {tours?.length > 0 && tours.map((tour, index) => {

          return (
            <RichCell
              key={index}
              subhead={tour.start_date.slice(0, 10) + " - " + tour.end_date.slice(0, 10)}
              caption={tour.travel_agency_name}
              after={tour.price}
              afterCaption={ratingToStars(tour.satisfaction_level)}
              actions={
                Date.parse(tour.start_date) < Date.now() ?
                  <Button mode="primary" size="s"
                    onClick={() => props.goToReview(tour.id)}
                  >
                    Написать отзыв
                  </Button> :
                  <Button mode="destructive" size="s"
                    onClick={() => cancelTour(tour.id)}
                  >
                    Отменить бронь
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

        {rooms == undefined &&
          <Div>
            <Spinner size="large" />
          </Div>
        }

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
            <RichCell
              key={index}
              subhead={`${room.start_date.slice(0, 10)} - ${room.end_date.slice(0, 10)}`}
              text={`Номер ${room.room_id}, ${room.places} мест`}
              after={room.price}
              actions={
                Date.parse(room.start_date) > Date.now() &&
                <Button mode="destructive" size="s"
                  onClick={() => cancelRoom(room.start_date)}
                >
                  Отменить бронь
                </Button>
              }
              disabled
            >

              {room.hotel_name} ({room.hotel_address})
            </RichCell>


          )
        }
        )}
      </Group>
    
</Panel>
  );
};

export default Books;