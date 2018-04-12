import React, { Component } from "react";
import {
  Dropdown,
  Icon,
  Input,
  Header,
  Button,
  Grid,
  Segment
} from "semantic-ui-react";

import $ from "jquery";

const chapters = [
  { key: "c1", text: "Chương 1", value: "c1" },
  { key: "c2", text: "Chương 2", value: "c2" },
  { key: "c3", text: "Chương 3", value: "c3" },
  { key: "c4", text: "Chương 4", value: "c4" },
  { key: "c5", text: "Chương 5", value: "c5" },
  { key: "c6", text: "Chương 6", value: "c6" },
  { key: "c7", text: "Chương 7", value: "c7" },
  { key: "c8", text: "Chương 8", value: "c8" },
  { key: "c9", text: "Chương 9", value: "c9" },
  { key: "c10", text: "Chương 10", value: "c10" },
  { key: "c11", text: "Chương 11", value: "c11" },
  { key: "c12", text: "Chương 12", value: "c12" }
];

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      advancedOptions: false
    };
  }

  resetComponent = () => this.setState({ isLoading: false, results: [] });

  handleSubmitButton(e) {
    e.preventDefault();
    console.log(this.refs.searchInput);
    // this.props.handleSearchSubmit(this.refs.searchInput.value);
  }

  handleOnMouseDown(e) {
    // e.preventDefault();
  }

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
        <Header
          as="h3"
          style={{
            color: "#1745a3"
          }}
        >
          TÌM VĂN BẢN LUẬT VIỆT NAM
        </Header>
        <Grid>
          <Grid.Column width={12}>
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
          <Grid.Column verticalAlign="bottom" textAlign="left" width={4}>
            <Button
              as="a"
              style={{
                background: "0",
                padding: "0"
              }}
              onClick={this.handleAdvancedSearchButton.bind(this)}
            >
              {!this.state.advancedOptions && (
                <span>
                  Tìm kiếm nâng cao <Icon name="caret down" />
                </span>
              )}
              {this.state.advancedOptions && (
                <span>
                  Thu gọn <Icon name="caret up" />
                </span>
              )}
            </Button>
          </Grid.Column>
        </Grid>
        {this.state.advancedOptions && (
          <Segment>
            <Header as="h4">
              <Icon color="blue" name="magnify" />Tìm kiếm nâng cao
            </Header>
            <Dropdown
              placeholder="Chọn chương"
              search
              selection
              options={chapters}
            />
          </Segment>
        )}
      </div>
    );
  }
}

export default SearchBar;
