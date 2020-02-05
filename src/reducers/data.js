import { SET_DATA, GET_DATA, SET_S2ID_LIST, GET_S2ID_LIST, GET_COMPANY_LIST, SET_COMPANY_LIST } from '../constants';

const initialState = { data: [], dataReceived: true, S2IDList: [], CompanyList: [] };

export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.data,
        dataReceived: true
      };
    case GET_DATA:
      return {
        ...state,
        dataReceived: false
      }
    case GET_S2ID_LIST:
      return {
        ...state,
        S2IDList: []
      }
    case SET_S2ID_LIST:
      const data = action.data;
      var s2idlist = [];
      for (var i = 0; i < data.length; i++) {
        s2idlist.push({
          key: data[i],
          text: data[i],
          value: data[i]
        });
      }
      return {
        ...state,
        S2IDList: s2idlist
      }
    case GET_COMPANY_LIST:
      return {
        ...state,
        CompanyList: []
      }
    case SET_COMPANY_LIST:
      const cdata = action.data;
      var company = [];
      for (i = 0; i < cdata.length; i++) {
        var temp = cdata[i].replace('+', ' ').replace('%20', ' ');
        company.push({
          key: temp.toLowerCase(),
          text: temp,
          value: temp.toLowerCase().replace(' ', '_')
        });
      }
      return {
        ...state,
        CompanyList: company
      }
    default:
      return state;
  }
}
