import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import EntryList from '../components/EntryList/EntryList';
import FooterLayout from '../components/FooterLayout';
import SearchBar from '../components/SearchBar';
import * as actions from '../store/actions/index';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      itemPerPage: 10,
      keyword: '',
      searchType: 'title',
      lawClass: null,
      agency: null,
      validityStatus: null,
      signer: '',
      firsTime: true
    };
  }

  submitSearch = (
    keyword,
    searchType,
    lawClass,
    agency,
    validityStatus,
    signer
  ) => {
    this.setState(
      {
        keyword: keyword,
        lawClass: lawClass,
        agency: agency,
        validityStatus: validityStatus,
        signer: signer,
        pageIndex: 1
      },
      () => this.searchLaw()
    );
  };

  onPerPageChange = (e, { value }) => {
    this.setState({ itemPerPage: value }, () => this.searchLaw());
  };

  onPageIndexClick = (e, { activePage }) => {
    this.setState({ pageIndex: activePage }, () => this.searchLaw());
  };

  searchLaw = () => {
    this.setState({ firsTime: false });
    this.props.searchLaw(
      this.state.keyword,
      this.state.searchType,
      this.state.pageIndex,
      this.state.itemPerPage,
      this.state.lawClass,
      this.state.agency,
      this.state.validityStatus,
      this.state.signer
    );
  };

  render() {
    return (
      <div className="Body">
        <Container>
          <SearchBar handleSearchSubmit={this.submitSearch} />
          <EntryList
            useSegment={true}
            isSearch={true}
            itemPerPage={this.state.itemPerPage}
            pageIndex={this.state.pageIndex}
            onPerPageChange={this.onPerPageChange}
            totalResult={this.props.totalResult}
            onPageIndexClick={this.onPageIndexClick}
            searchLoading={this.props.searchLoading}
            searchResult={this.props.searchResult}
          />
        </Container>
        <FooterLayout />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResult: state.laws.searchResult,
    searchLoading: state.laws.searchLoading,
    totalResult: state.laws.totalResult
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchLaw: (
      keyword,
      searchType,
      pageIndex,
      itemPerPage,
      lawClass,
      agency,
      validityStatus,
      signer
    ) =>
      dispatch(
        actions.search(
          keyword,
          searchType,
          pageIndex,
          itemPerPage,
          lawClass,
          agency,
          validityStatus,
          signer
        )
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
