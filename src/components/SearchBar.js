import React, { Component } from 'react';
import {
  Dropdown,
  Icon,
  Input,
  Header,
  Button,
  Grid,
  Radio,
  Segment,
  Label,
  Form
} from 'semantic-ui-react';

import * as actions from '../store/actions/index';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/vi';

import 'react-datepicker/dist/react-datepicker.css';
import './SearchBar.css';
import classes from './SearchBar.css';
import { connect } from 'react-redux';

class SearchBar extends Component {
  lawClass = [
    { key: 'TT', value: 'TT', text: 'Thông tư' },
    { key: 'QD', value: 'TT', text: 'Quyết định' }
  ];

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      advancedOptions: false,
      searchType: 'title',
      startDate: null,
      endDate: null
    };
  }

  componentDidMount(){
    this.props.onGetLawClassList();
    this.props.onGetAgencyList();
    this.props.onGetStatusList();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.lawClassList !== this.props.lawClassList){
      console.log(nextProps.lawClassList);
      let lawClassOption = nextProps.lawClassList.map(lawClass => {
        return {
          key: lawClass.id,
          value: lawClass.id,
          text: lawClass.name
        }
      });
      console.log(lawClassOption);
    }
  }

  resetComponent = () => this.setState({ isLoading: false, results: [] });

  onStartDateChange = date => this.setState({ startDate: date });
  onEndDateChange = date => this.setState({ endDate: date });

  handleSubmitButton(e) {
    e.preventDefault();
    console.log(this.refs.searchInput);
    // this.props.handleSearchSubmit(this.refs.searchInput.value);
  }

  handleOnMouseDown(e) {
    // e.preventDefault();
  }

  handleSearchRadioChange = (e, { value }) =>
    this.setState({ searchType: value });

  handleAdvancedSearchButton(e) {
    if (!this.state.advancedOptions) {
      this.setState({
        advancedOptions: true
      });
    } else {
      this.setState({
        advancedOptions: false
      });
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <Header as="h3" style={{ color: '#1745a3' }}>
          TÌM VĂN BẢN LUẬT VIỆT NAM
        </Header>
        <Segment>
          <Grid>
            <Grid.Column width={16}>
              <Input
                fluid
                size="large"
                className="SearchInput"
                ref="searchInput"
                icon={
                  <Icon
                    color="blue"
                    className="SearchIcon"
                    name="search"
                    onClick={this.handleSubmitButton.bind(this)}
                    inverted
                    circular
                    link
                  />
                }
                placeholder="Nhập nội dung văn bản cần tìm..."
              />
            </Grid.Column>
            <div style={{ margin: '10px' }}>
              <Button
                as="a"
                style={{ background: '0', padding: '0' }}
                onClick={this.handleAdvancedSearchButton.bind(this)}
              >
                <span>
                  Tìm kiếm nâng cao <Icon name="caret down" />
                </span>
              </Button>
              <Radio
                style={{ marginLeft: '10px' }}
                value="title"
                label="Tiêu đề"
                checked={this.state.searchType === 'title'}
                onChange={this.handleSearchRadioChange}
              />
              <Radio
                style={{ marginLeft: '10px' }}
                value="number"
                label="Số hiệu văn bản"
                checked={this.state.searchType === 'number'}
                onChange={this.handleSearchRadioChange}
              />
            </div>
          </Grid>
          {this.state.advancedOptions && (
            <div style={{ margin: '10px' }}>
              <Grid>
                <Grid.Row columns={4} divided>
                  
                  <Grid.Column>
                    <Dropdown
                      fluid
                      placeholder="Loại văn bản"
                      search
                      selection
                      options={this.props.lawClassList.map(lawClass => {
                        return {
                          key: lawClass.id,
                          value: lawClass.id,
                          text: lawClass.name
                        }
                      })}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Dropdown
                      fluid
                      placeholder="Cơ quan ban hành"
                      search
                      selection
                      options={this.props.agencyList.map(agency => {
                        return {
                          key: agency.id,
                          value: agency.id,
                          text: agency.name
                        }
                      })}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Dropdown
                      fluid
                      placeholder="Tình trạng hiệu lực"
                      search
                      selection
                      options={this.props.validityStatusList.map(status => {
                        return {
                          key: status.id,
                          value: status.id,
                          text: status.name
                        }
                      })}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Input fluid placeholder='Người ký'/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          )}
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lawClassList: state.laws.lawClassList,
    lawClassLoading: state.laws.lawClassLoading,
    agencyList: state.laws.agencyList,
    agencyListLoading: state.laws.agencyListLoading,
    validityStatusList: state.laws.validityStatusList,
    statusListLoading: state.laws.statusListLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetLawClassList: () => dispatch(actions.getLawClassList()),
    onGetAgencyList: () => dispatch(actions.getListAgency()),
    onGetStatusList: () => dispatch(actions.getValidityStatusList())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
