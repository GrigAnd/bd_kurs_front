import {
  Panel,
  PanelHeader,
  RichCell,
  Group,
  Div,
  Button,
  FormItem,
  CustomSelect,
  IconButton,
  Header,
  Spinner
} from "@vkontakte/vkui";
import { Icon28FavoriteOutline, Icon24GlobeOutline, Icon28Favorite } from "@vkontakte/icons"
import React from "react";
import { get, post } from "../../util";

const Attraction = (props) => {
  const [attractions, setAttractions] = React.useState()
  const [selectedCountry, setSelectedCountry] = React.useState(0)
  const [favoriteAttractions, setFavoriteAttractions] = React.useState()
  const [isSearch, setIsSearch] = React.useState(false)

  React.useEffect(() => {

    get(`http://localhost:12345/attraction/getWishlist`)
      .then((r) => {
        setFavoriteAttractions(r.json)
      }
      )



  }, [])

  function searchAttractions() {
    setAttractions()
    get(`http://localhost:12345/attraction/getList?country_id=${selectedCountry}`)
      .then((r) => {
        if (r.status == 200) {
          console.log(r)
          setAttractions(r.json)
        } else {
          props.showSnackbar('Ошибка ' + r.status)
        }

      }
      )
    setIsSearch(true)
  }

  function removeFromFavorite(id) {
    setFavoriteAttractions(favoriteAttractions.filter((attraction) => attraction.id != id))
    post(`http://localhost:12345/attraction/removeFromWishlist`, {
      attraction_id: id
    })
      .then((r) => {
        console.log(r)
      }
      )
  }

  function addToFavorite(id) {
    setFavoriteAttractions(favoriteAttractions.concat(attractions.filter((attraction) => attraction.id == id)))
    post(`http://localhost:12345/attraction/addToWishlist`, {
      attraction_id: id
    })
      .then((r) => {
        console.log(r)
      }
      )
  }


  return (
    <Panel
      className="scroll"
      id={props.id}>
      <PanelHeader>
        Достопримечательности
      </PanelHeader>
      <Group>
        <FormItem
          top="В какой стране вы ищите достопримечательность?"
        >

          <CustomSelect
            before={<Icon24GlobeOutline />}
            placeholder="Введите название страны"
            searchable
            options={props.countryList}
            onChange={(e) => setSelectedCountry(e.target.value)}
            defaultValue={selectedCountry}
          />

        </FormItem>
        <Div>
          <Button
            onClick={searchAttractions}
            size="l"
            stretched
            mode="primary"
          // disabled={selectedCountry == undefined}
          >Найти
          </Button>
        </Div>
      </Group>

      {favoriteAttractions == undefined && !isSearch &&
        <Group header={<Header mode="secondary">Избранное</Header>}>
          <Div>
            <Spinner size="large" />
          </Div>
        </Group>
      }


      {favoriteAttractions?.length > 0 && !isSearch &&
        <Group header={<Header mode="secondary">Избранное</Header>}>
          {favoriteAttractions?.map((attraction, index) => {
            return (
              <RichCell
                key={index}
                text={attraction.address}
                subhead={attraction.type}
                caption={attraction.ticket_price}
                after={<IconButton
                  onClick={() => removeFromFavorite(attraction.id)}
                  style={{ color: "var(--accent)" }}
                >
                  <Icon28Favorite />
                </IconButton>}
                multiline
                disabled
              >
                {attraction.name}
              </RichCell>
            )
          })}
        </Group>
      }

      {attractions == undefined && isSearch &&
        <Group header={<Header mode="secondary">Найденные достопримечательности</Header>}>
          <Div>
            <Spinner size="large" />
          </Div>
        </Group>
      }

      {attractions?.length == 0 &&
        <Group hidden={attractions == undefined}>
          <Placeholder
            icon={<Icon56InfoOutline />}
            header="По вашему запросу ничего не найдено"
          >
            Попробуйте изменить параметры поиска
          </Placeholder>
        </Group>
      }

      {attractions?.length > 0 &&
        <Group header={<Header mode="secondary">Найденные достопримечательности</Header>}>
          {attractions.map((attraction, index) => {
            let isFavorite = false
            favoriteAttractions?.map((favoriteAttraction) => {
              if (favoriteAttraction.id == attraction.id) {
                isFavorite = true
              }
            })
            return (
              <RichCell
                key={index}
                text={attraction.address}
                subhead={attraction.type}
                caption={attraction.ticket_price}
                after={<IconButton
                  onClick={() => addToFavorite(attraction.id)}
                  style={{ color: "var(--accent)" }}
                >
                  {isFavorite ? <Icon28Favorite /> : <Icon28FavoriteOutline />}
                </IconButton>}
                multiline
              >
                {attraction.name}
              </RichCell>
            )
          })}
        </Group>
      }

      {isSearch &&
        <Group>
          <Div>
            <Button
              onClick={() => {
                setIsSearch(false)
                setAttractions()
              }}
              size="l"
              stretched
              mode="secondary"
            >Вернуться в избранное
            </Button>
          </Div>
        </Group>}


    </Panel>
  );
};

export default Attraction;