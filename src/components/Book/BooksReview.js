import {
  Panel,
  PanelHeader,
  FormItem,
  Group,
  Button,
  Div,
  Textarea,
  IconButton
} from "@vkontakte/vkui";
import { React, useState } from "react";
import "../../styles.css"
import { post } from "../../fetchDecorated";
import { Icon28Favorite, Icon28FavoriteOutline } from "@vkontakte/icons";

import './styles.css'


const BooksReview = (props) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  function sendReview() {
    post(`http://localhost:12345/tour/postReview`, {
      tour_id: props.reviewTourId,
      rating: rating,
      text: review
    })
      .then((r) => {
        console.log(r)
        props.setActivePanel("books_view")
      }
      )
  }

  return (
    <Panel className="scroll" id={props.id}>
      <PanelHeader >
        Отзыв
      </PanelHeader>
      <Group>
        
        <FormItem top="Оценка" >
          <Div className="stars">
            {Array.from({ length: 5 }, (_, index) => (
              <IconButton key={index + 1} onClick={() => setRating(index + 1)}>
                {rating >= index + 1 ? (
                  <Icon28Favorite className="star" />
                ) : (
                  <Icon28FavoriteOutline className="star" />
                )}
              </IconButton>
            ))}
          </Div>
        </FormItem>


        <FormItem top="Отзыв">
          <Textarea
            placeholder="Ваш отзыв"
            onChange={(e) => setReview(e.target.value)}
          />
        </FormItem>
      </Group>

      <Group>
        <Div>
          <Button
            size="l"
            stretched
            mode="primary"
            onClick={() => sendReview()}
          >Отправить
          </Button>
        </Div>
      </Group>

    </Panel>
  );
};

export default BooksReview;