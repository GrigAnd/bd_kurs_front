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

import { get, post } from "./fetchDecorated"
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

  const [tours, setTours] = useState()
  const [countryList, setCountryList] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedTour, setSelectedTour] = useState(null)
  const [selectedAttractionCountry, setSelectedAttractionCountry] = useState(null)
  const [tourInfo, setTourInfo] = React.useState()
  const [reviewTourId, setReviewTourId] = React.useState(null)

  function showSnackbar(text) {
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}

      >
        {text}
      </Snackbar>
    );
  }


  function searchTours() {
    console.log(selectedCountry)

    get(`http://localhost:12345/tour/getByCountry?country_id=${selectedCountry}`)
      .then((r) => {
        console.log('/tour/getByCountry?country_id=' + selectedCountry)
        console.log(r)
        if (r.status == 200) {
          setTours(r.json)
        } else {
          setSnackbar('Ошибка ' + r.status)
        }
      })

    // let json = [{
    //   id: 1,
    //   name: "Название тура",
    //   start_date: "01.01.2023",
    //   end_date: "02.01.2023",
    //   satisfaction_level: 4.8,
    //   price: "123456",
    // }]
    // setTours(json)
  }

  function selectTour(idx) {
    setSelectedTour(idx)
    setActivePanel('tour_view')
  }

  function confirmTour(id, isVisa) {
    booking = ({
      tour_id: id,
      room_books: [],
      make_visa: isVisa
    })

    setActivePanel('tour_rooms')
  }

  function bookRooms(rooms) {
    booking.room_books = rooms

    post('http://localhost:12345/tour/book', booking).then((r) => {
      if (r.status == 200) {
        setActivePanel('tours_view')
        setActiveStory('books_view')
      } else {
        setSnackbar('Ошибка ' + r.status)
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
    return countryList.find((el) => el.value == id).label
  }

  function goToReviewCreator(id) {
    setReviewTourId(id)
    setActivePanelBooks('books_review')
  }

  function updateCountryList() {

    let json;

    fetch('http://localhost:12345/getCountryList')
      .then((r) => {
        if (r.status == 200) {
          return r.json()
        } else {
          setSnackbar('Ошибка ' + r.status)
        }
      }
      )
      .then((json) => {
        let cl = json.map((el) => {
          return {
            value: el.id,
            label: el.name
          }
        }
        )


        setCountryList(cl)

      })




  }


  useEffect(() => {
    updateCountryList()
    checkPassword()
  }, [])



  function showSnackbar(text) {
    const blueBackground = {
      backgroundColor: 'var(--accent)' // что это я не знаю, но наверное надо // а нет, всё-таки знаю
    };
    setSnackbar(
      <Snackbar
        className={isPC ? "snack" : "snackMob"}
        onClose={() => setSnackbar(null)}
        before={<Avatar size={24} style={blueBackground}><Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
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
      return false
    }
    get('http://localhost:12345/getBooks').then((r) => {

      if (r.status == 200) {
        setActiveStory('tours_view')
        setActivePanel('tours_view')
      } else {
        setSnackbar('Ошибка ' + r.status)
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

        setActiveStory('tours_view')
        setActivePanel('tours_view')
      } else {
        setSnackbar('Ошибка ' + r.status)
      }
      return r.status == 200 ? true : false
    })
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
            />

            <Register
              id="register_view"
              setActivePanel={setActivePanel}
              setActiveStory={setActiveStory}
              showSnackbar={showSnackbar}
              register={register}
              countryList={countryList}
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
            />
            <Tour
              id="tour_view"
              tour={tours?.[selectedTour]}
              nameByCountryId={nameByCountryId}
              confirmTour={confirmTour}
              goToReviews={goToReviews}
              tourInfo={tourInfo}
              setTourInfo={setTourInfo}
            />
            <TourReviews
              id="tour_reviews_view"
              tourInfo={tourInfo}
              setActivePanel={setActivePanel}
            />
            <TourRooms
              id="tour_rooms"
              booking={booking}
              tour={tours?.[selectedTour]}
              setActivePanel={setActivePanel}
              nameByCountryId={nameByCountryId}
              bookRooms={bookRooms}
            />
          </View>
          <View
            id="books_view"
            activePanel={activePanelBooks}

          >
            <Books
              id="books_view"
              goToReview={goToReviewCreator}
            />

            <BooksReview
              id="books_review"
              setActivePanel={setActivePanelBooks}
              reviewTourId={reviewTourId}
            />


          </View>
          <View
            id="review_view"
            activePanel="review_view"
          >
            <Books
              id="review_view"

            />
          </View>
          <View
            id="profile_view"
            activePanel="profile_view"
          >
            <Profile
              id="profile_view"
              exit={exit}
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
            />
          </View>
        </Epic>
        {snackbar}
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
