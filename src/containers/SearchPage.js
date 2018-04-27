import React, { Component } from 'react';
import EntryList from '../components/EntryList/EntryList';
import SearchBar from '../components/SearchBar';
import {
  Container,
  Segment,
  Table,
  Grid,
  Divider,
  Loader,
  Dimmer,
  Icon,
  Dropdown,
  Pagination,
  Popup
} from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import FooterLayout from '../components/FooterLayout';

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
        signer: signer
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
    let options = [
      { text: '5 văn bản', value: 5 },
      { text: '10 văn bản', value: 10 },
      { text: '15 văn bản', value: 15 },
      { text: '20 văn bản', value: 20 },
      { text: '25 văn bản', value: 25 }
    ];

    let paginationElement = (
      <Grid.Row>
        <Container fluid>
          <span>
            Hiển thị:{' '}
            <Dropdown
              value={this.state.itemPerPage}
              selection
              options={options}
              onChange={this.onPerPageChange}
            />
          </span>
          <Pagination
            floated="right"
            activePage={this.state.pageIndex}
            totalPages={Math.round(
              this.props.totalResult.toFixed(2) / this.state.itemPerPage
            )}
            onPageChange={this.onPageIndexClick}
            ellipsisItem={{
              content: <Icon name="ellipsis horizontal" />,
              icon: true
            }}
            firstItem={{
              content: <Icon name="angle double left" />,
              icon: true
            }}
            lastItem={{
              content: <Icon name="angle double right" />,
              icon: true
            }}
            prevItem={{
              content: <Icon name="angle left" />,
              icon: true
            }}
            nextItem={{
              content: <Icon name="angle right" />,
              icon: true
            }}
          />
        </Container>
      </Grid.Row>
    );
    let resultTable = this.state.firsTime ? null : (
      <Segment>
        {this.props.totalResult > 0 ? (
          <div>
            <b>Tìm thấy </b>
            <i>{this.props.totalResult}</i>
            <b> văn bản</b>
          </div>
        ) : (
          <b>Không có kết quả</b>
        )}
        <Dimmer active={this.props.searchLoading}>
          <Loader content="Đang tải" />
        </Dimmer>
        <Table
          style={{
            border: '0'
          }}
          celled
          column={2}
        >
          <Table.Header>
            {this.props.totalResult > 0 ? <b>KẾT QUẢ TÌM KIẾM</b> : null}
          </Table.Header>
          <Table.Body>
            {this.props.searchResult.map(law => (
              <Table.Row id={law.id}>
                <Table.Cell width={13} textAlign="left">
                  <b style={{ paddingBottom: '20px' }}>{law.description}</b>
                  <p>
                    <a href="#">
                      <Popup
                        trigger={<Icon name="file text outline" />}
                        content="Xem chi tiết"
                      />
                    </a>
                    <a href={law.linkToFile}>
                      <Popup
                        trigger={<Icon name="file pdf outline" />}
                        content="Tải về file pdf"
                      />
                    </a>
                  </p>
                </Table.Cell>
                <Table.Cell width={3}>
                  <p>
                    Ban hành:{' '}
                    <span style={{ color: 'orange' }}>
                      {moment(law.promulgateDate).format('DD/MM/YYYY')}
                    </span>
                  </p>
                  <p>
                    Hiệu lực:{' '}
                    <span style={{ color: 'orange' }}>
                      {law.validityStatus.name}
                    </span>
                  </p>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    );
    return (
      <div className="Body">
        <Container>
          <SearchBar handleSearchSubmit={this.submitSearch} />
          {resultTable}
          {this.props.totalResult > 0 ? paginationElement : null}
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
