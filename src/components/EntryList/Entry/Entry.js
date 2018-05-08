import React, { Component } from 'react';
import {
  Table,
  Popup,
  Icon
} from 'semantic-ui-react';
import moment from 'moment';

class Entry extends Component {

  render() {
    const lawItem = this.props.lawItem;
    return (
      <Table.Row id={lawItem.id}>
        <Table.Cell width={13} textAlign="left">
        <a href={`/search/${lawItem._id}`}>
          <b style={{ paddingBottom: '20px' }}>{lawItem.description}</b>
        </a>
          <p>
            <a href={`/search/${lawItem._id}`}>
              <Popup
                trigger={<Icon name="file text outline" />}
                content="Xem chi tiết"
              />
            </a>
            <a href={lawItem.linkToFile}>
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
              {moment(lawItem.promulgateDate).format('DD/MM/YYYY')}
            </span>
          </p>
          <p>
            Hiệu lực:{' '}
            <span style={{ color: 'orange' }}>{lawItem.validityStatus.name}</span>
          </p>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default Entry;
