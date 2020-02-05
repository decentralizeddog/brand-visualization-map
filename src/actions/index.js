import {
  GET_DATA, SET_DATA,
  GET_S2ID_LIST, SET_S2ID_LIST,
  GET_COMPANY_LIST, SET_COMPANY_LIST
} from '../constants';

export function setData(data) {
  return {
    type: SET_DATA,
    data
  };
}


export function setS2IDList(data) {
  return {
    type: SET_S2ID_LIST,
    data
  }
}

export function setCompanyList(data) {
  return {
    type: SET_COMPANY_LIST,
    data
  }
}
//Sagas
export function getData(searchQuery) {
  return {
    type: GET_DATA,
    searchQuery
  };
}

export function getS2IDlist(level) {
  return {
    type: GET_S2ID_LIST,
    level
  }
}

export function getCompanyList(types) {
  return {
    type: GET_COMPANY_LIST,
    types
  }
}