import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Table, Label, Image, Dimmer, Loader } from 'semantic-ui-react';

import * as actions from '../store/actions/index';
import USD from '../assets/images/USD.png';
import JPY from '../assets/images/JPY.png';
import EUR from '../assets/images/EUR.png';
import GBP from '../assets/images/GBP.png';
import SGD from '../assets/images/SGD.png';
import AUD from '../assets/images/AUD.png';

class CurrencyCard extends Component {
  componentWillMount() {
    this.props.onGetCurrency();
  }

  render() {
    return (
      <Card fluid color="teal">
        <Card.Header textAlign="center" className="BlockHeader">
          <Label color="blue" size="large">
            Tỷ giá VND
          </Label>
        </Card.Header>
        <Card.Content>
          {this.props.loading && <Dimmer active inverted>
            <Loader inverted content="Đang tải"/>
          </Dimmer>}
          {this.props.data.length > 0 && (
            <Table basic="very" celled columns={2}>
              <Table.Header>
                <Table.Row>
                  <Table.Cell width={6} textAlign="center">
                    <b>Ngoại tệ</b>
                  </Table.Cell>
                  <Table.Cell width={10} textAlign="center">
                    <b>Tỷ giá</b>
                  </Table.Cell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={6} textAlign="center">
                    <Image src={USD} size="mini" /> USD
                  </Table.Cell>
                  <Table.Cell width={10} textAlign="center">
                    {this.props.data[0].USD_VND.val}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={6} textAlign="center">
                    <Image src={JPY} size="mini" />JPY
                  </Table.Cell>
                  <Table.Cell width={10} textAlign="center">
                    {this.props.data[1].JPY_VND.val}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={6} textAlign="center">
                    <Image src={EUR} size="mini" /> EUR
                  </Table.Cell>
                  <Table.Cell width={10} textAlign="center">
                    {this.props.data[2].EUR_VND.val}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={6} textAlign="center">
                    <Image src={GBP} size="mini" /> GBP
                  </Table.Cell>
                  <Table.Cell width={10} textAlign="center">
                    {this.props.data[3].GBP_VND.val}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={6} textAlign="center">
                    <Image src={SGD} size="mini" /> SGD
                  </Table.Cell>
                  <Table.Cell width={10} textAlign="center">
                    {this.props.data[4].SGD_VND.val}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={6} textAlign="center">
                    <Image src={AUD} size="mini" /> AUD
                  </Table.Cell>
                  <Table.Cell width={10} textAlign="center">
                    {this.props.data[5].AUD_VND.val}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          )}
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.currency.result,
    loading: state.currency.loading,
    error: state.currency.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCurrency: () => dispatch(actions.getCurrency())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyCard);
