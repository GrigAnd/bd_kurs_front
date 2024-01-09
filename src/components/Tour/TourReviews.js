import {
  Panel,
  PanelHeader,
  Div,
  Group,
  Button,
  RichCell,
  Header,
  Separator,
  PanelHeaderBack
} from "@vkontakte/vkui";
import React from "react";

const TourReviews = (props) => {
  return (
    <Panel className="scroll" id={props.id}>
      <PanelHeader
        left={
          <PanelHeaderBack
            onClick={() => props.setActivePanel("tour_view")}
          />}

      >
        Отзывы
      </PanelHeader>

      {props.tourInfo != undefined &&
        <div>
          <Group
            header={<Header>Отзывы</Header>}
          >
            {props.tourInfo.reviews.map((review, index) => {
              let stars = "";
              for (let i = 0; i < review.rating; i++) {
                stars += "☆";
              }

              return (
                <RichCell
                  key={index}
                  // before={<Icon28Profile />}
                  text={review.review_text}
                  subhead={review.datetime.slice(0, 10) + " " + review.src_address}
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
                onClick={() => props.setActivePanel("tour_view")}
              >Назад
              </Button>
            </Div>
          </Group>
        </div>
      }



    
</Panel>
  );
};
export default TourReviews;
