import React, { Component } from 'react';
import {
  Card,
  Label,
  Menu,
  Icon,
  Popup,
  Radio,
  Grid,
  Segment,
  Dimmer,
  Loader
} from 'semantic-ui-react';

const popupContentStyle = {
  height: '400px',
  overflowY: 'auto'
};

class RadioCardLayout extends Component {
  state = {
    checkedValue: '',
    value: 'all'
  };


  handleChange = (e, { value }) => {
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    let mainArray = [];
    let popupArray = this.props.data;

    if (this.props.data.length > 4) {
      mainArray = popupArray.slice(0, 4);
      popupArray = popupArray.slice(4, popupArray.length - 1);
    } else {
      mainArray = this.props.data;
    }
    let popupContent = (
      <Grid
        style={popupArray.length > 8 ? popupContentStyle : null}
        celled="internally"
        centered
      >
        {popupArray.map(ele => (
          <Grid.Row key={ele._id} columns={1}>
            <Grid.Column width={16}>
              <Radio
                name={this.props.groupName}
                value={ele._id}
                id={ele._id}
                checked={this.state.value === ele._id}
                label={ele.name}
                onChange={this.handleChange}
              />
            </Grid.Column>
          </Grid.Row>
        ))}
      </Grid>
    );
    return (
      <Card fluid>
        <Card.Header textAlign="center" className="BlockHeader">
          <Label color="blue" size="large">
            {this.props.title}
          </Label>
          {this.props.data.length > 4 && !this.props.loading ? (
            <Popup
              flowing={false}
              trigger={
                <Label as="a" color="blue" size="large">
                  Xem thêm <Icon name="triangle right" />
                </Label>
              }
              on="click"
              position="right center"
            >
              {popupContent}
            </Popup>
          ) : null}
        </Card.Header>
        <Card.Content className="BlockContent">
          <Grid celled="internally" style={{ padding: '10px' }}>
            {this.props.loading && (
              <Dimmer active inverted>
                <Loader inverted content="Đang tải" />
              </Dimmer>
            )}
            {!this.props.loading && (
              <Grid.Row columns={1}>
                <Grid.Column width={16}>
                  <b>
                    <Radio
                      name={this.props.groupName}
                      value={'all'}
                      checked={this.state.value === 'all'}
                      label={`Tất cả ${this.props.title.toLowerCase()}`}
                      onChange={this.handleChange}
                    />
                  </b>
                </Grid.Column>
              </Grid.Row>
            )}

            {mainArray.map(ele => (
              <Grid.Row columns={1} key={ele._id}>
                <Grid.Column width={16}>
                  <b>
                    <Radio
                      name={this.props.groupName}
                      value={ele._id}
                      id={ele._id}
                      checked={this.state.value === ele._id}
                      label={ele.name}
                      onChange={this.handleChange}
                    />
                  </b>
                </Grid.Column>
              </Grid.Row>
            ))}
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}

export default RadioCardLayout;
