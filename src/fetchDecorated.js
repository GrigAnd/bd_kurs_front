export const get = async (url) => {
  const resp = await fetch(url, {
    'headers': {
      "login": localStorage.getItem('login'),
      "password": localStorage.getItem('pwd')
    },
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
  const json = await resp.json()

  console.log(json)

  return { json: json, status: resp.status }
}

export const post = async (url, body) => {
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
  const json = await resp.json()

  return { json: json, status: resp.status }
}

