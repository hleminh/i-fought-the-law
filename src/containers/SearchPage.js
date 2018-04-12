import React, { Component } from "react";
import EntryList from "../components/EntryList/EntryList";
import SearchBar from "../components/SearchBar";
import { Container } from "semantic-ui-react";

class SearchPage extends Component {
  render() {
    return (
      <div className="Body">
        <Container>
          <SearchBar
            keyword={this.props.keyword}
            handleSearchSubmit={this.props.handleSearchSubmit}
            onCategoryChange={this.props.onCategoryChange}
            category={this.props.category}
          />
          <EntryList
            userAccount={this.props.userAccount}
            handleDeleteSubmit={this.props.handleDeleteSubmit}
            handleEditSubmit={this.props.handleEditSubmit}
            handleSaveSubmit={this.props.handleSaveSubmit}
            handleUnSaveSubmit={this.props.handleUnSaveSubmit}
            dataList={this.props.dataList}
          />
        </Container>
      </div>
    );
  }
}

export default SearchPage;
