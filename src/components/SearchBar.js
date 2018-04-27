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
  lawClassOptions = [];
  agencyOptions = [];
  statusOptions = [];

  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      searchType: 'title',
      isLoading: false,
      results: [],
      advancedOptions: false,
      startDate: null,
      endDate: null,
      lawClass: null,
      agency: null,
      status: null,
      signer: ''
    };
  }

  componentDidMount() {
    this.props.onGetLawClassList();
    this.props.onGetAgencyList();
    this.props.onGetStatusList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lawClassList != this.props.lawClassList) {
      let lawClassOptionNew = nextProps.lawClassList.map(lawClass => {
        return {
          key: lawClass._id,
          value: lawClass._id,
          text: lawClass.name
        };
      });
      this.lawClassOption = [
        { key: 'first', value: 'first', text: 'Loại văn bản' }
      ].concat(lawClassOptionNew);
    }

    if (nextProps.agencyList != this.props.agencyList) {
      let agencyListNew = nextProps.agencyList.map(agency => {
        return {
          key: agency._id,
          value: agency._id,
          text: agency.name
        };
      });
      this.agencyOptions = [
        { key: 'first', value: 'first', text: 'Cơ quan ban hành' }
      ].concat(agencyListNew);
    }

    if (nextProps.validityStatusList != this.props.validityStatusList) {
      let statusOptionNew = nextProps.validityStatusList.map(status => {
        return {
          key: status._id,
          value: status._id,
          text: status.name
        };
      });
      this.statusOptions = [
        { key: 'first', value: 'first', text: 'Tình trạng hiệu lực' }
      ].concat(statusOptionNew);
    }
  }

  resetComponent = () => this.setState({ isLoading: false, results: [] });

  onStartDateChange = date => this.setState({ startDate: date });
  onEndDateChange = date => this.setState({ endDate: date });

  onLawClassChange = (e, data) => this.setState({ lawClass: data.value });
  onAgencyChange = (e, data) => this.setState({ agency: data.value });
  onStatusChange = (e, data) => this.setState({ status: data.value });
  onSignerInputChange = (e, data) => this.setState({ signer: data.value });

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.handleSearchSubmit(
      this.state.keyword,
      this.state.searchType,
      this.state.lawClass,
      this.state.agency,
      this.state.status,
      this.state.signer
    );
  };

  inputSearchChange = (e, ref) => {
    e.preventDefault();
    this.setState({ keyword: ref.value });
  };

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
              <form onSubmit={this.handleSubmitForm}>
                <Input
                  fluid
                  size="large"
                  className="SearchInput"
                  ref="searchInput"
                  onChange={this.inputSearchChange}
                  icon={
                    <Icon
                      color="blue"
                      className="SearchIcon"
                      name="search"
                      onClick={this.handleSubmitForm}
                      inverted
                      circular
                      link
                    />
                  }
                  placeholder="Nhập nội dung văn bản cần tìm..."
                />
              </form>
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
                      noResultsMessage="Không có kết quả"
                      value={this.state.lawClass}
                      onChange={this.onLawClassChange}
                      search
                      selection
                      defaultValue='first'
                      options={this.lawClassOption}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Dropdown
                      fluid
                      placeholder="Cơ quan ban hành"
                      noResultsMessage="Không có kết quả"
                      search
                      onChange={this.onAgencyChange}
                      value={this.state.agency}
                      selection
                      options={this.agencyOptions}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Dropdown
                      fluid
                      placeholder="Tình trạng hiệu lực"
                      noResultsMessage="Không có kết quả"
                      search
                      onChange={this.onStatusChange}
                      value={this.state.status}
                      selection
                      options={this.statusOptions}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Input
                      onChange={this.onSignerInputChange}
                      fluid
                      placeholder="Người ký"
                    />
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetLawClassList: () => dispatch(actions.getLawClassList()),
    onGetAgencyList: () => dispatch(actions.getListAgency()),
    onGetStatusList: () => dispatch(actions.getValidityStatusList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
