import React, { Component } from 'react';
import {
  Container,
  Dropdown,
  Grid,
  Icon,
  Pagination,
  Segment,
  Table,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import Aux from '../../hoc/Aux';
import Entry from './Entry/Entry';

class EntryList extends Component {
  options = [
    { text: '5 văn bản', value: 5 },
    { text: '10 văn bản', value: 10 },
    { text: '15 văn bản', value: 15 },
    { text: '20 văn bản', value: 20 },
    { text: '25 văn bản', value: 25 }
  ];
  render() {
    let paginationElement = (
      <Grid.Row>
        <Container fluid>
          <span>
            Hiển thị:{' '}
            <Dropdown
              value={this.props.itemPerPage}
              selection
              options={this.options}
              onChange={this.props.onPerPageChange}
            />
          </span>
          <Pagination
            floated="right"
            activePage={this.props.pageIndex}
            totalPages={Math.ceil(
              this.props.totalResult / this.props.itemPerPage
            )}
            onPageChange={this.props.onPageIndexClick}
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
    let titleResult;
    if (this.props.isSearch) {
      titleResult =
        this.props.totalResult > 0 ? (
          <div>
            <b>Tìm thấy </b>
            <i>{this.props.totalResult}</i>
            <b> văn bản</b>
          </div>
        ) : (
          <b>Không có kết quả</b>
        );
    } else {
      titleResult = null;
    }
    let mainContent = (
      <Aux>
        {titleResult}
        {this.props.totalResult > 0 && this.props.isSearch ? (
          <b>KẾT QUẢ TÌM KIẾM</b>
        ) : null}
        <Table style={{ border: '0' }} celled column={2} striped>
          <Table.Body>
            {this.props.searchResult.map(law => (
              <Entry key={law._id} lawItem={law} />
            ))}
          </Table.Body>
        </Table>
      </Aux>
    );
    let wrapContent = this.props.useSegment ? (
      <Segment loading={this.props.searchLoading}>{mainContent}</Segment>
    ) : (
      <Aux>
        <Dimmer inverted active={this.props.searchLoading}>
          <Loader inverted>Đang tải</Loader>
        </Dimmer>
        {mainContent}
      </Aux>
    );
    return (
      <div style={!this.props.useSegment ? { padding: '20px' } : null}>
        {wrapContent}
        {this.props.totalResult > 0 ? paginationElement : null}
      </div>
    );
  }
}

export default EntryList;
