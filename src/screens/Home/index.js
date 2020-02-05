import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Dropdown, Checkbox, Radio } from 'semantic-ui-react';

import ClipLoader from 'react-spinners/ClipLoader';

import Map from '../../components/map';

import { getData, getS2IDlist, getCompanyList } from '../../actions';


const place_options = [
  { key: 'atm', text: 'ATM', value: 'atm' },
  { key: 'bus station', text: 'Bus Station', value: 'bus_station' },
  { key: 'train station', text: 'Train Station', value: 'train_station' },
  { key: 'gas station', text: 'Gas Station', value: 'gas_station' },
  { key: 'mosque', text: 'Mosque', value: 'mosque' },
  { key: 'restaurant', text: 'Restaurant', value: 'restaurant' },
  { key: 'convenience store', text: 'Convenience Store', value: 'convenience_store' },
  { key: 'primary school', text: 'Primary School', value: 'primary_school' },
  { key: 'secondary school', text: 'Secondary School', value: 'secondary_school' },
  { key: 'university', text: 'University', value: 'university' },
]


class Home extends Component {
  constructor() {
    super();
    this.state = {
      S2Level: 11,
      S2IDList: [],
      CompanyList: [],

      s2id_currlist: [],
      place_currentlist: [],
      company_currentlist: []
    }

    this.getDataRequest = this.getDataRequest.bind(this);

    this.placeChange = this.placeChange.bind(this);
    this.placeAll = this.placeAll.bind(this);

    this.S2LevelChange = this.S2LevelChange.bind(this);
    this.s2idChange = this.s2idChange.bind(this);
    this.s2idAll = this.s2idAll.bind(this);

    this.companyChange = this.companyChange.bind(this);
  }

  componentDidMount() {
    //Get S2ID list
    this.props.getS2IDlist(this.state.S2Level);
    this.props.getCompanyList(this.state.place_currentlist);
    this.getDataRequest();
  }

  /* */
  async getDataRequest() {

    const searchQuery = {
      s2level: this.state.S2Level,
      s2id_currlist: this.state.s2id_currlist,
      place_currentlist: this.state.place_currentlist,
      company_currentlist: this.state.company_currentlist
    };

    this.props.getData(searchQuery);
  }

  /* Place Type Data Change Handlers */
  placeChange(event, data) {
    this.setState({
      place_currentlist: data.value
    }, () => {
      this.props.getCompanyList(this.state.place_currentlist);
      this.getDataRequest();
    });
  }
  placeAll() {
    this.setState({
      place_currentlist: []
    }, () => {
      this.props.getCompanyList(this.state.place_currentlist);
      this.getDataRequest();
    });
  }
  /* S2Level Chang Handlers */
  S2LevelChange(event, data) {
    this.setState({
      S2Level: data.value,
      s2id_currlist: []
    }, () => {
      this.props.getS2IDlist(this.state.S2Level);
      this.getDataRequest();
    });
  }
  s2idChange(event, data) {
    this.setState({
      s2id_currlist: data.value
    }, () => {
      this.getDataRequest();
    });
  }
  s2idAll() {
    this.setState({
      s2id_currlist: []
    }, () => {
      this.getDataRequest();
    });
  }
  /* Get Company List Data */
  companyChange(event, data) {
    this.setState({
      company_currentlist: data.value
    }, () => {
      this.getDataRequest();
    });
  }
  /* */
  componentWillReceiveProps(nextProp) {
    this.setState({
      S2IDList: nextProp.S2IDList,
      CompanyList: nextProp.CompanyList
    })
  }
  render() {
    const S2IDList = this.state.S2IDList;
    const CompanyList = this.state.CompanyList;

    const s2id_currlist = this.state.s2id_currlist;
    const place_currentlist = this.state.place_currentlist;
    const company_currentlist = this.state.company_currentlist;

    return (
      <div className='dashboard'>
        <div className='controlPanel'>
          <div className='block'>
            <h2>S2ID Selection</h2>
            <h4>S2ID Cell Zoom Level</h4>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: '30px' }}>
              <Radio
                label='11'
                value={11}
                checked={this.state.S2Level === 11}
                onChange={this.S2LevelChange}
              />

              <Radio
                label='12'
                value={12}
                checked={this.state.S2Level === 12}
                onChange={this.S2LevelChange}
              />
              <Radio
                label='13'
                value={13}
                checked={this.state.S2Level === 13}
                onChange={this.S2LevelChange}
              />
              <Radio
                label='14'
                value={14}
                checked={this.state.S2Level === 14}
                onChange={this.S2LevelChange}
              />
            </div>
            <h4>S2ID List</h4>
            <div style={{ marginBottom: '10px' }}>
              {
                s2id_currlist.length !== 0 &&
                <Checkbox
                  label='Enable All Place S2IDs'
                  onChange={this.s2idAll}
                  checked={false}
                />
              }
            </div>
            {
              S2IDList.length !== 0 &&
              <Dropdown placeholder='Place Types' fluid multiple selection search options={S2IDList} value={s2id_currlist} onChange={this.s2idChange} />
            }
          </div>
          <hr />
          <div className='block'>
            <h2>Place Categories</h2>
            <div style={{ marginBottom: '10px' }}>
              {
                place_currentlist.length !== 0 &&
                <Checkbox
                  label='Enable All Place Types'
                  onChange={this.placeAll}
                  checked={false}
                />
              }
            </div>
            <Dropdown placeholder='Place Types' fluid multiple selection search options={place_options} value={place_currentlist} onChange={this.placeChange} />
          </div>
          <hr />
          <div className='block'>
            <h2>Companies</h2>
            <Dropdown placeholder='Place Types' fluid multiple selection search options={CompanyList} value={company_currentlist} onChange={this.companyChange} />
          </div>
          <hr />
          <div style={{ textAlign: 'center' }}>
            <h2> {this.state.s2id_currlist.length === 0 ? this.state.S2IDList.length : this.state.s2id_currlist.length} / {this.state.S2IDList.length}</h2>
            <h2>S2ID Included</h2>
          </div>
        </div>
        <div className='mapPanel'>
          {
            this.props.dataReceived ?
              <Map /> :
              <div className='spinnerContainer'>
                <ClipLoader
                  sizeUnit={"px"}
                  size={100}
                  color={'green'}
                  loading={true}
                />
                <p style={{ marginTop: '15px' }}> It takes for a while ...</p>

              </div>
          }

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataReceived: state.dataReducer.dataReceived,

  CompanyList: state.dataReducer.CompanyList,
  S2IDList: state.dataReducer.S2IDList
});

const mapDispatchToProps = dispatch => ({
  getData: (searchQuery) => dispatch(getData(searchQuery)),
  getS2IDlist: (level) => dispatch(getS2IDlist(level)),
  getCompanyList: (type) => dispatch(getCompanyList(type))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
