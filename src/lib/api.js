
const BACKEND_URL = 'http://localhost:4000';


export async function getData(searchQuery) {
  return fetch(BACKEND_URL + '/database/fetchDatabase', {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(searchQuery)
  }).then(response => {
    return response.json();
  });
}

export async function getS2IDList(level) {
  return fetch(BACKEND_URL + '/database/fetchS2IDList', {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ level: level })
  }).then(response => {
    return response.json();
  })
}

export async function getCompanyList(types) {
  return fetch(BACKEND_URL + '/database/fetchCompanyList', {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ types: types })
  }).then(response => {
    return response.json();
  })
}