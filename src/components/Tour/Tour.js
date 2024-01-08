import { Icon24GlobeOutline, Icon28BusOutline, Icon28PlaneOutline, Icon28Profile, Icon28TrainOutline } from "@vkontakte/icons";
import {
  Panel,
  PanelHeader,
  Div,
  Group,
  Button,
  RichCell,
  Spinner,
  Header,
  SimpleCell,
  Separator,
  Switch} from "@vkontakte/vkui";
import React, { useEffect } from "react";
import { get } from "../../fetchDecorated";

const tripTypeIcons = {
  Plane: <Icon28PlaneOutline />,
  Train: <Icon28TrainOutline />,
  Bus: <Icon28BusOutline />,
}

const Tour = (props) => {
 
  const [needVisa, setNeedVisa] = React.useState(false)

  useEffect(() => {
    get(`http://localhost:12345/tour/getInfo?tour_id=${props.tour.id}`)
      .then((r) => {
        console.log('/tour/getInfo?tour_id=' + props.tour.id)
        console.log(r)
        props.setTourInfo(r.json)
      })
      

    // props.setTourInfo({
    //   trips: [{
    //     src_country_id: 1,
    //     dst_country_id: 2,
    //     transport_type: "plane",
    //     datetime_start: "2021-05-01T00:00:00",
    //     datetime_end: "2021-05-01T00:00:00",
    //     price: "100",
    //     tour_id: 1,
    //   }],
    //   guides: [{
    //     first_name: "Иван",
    //     last_name: "Иванов",
    //     age: 27,
    //     gender: true,
    //     agency_id: 1,
    //   }],
    //   need_visa: [1, 2, 3],
    //   reviews: [
    //     {
    //       author: {
    //         first_name: "Иван",
    //         last_name: "Иванов",
    //         gender: true,
    //       },
    //       review_text: "Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!",
    //       rating: 5,
    //       datetime: "2021-05-01",
    //       review_src: {
    //         name: "Наше приложение",
    //         type: "app",
    //         address: "https://vk.com/app1234567"
    //       }
    //     },

    //     {
    //       author: {
    //         first_name: "Иван",
    //         last_name: "Иванов",
    //         gender: true,
    //       },
    //       review_text: "Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!",
    //       rating: 5,
    //       datetime: "2021-05-01",
    //       review_src: {
    //         name: "Наше приложение",
    //         type: "app",
    //         address: "https://vk.com/app1234567"
    //       }
    //     },

    //     {
    //       author: {
    //         first_name: "Иван",
    //         last_name: "Иванов",
    //         gender: true,
    //       },
    //       review_text: "Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!",
    //       rating: 5,
    //       datetime: "2021-05-01",
    //       review_src: {
    //         name: "Наше приложение",
    //         type: "app",
    //         address: "https://vk.com/app1234567"
    //       }
    //     },

    //     {
    //       author: {
    //         first_name: "Иван",
    //         last_name: "Иванов",
    //         gender: true,
    //       },
    //       review_text: "Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!Отличный тур!",
    //       rating: 5,
    //       datetime: "2021-05-01",
    //       review_src: {
    //         name: "Наше приложение",
    //         type: "app",
    //         address: "https://vk.com/app1234567"
    //       }
    //     }
    //   ],
    // })
  }, [])
  return (
    <Panel className="scroll" id={props.id}>
      <PanelHeader>
        {props.tour.name}
      </PanelHeader>

      {props.tourInfo == undefined &&
        <Group>
          <Div>
            <Spinner size="large" />
          </Div>
        </Group>
      }

      {props.tourInfo != undefined &&
        <div>
          <Group>
            <RichCell
              subhead={props.tour.start_date.slice(0, 10) + " - " + props.tour.end_date.slice(0, 10)}
              after={props.tour.price}
              afterCaption={props.tour.satisfaction_level}
              disabled
            >
              {props.tour.name}
            </RichCell>
          </Group>
          <Group
            header={<Header>Трансфер</Header>}
          >
            {props.tourInfo.trips?.map((trip, index) => {
              return (
                <SimpleCell
                  key={index}
                  before={tripTypeIcons[trip.transport_type]}
                  subtitle={trip.datetime_start.replace('T', ' ').replace('Z', ' ') + " - " + trip.datetime_end.replace('T', ' ').replace('Z', ' ')}
                  after={trip.price}
                  disabled
                >
                  {props.nameByCountryId(trip.src_country_id)} - {props.nameByCountryId(trip.dst_country_id)}
                </SimpleCell>
              )
            })}
          </Group>
          <Group
            header={<Header>Ваши гиды</Header>}
          >
            {props.tourInfo.guides?.map((guide, index) => {
              return (
                <SimpleCell
                  key={index}
                  before={<Icon28Profile style={{color: guide.gender ? '#447bba' : '#ff00db'}} />}
                  subtitle={guide.age + " лет"}
                  disabled
                >
                  {guide.first_name} {guide.last_name}
                </SimpleCell>
              )
            }

            )}
          </Group>
          <Group
            header={<Header>Необходимые визы</Header>}
          >
            {props.tourInfo.need_visa?.map((country_id, index) => {
              return (
                <SimpleCell
                  key={index}
                  before={<Icon24GlobeOutline />}
                  disabled
                >
                  {props.nameByCountryId(country_id)}
                </SimpleCell>
              )
            }

            )}
            <Separator />
            <SimpleCell after={<Switch
              checked={needVisa}
              onChange={() => setNeedVisa(!needVisa)}
            />}>
              Оформить визы
            </SimpleCell>
          </Group>
          <Group
            header={<Header>Отзывы</Header>}
          >
            {props.tourInfo.reviews?.slice(0, 3)?.map((review, index) => {
              let stars = "";
              for (let i = 0; i < review.rating; i++) {
                stars += "☆";
              }

              return (
                <RichCell
                  key={index}
                  // before={<Icon28Profile />}
                  text={review.review_text}
                  subhead={review.datetime + " " + review.src_name}
                  after={stars}
                  disabled
                  multiline
                >
                  {review.src_name}
                </RichCell>
              )
            }
            )}

            <Separator />
            <Div>
              <Button
                size="l"
                stretched
                mode="secondary"
                onClick={() => props.goToReviews(props.tour.id)}
              >Все отзывы
              </Button>
            </Div>
          </Group>
          <Group>
            <Div>
              <Button
                size="l"
                stretched
                mode="primary"
                onClick={() => props.confirmTour(props.tour.id,)}
              >Продолжить
              </Button>
            </Div>
          </Group>
        </div>
      }



    </Panel>
  );
};
export default Tour;
