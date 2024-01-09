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
  Switch,
  PanelHeaderBack
} from "@vkontakte/vkui";
import React, { useEffect } from "react";
import { get, ratingToStars } from "../../util";

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
  }, [])

  return (
    <Panel className="scroll" id={props.id}>
      <PanelHeader
        left={<PanelHeaderBack onClick={() => props.setActivePanel('tours_view')} />}
      >
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
              afterCaption={ratingToStars(props.tour.satisfaction_level)}
              caption={props.tour.travel_agency_name}
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
                  subtitle={trip.datetime_start.replace('T', ' ').replace('Z', ' ').slice(0, 16) + " - " + trip.datetime_end.replace('T', ' ').replace('Z', ' ').slice(0, 16)}
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
                  before={<Icon28Profile style={{ color: guide.gender ? '#447bba' : '#ff00db' }} />}
                  subtitle={guide.age + " лет"}
                  subhead={guide.language.join(', ')}
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
              return (
                <RichCell
                  key={index}
                  text={review.review_text}
                  subhead={review.datetime.slice(0, 10) + " " + review.src_address}
                  after={ratingToStars(review.rating)}
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
