import React, {Component} from 'react';
import {Dropdown, Icon, Input, Header, Button, Grid, Segment} from 'semantic-ui-react';

import $ from 'jquery';

class SearchBar extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      advancedOptions: false,
    }
  }

  resetComponent = () => this.setState({isLoading: false, results: []});

  handleSubmitButton(e) {
    e.preventDefault();
    console.log(this.refs.searchInput);
    // this.props.handleSearchSubmit(this.refs.searchInput.value);
  };

  handleOnMouseDown(e){
    // e.preventDefault();
  }

  handleAdvancedSearchButton(e){
    if (!this.state.advancedOptions){
      this.setState({
        advancedOptions: true,
      });
    } else{
      this.setState({
        advancedOptions: false,
      });
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <Header as ='h3' style = {{
          'color':'#1745a3'
        }}>TÌM VĂN BẢN LUẬT VIỆT NAM</Header>
        <Grid>
          <Grid.Column width = {12}>
            <Input fluid size = 'large' className = "SearchInput" ref = 'searchInput'
              icon={
                <Icon color = 'blue' className = 'SearchIcon' name='search' onClick = {this.handleSubmitButton.bind(this)} inverted circular link/>
              }
              placeholder='Nhập nội dung văn bản cần tìm...'
            />
          </Grid.Column>
            <Grid.Column verticalAlign = 'bottom' textAlign = 'left' width = {4}>
              <Button as = 'a' style = {{
                'background':'0',
                'padding':'0'
              }}
              onClick = {this.handleAdvancedSearchButton.bind(this)}>
              {!this.state.advancedOptions &&
                <span>Tìm kiếm nâng cao <Icon name = 'caret down'/></span>
              }
              {this.state.advancedOptions &&
                <span>Thu gọn <Icon name = 'caret up'/></span>
              }
              </Button>
          </Grid.Column>
        </Grid>
        {this.state.advancedOptions &&
          <Segment>Advanced Options</Segment>
        }
      </div>);
  }
}

export default SearchBar;
