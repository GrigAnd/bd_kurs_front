import React, { useEffect, useState, useRef } from "react";
import {
  View,
  withAdaptivity,
  SplitLayout,
  SplitCol,
  ViewWidth,
  Avatar,
  Snackbar,
  Epic,
  PanelHeader
} from "@vkontakte/vkui";
import {
  Icon16Done,
} from "@vkontakte/icons"


import Sidebar from "./components/Sidebar"
import Tours from "./components/Tour/Tours"
import Tour from "./components/Tour/Tour"
import TourReviews from "./components/Tour/TourReviews"
import Books from "./components/Book/Books"
import Attraction from "./components/Attraction/Attraction"
import Profile from "./components/Profile/Profile"
import Auth from "./components/Auth/Auth"
import Register from "./components/Auth/Register"

import "./styles.css"
import TourRooms from "./components/Tour/TourRooms";

import { get, post } from "./util"
import BooksReview from "./components/Book/BooksReview";

let isPC = true
let booking = ({
  tour_id: null,
  room_books: [],
  make_visa: null
})


export const App = withAdaptivity(({ viewWidth }) => {

  const [popout] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [activeStory, setActiveStory] = useState("auth_view");
  const [activePanel, setActivePanel] = useState("auth_view"); // Ставим начальную панель
  const [activePanelBooks, setActivePanelBooks] = useState("books_view"); // Ставим начальную панель

  const [tours, setTours] = useState(undefined)
  const [countryList, setCountryList] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedTour, setSelectedTour] = useState(null)
  const [selectedAttractionCountry, setSelectedAttractionCountry] = useState(null)
  const [tourInfo, setTourInfo] = React.useState()
  const [reviewTourId, setReviewTourId] = React.useState(null)
  const [whoami, setWhoami] = React.useState({})
  const [isAuthing, setIsAuthing] = React.useState(false)

  function showSnackbar(text) {
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}


      >
        {text}
      </Snackbar>
    );
  }


  function searchTours(sc = selectedCountry) {
    setTours(-1)

    console.log(sc)

    get(`http://localhost:12345/tour/getByCountry?country_id=${sc}`)
      .then((r) => {
        console.log('/tour/getByCountry?country_id=' + sc)
        console.log(r)

        switch (r.status) {
          case 200:
            setTours(r.json)
            break;
          default:
            showSnackbar('Ошибка ' + r.status)
            break;
        }
      })
  }

  function selectTour(idx) {
    setSelectedTour(idx)
    setActivePanel('tour_view')
  }

  function confirmTour(id) {
    booking = ({
      tour_id: id,
      room_books: [],
    })

    console.log(booking)

    setActivePanel('tour_rooms')
  }

  function bookRooms(rooms) {
    booking.room_books = rooms

    post('http://localhost:12345/tour/book', booking).then((r) => {
  
      switch (r.status) {
        case 200:
          setActivePanel('tours_view')
          setActiveStory('books_view')
          break;
        case 409:
          showSnackbar('Уже забронировано')
          break;
        case 500:
          showSnackbar('Уже забронировано')
          break;
        default:
          showSnackbar('Ошибка ' + r.status)
          break;
      }
    }
    )


    // setActivePanel('tours_view')
    // setActiveStory('books_view')
  }

  function goToReviews(id) {
    setActivePanel('tour_reviews_view')
  }

  function nameByCountryId(id) {
    let country = countryList.find((el) => el.value == id)
    return `${country.label} (${country.language})`
  }

  function goToReviewCreator(id) {
    setReviewTourId(id)
    setActivePanelBooks('books_review')
  }

  function updateCountryList() {

    fetch('http://localhost:12345/getCountryList')
      .then((r) => {
        if (r.status == 200) {
          return r.json()
        } else {
          showSnackbar('Ошибка ' + r.status)
        }
      }
      )
      .then((json) => {
        let cl = json.map((el) => {
          return {
            value: el.id,
            label: el.name,
            language: el.language
          }
        }
        )


        setCountryList(cl)

      })
      .catch((e) => {
        console.log(e)
      }
      )




  }


  useEffect(() => {
    setIsAuthing(true)
    updateCountryList()
    checkPassword()
  }, [])



  function showSnackbar(text) {
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
      >
        {text}
      </Snackbar>
    );
  }

  function setTab(tab) {
    setSnackbar(null); // убираем снекбар при переходе
    setActiveStory(tab); // меняем таб
  }

  function exit() {
    localStorage.clear()
    setActivePanel('auth_view')
    setActiveStory('auth_view')
  }


  function checkPassword() {
    if (localStorage.getItem('pwd') == null) {
      setIsAuthing(false)
      return false
    }
    updateWhoami()
  }

  function updateWhoami() {
    get('http://localhost:12345/whoami').then((r) => {
      setIsAuthing(false)

      if (r.status == 200) {
        setWhoami(r.json)
        setActiveStory('tours_view')
        setActivePanel('tours_view')
      } else {
        showSnackbar('Неверный пароль')
      }

      return r.status == 200 ? true : false
    })
  }

  function register(registration) {
    fetch('http://localhost:12345/register', {
      'headers': {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(registration),
      "method": "POST",
      "mode": "cors"
    }).then((r) => {
      if (r.status == 200) {

        localStorage.setItem('login', registration.login)
        localStorage.setItem('pwd', registration.password)

        updateWhoami()
        
      } else {
        showSnackbar('Ошибка ' + r.status)
      }
      return r.status == 200 ? true : false
    })
    .catch((e) => {
      console.log(e)
      showSnackbar('Ошибка ' + e)
    }
    )
  }

  const isDesktop = viewWidth >= ViewWidth.TABLET - 1;

  return (
    <SplitLayout
      style={{ justifyContent: "center" }}
      header={<PanelHeader separator={false} />}
      popout={popout}
    >
      {isDesktop && (activeStory != "auth_view") && (
        <SplitCol fixed width="286px" maxWidth="286px" >
          <Sidebar
            activeStory={activeStory}
            showSnackbar={showSnackbar}
            setTab={setTab}
            activePanel={activePanel}
            snackbar={snackbar}
          />
        </SplitCol>
      )}
      <SplitCol
        animate={!isDesktop}
        spaced={isDesktop}
        width={isDesktop ? "560px" : "100%"}
        maxWidth={isDesktop ? "560px" : "100%"}
      >
        <Epic className="epic" activeStory={activeStory} >
          <View
            id="auth_view"
            activePanel={activePanel}
          >
            <Auth
              id="auth_view"
              auth={checkPassword}
              register={() => setActivePanel("register_view")}
              isAuthing={isAuthing}
              snackbar={snackbar}
            />

            <Register
              id="register_view"
              setActivePanel={setActivePanel}
              setActiveStory={setActiveStory}
              register={register}
              countryList={countryList}
              snackbar={snackbar}
              showSnackbar={showSnackbar}
            />

          </View>
          <View
            id="tours_view"
            activePanel={activePanel}
          >
            <Tours
              id="tours_view"
              tours={tours}
              countryList={countryList}
              searchTours={searchTours}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectTour={selectTour}
              snackbar={snackbar}
              showSnackbar={showSnackbar}
            />
            <Tour
              id="tour_view"
              tour={tours?.[selectedTour]}
              nameByCountryId={nameByCountryId}
              confirmTour={confirmTour}
              goToReviews={goToReviews}
              tourInfo={tourInfo}
              setTourInfo={setTourInfo}
              setActivePanel={setActivePanel}
              snackbar={snackbar}
              showSnackbar={showSnackbar}
            />
            <TourReviews
              id="tour_reviews_view"
              tourInfo={tourInfo}
              setActivePanel={setActivePanel}
              snackbar={snackbar}
              showSnackbar={showSnackbar}
            />
            <TourRooms
              id="tour_rooms"
              booking={booking}
              tour={tours?.[selectedTour]}
              setActivePanel={setActivePanel}
              nameByCountryId={nameByCountryId}
              bookRooms={bookRooms}
              snackbar={snackbar}
              showSnackbar={showSnackbar}
            />
          </View>
          <View
            id="books_view"
            activePanel={activePanelBooks}

          >
            <Books
              id="books_view"
              goToReview={goToReviewCreator}
              snackbar={snackbar}
              showSnackbar={showSnackbar}
            />

            <BooksReview
              id="books_review"
              setActivePanel={setActivePanelBooks}
              reviewTourId={reviewTourId}
              snackbar={snackbar}
              showSnackbar={showSnackbar}
            />


          </View>
          <View
            id="review_view"
            activePanel="review_view"
          >
            <Books
              id="review_view"
              snackbar={snackbar}
              showSnackbar={showSnackbar}
            />
          </View>
          <View
            id="profile_view"
            activePanel="profile_view"
          >
            <Profile
              id="profile_view"
              exit={exit}
              whoami={whoami}
              nameByCountryId={nameByCountryId}
              snackbar={snackbar}
              showSnackbar={showSnackbar}
            />
          </View>
          <View
            id="attraction_view"
            activePanel="attraction_view"
          >
            <Attraction
              id="attraction_view"
              countryList={countryList}
              setSelectedCountry={setSelectedAttractionCountry}
              selectedCountry={selectedAttractionCountry}
              snackbar={snackbar}
              showSnackbar={showSnackbar}
            />
          </View>
        </Epic>

      </SplitCol>
    </SplitLayout>
  );
},
  {
    viewWidth: true,
    sizeX: true,
    sizeY: true
  }
);
