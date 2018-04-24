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

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/vi';

import 'react-datepicker/dist/react-datepicker.css';
import './SearchBar.css';

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
                <Grid.Row columns={3} divided>
                  <Grid.Column>
                    <DatePicker
                      style={{width: '100%', display: 'block'}}
                      customInput={
                        <Button fluid>
                          {!this.state.startDate && 'Từ ngày '}
                          {this.state.startDate &&
                            this.state.startDate
                              .format('DD/MM/YYYY')
                              .toString()}
                        </Button>
                      }
                      selected={this.state.startDate}
                      onChange={this.onStartDateChange}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <DatePicker
                      
                      selected={this.state.endDate}
                      onChange={this.onEndDateChange}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Dropdown
                      fluid
                      placeholder="Loại văn bản"
                      search
                      selection
                      options={this.lawClass}
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

export default SearchBar;
