import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../store/actions/index';
import {
  Container,
  Grid,
  Table,
  Segment,
  Breadcrumb,
  Icon,
  Tab,
  Label,
  Card,
  Popup
} from 'semantic-ui-react';
import ReactToPrint from 'react-to-print';
import moment from 'moment';
import FooterLayout from '../components/FooterLayout';
import Aux from '../hoc/Aux';
import Dotdotdot from 'react-clamp-lines';

class LawDetailPage extends Component {
  state = {
    numPages: null,
    pageNumber: 1
  };

  componentWillMount() {
    this.props.onGetLawDetail(this.props.match.params.id);
    this.props.onGetNewestLaw(5);
    this.props.onGetMostViewedLaw(5);
    console.log(this.props.match.params.id);
  }
  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  onPrintClick = () => {};

  render() {
    let lawDetail = this.props.lawDetailResult;
    let newestLaw = this.props.newestLaw;
    let mostViewedLaw = this.props.mostViewedLaw;
    let lawDetailTable = !lawDetail ? null : (
      <Tab.Pane
        ref={el => (this.componentRef = el)}
        style={{ padding: '20px' }}
      >
        <Grid>
          <Grid.Row style={{ fontSize: '1.5em' }}>
            <Icon name="triangle right" />THUỘC TÍNH VĂN BẢN
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <b>
                {lawDetail.class.name} năm{' '}
                {moment(lawDetail.promulgateDate).format('YYYY')}
              </b>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Table celled definition>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <b>Cơ quan ban hành:</b>
                    </Table.Cell>
                    <Table.Cell>{lawDetail.agency.name}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Số hiệu:</b>
                    </Table.Cell>
                    <Table.Cell>{lawDetail.numberSymbol}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Loại văn bản:</b>
                    </Table.Cell>
                    <Table.Cell>{lawDetail.class.name}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Ngày ban hành</b>
                    </Table.Cell>
                    <Table.Cell>
                      {moment(lawDetail.promulgateDate).format('DD/MM/YYYY')}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table celled definition>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <b>Người ký:</b>
                    </Table.Cell>
                    <Table.Cell>{lawDetail.signer}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Tình trạng hiệu lực:</b>
                    </Table.Cell>
                    <Table.Cell>{lawDetail.validityStatus.name}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Ngày bắt đầu có hiệu lực:</b>
                    </Table.Cell>
                    <Table.Cell>
                      {lawDetail.startDate
                        ? moment(lawDetail.startDate).format('DD/MM/YYYY')
                        : 'Chưa xác định'}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Ngày hết hiệu lực:</b>
                    </Table.Cell>
                    <Table.Cell>
                      {lawDetail.endDate
                        ? moment(lawDetail.endDate).format('DD/MM/YYYY')
                        : 'Chưa xác định'}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ fontSize: '1.5em' }}>
            <Icon name="triangle right" />TÓM TẮT VĂN BẢN
          </Grid.Row>
          <Grid.Row style={{ fontSize: '1.2em', paddingLeft: '10px' }}>
            <b>{lawDetail.description}</b>
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    );
    let lawDownload = !lawDetail ? null : (
      <Tab.Pane style={{ padding: '20px' }}>
        <Grid columns={3}>
          <Grid.Column width={6}>
            <h3>
              <Icon name="triangle right" />TẢI VỀ VĂN BẢN TIẾNG VIỆT
            </h3>
            <br />
            <Label fluid href={lawDetail.linkToFile} as="a" color="blue">
              <span style={{ fontSize: '1.4em' }}>
                <Icon name="download" size="big" /> Tải xuống
              </span>
            </Label>
          </Grid.Column>
          <Grid.Column width={4} />
          <Grid.Column width={6}>
            <div
              style={{
                border: 'dashed 1px orange',
                padding: '20px'
              }}
            >
              <span style={{ color: 'red' }}>Ghi chú: </span>
              Để đọc được văn bản tải trên Luatdoanhnghiep.vn,bạn cần cài phần
              mềm đọc file DOC, DOCX và phần mềm đọc file PDF.
            </div>
          </Grid.Column>
        </Grid>
      </Tab.Pane>
    );
    const panes = [
      { menuItem: 'Tóm tắt văn bản', render: () => lawDetailTable },
      { menuItem: 'Tải về', render: () => lawDownload }
    ];
    return (
      <div className="Body">
        <Container>
          <Grid columns={2}>
            <Grid.Column width={12}>
              <Grid.Row>
                <Breadcrumb>
                  <Breadcrumb.Section link as={Link} to="/">
                    <Icon name="home" />Trang chủ
                  </Breadcrumb.Section>
                  <Breadcrumb.Divider icon="right angle" />
                  <Breadcrumb.Section link as={Link} to="/search">
                    Văn bản pháp luật
                  </Breadcrumb.Section>
                </Breadcrumb>
              </Grid.Row>
              <br />
              <Grid.Row style={{ fontSize: '1em' }}>
                <b>{lawDetail && lawDetail.description}</b>
              </Grid.Row>
              <br />
              <Tab panes={panes} />
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>
                <Grid padded="horizontally">
                  <Grid.Row columns={2}>
                    <Grid.Column width={8}>
                      <a href="#">
                        <Icon size="large" color="teal" name="save" />Lưu
                      </a>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <a href="#">
                        <Icon size="large" color="teal" name="mail" />Email
                      </a>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <a href="#">
                        <Icon size="large" color="teal" name="comment" />Góp ý
                      </a>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <ReactToPrint
                        trigger={() => (
                          <a href="#" onClick={this.onPrintClick}>
                            <Icon size="large" color="teal" name="print" />In
                          </a>
                        )}
                        content={() => this.componentRef}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              <Card fluid>
                <Card.Header textAlign="center" className="BlockHeader">
                  <Label color="blue" size="big">
                    Văn bản mới
                  </Label>
                </Card.Header>
                <Card.Content className="BlockContent">
                  <Grid style={{ padding: '10px' }}>
                    {newestLaw.length > 0 &&
                      newestLaw.map(lawDoc => (
                        <Grid.Row style={{ padding: '10px' }} columns={2}>
                          <Grid.Column width={2}>
                            <Icon color = 'blue' name="file text outline" />
                          </Grid.Column>
                          <Grid.Column width={14}>
                            <Popup
                              trigger={
                                <a href={`/laws/${lawDoc._id}`}>
                                  <Dotdotdot
                                    buttons={false}
                                    lines="2"
                                    ellipsis="..."
                                    text={lawDoc.description}
                                  />
                                </a>
                              }
                              content={lawDoc.description}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      ))}
                  </Grid>
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Header textAlign="center" className="BlockHeader">
                  <Label color="blue" size="big">
                    Văn bản được xem nhiều nhất
                  </Label>
                </Card.Header>
                <Card.Content className="BlockContent">
                  <Grid style={{ padding: '10px' }}>
                    {mostViewedLaw.length > 0 &&
                      mostViewedLaw.map(lawDoc => (
                        <Grid.Row style={{ padding: '10px' }} columns={2}>
                          <Grid.Column width={2}>
                            <Icon color='blue' name="file text outline" />
                          </Grid.Column>
                          <Grid.Column width={14}>
                            <Popup
                              trigger={
                                <a href={`/laws/${lawDoc._id}`}>
                                  <Dotdotdot
                                    buttons={false}
                                    lines="2"
                                    ellipsis="..."
                                    text={lawDoc.description}
                                  />
                                </a>
                              }
                              content={lawDoc.description}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      ))}
                  </Grid>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        </Container>
        <FooterLayout />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lawDetailResult: state.laws.lawDetailResult,
    lawDetailLoading: state.laws.lawDetailLoading,
    lawDetailErrMsg: state.laws.lawDetailErrMsg,
    newestLaw: state.laws.newestLaw,
    newestLawLoading: state.laws.newestLawLoading,
    newestLawError: state.laws.newestLawError,
    mostViewedLaw: state.laws.mostViewedLaw,
    mostViewedLawLoading: state.laws.mostViewedLawLoading,
    mostViewedLawError: state.laws.mostViewedLawError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetLawDetail: lawId => dispatch(actions.getLawDetail(lawId)),
    onGetNewestLaw: itemNumber => dispatch(actions.getNewestLaw(itemNumber)),
    onGetMostViewedLaw: itemNumber =>
      dispatch(actions.getMostViewedLaw(itemNumber))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LawDetailPage);
