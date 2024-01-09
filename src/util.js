export const get = async (url) => {
  try {
    const resp = await fetch(url, {
      'headers': {
        "login": localStorage.getItem('login'),
        "password": localStorage.getItem('pwd')
      },
      "body": null,
      "method": "GET",
      "mode": "cors"
    })

    try {
      const json = await resp.json()
      console.log(json)

      return { json: json, status: resp.status }
    }
    catch (e) {
      return { json: null, status: resp.status }
    }
  }
  catch (e) {
    return { json: null, status: 'fetch error' }
  }

}

export const post = async (url, body) => {
  try {
    const resp = await fetch(url, {
      'headers': {
        "Content-Type": "application/json",
        "login": localStorage.getItem('login'),
        "password": localStorage.getItem('pwd')
      },
      "body": JSON.stringify(body),
      "method": "POST",
      "mode": "cors"
    })

    try {
      const json = await resp.json()
      console.log(json)

      return { json: json, status: resp.status }
    }
    catch (e) {
      return { json: null, status: resp.status }
    }
  } catch (e) {
    return { json: null, status: 'fetch error' }
  }
}

export const ratingToStars = (rating) => {
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += "☆";
  }
  return String(rating).slice(0, 3) + ' ' + stars
}

