import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { Container, Image, Header } from "semantic-ui-react";

class NotFoundPage extends Component {
  componentWillMount() {
    this.props.handleMenuVisibility(false);
  }

  handleBackToHomeClick() {
    this.props.handleMenuVisibility(true);
  }

  render() {
    return (
      <div className = "AboutBody">
        <Container text>
          <Header as="h1">404</Header>
          <p>Trang bạn đang tìm kiếm không tồn tại.</p>
          <br />
          <Link to="/home" onClick={this.handleBackToHomeClick.bind(this)}>
            Trở về trang chủ
          </Link>
        </Container>
      </div>
    );
  }
}

export default NotFoundPage;
