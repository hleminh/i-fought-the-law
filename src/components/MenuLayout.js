import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Dropdown,
  Form,
  Grid,
  Icon,
  Image,
  Menu,
  Message,
  Modal
} from 'semantic-ui-react';
import BannerIMG from '../assets/images/banner.png';
import * as actions from '../store/actions/index';

class MenuLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpPassword: '',
      signUpUsername: '',
      signInPassword: '',
      SignInUsername: '',
      newModalOpen: false,
      signUpModalOpen: false,
      signInModalOpen: false,
      origin: '',
      kana: '',
      definition: '',
      tab: '0'
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.setState({ signInModalOpen: false, signUpModalOpen: false });
    }
  }

  handleItemClick = (e, { name }) => {
    this.props.handleMenuItemClick(name);
  };

  handleSignUpCancelButton(e) {
    e.preventDefault();
    this.setState({ signUpModalOpen: false });
    this.props.onAuthReset();
  }

  handleSignInCancelButton(e) {
    e.preventDefault();
    this.setState({ signInModalOpen: false });
    this.props.onAuthReset();
  }

  handleSignUpSubmitButton(e) {
    e.preventDefault();
    const email = this.refs.signUpUsername.value;
    const password = this.refs.signUpPassword.value;
    this.props.onAuth(email, password, true);
  }

  handleSignInSubmitButton(e) {
    e.preventDefault();
    const email = this.refs.signInUsername.value;
    const password = this.refs.signInPassword.value;
    this.props.onAuth(email, password, false);
  }

  handleSignUpModalOpen(e) {
    e.preventDefault();
    this.setState({ signUpModalOpen: true });
  }

  handleSignInModalOpen(e) {
    e.preventDefault();
    this.setState({ signInModalOpen: true });
  }

  render() {
    return (
      <div className="MenuLayout">
        {this.props.isMenuVisible && (
          <Container className="MenuContainer">
            <Grid>
              <Grid.Row style={{ paddingBottom: '0' }}>
                <Grid.Column verticalAlign="middle" width={4} style={{}}>
                  <Image src={BannerIMG} verticalAlign="middle" size="tiny" />
                </Grid.Column>
                <Grid.Column width={12} style={{}}>
                  <Grid.Row>
                    <Menu secondary>
                      <Container>
                        {!this.props.isAuthenticated && (
                          <Modal
                            trigger={
                              <Menu.Item
                                className="MenuItemUpper"
                                as="a"
                                position="right"
                                name="sign_in"
                                onClick={this.handleSignInModalOpen.bind(this)}
                              >
                                <Icon name="sign in" />
                                <strong>Đăng nhập</strong>
                              </Menu.Item>
                            }
                            size="mini"
                            open={this.state.signInModalOpen}
                          >
                            <Modal.Header>Đăng nhập</Modal.Header>
                            <Modal.Content>
                              <Form
                                error={this.props.error != null}
                                onSubmit={this.handleSignInSubmitButton.bind(
                                  this
                                )}
                              >
                                <Message
                                  error
                                  header="Không thể đăng nhập"
                                  content="Đã xảy ra lỗi khi gửi gửi yêu cầu đến server. Xin hãy thử lại."
                                />
                                <Form.Field required>
                                  <label>Email</label>
                                  <input
                                    required
                                    ref="signInUsername"
                                    placeholder="Nhập email"
                                  />
                                </Form.Field>
                                <Form.Field required>
                                  <label>Password</label>
                                  <input
                                    required
                                    ref="signInPassword"
                                    type="password"
                                    placeholder="Nhập password"
                                  />
                                </Form.Field>
                                <Button.Group fluid>
                                  <Button
                                    type="submit"
                                    onClick={this.handleSignInCancelButton.bind(
                                      this
                                    )}
                                  >
                                    Cancel
                                  </Button>
                                  <Button.Or />
                                  <Button type="submit" color="blue">
                                    Submit
                                  </Button>
                                </Button.Group>
                              </Form>
                            </Modal.Content>
                          </Modal>
                        )}
                        {!this.props.isAuthenticated && (
                          <Modal
                            trigger={
                              <Menu.Item
                                className="MenuItemUpper"
                                as="a"
                                name="sign_up"
                                onClick={this.handleSignUpModalOpen.bind(this)}
                              >
                                <Icon name="signup" />
                                <strong>Đăng ký</strong>
                              </Menu.Item>
                            }
                            size="mini"
                            open={this.state.signUpModalOpen}
                          >
                            <Modal.Header>Tạo tài khoản mới</Modal.Header>
                            <Modal.Content>
                              <Form
                                error={this.props.error != null}
                                onSubmit={this.handleSignUpSubmitButton.bind(
                                  this
                                )}
                              >
                                <Message
                                  error
                                  header="Không thể tạo tài khoản"
                                  content="Đã xảy ra lỗi khi gửi gửi yêu cầu đến server. Xin hãy thử lại."
                                />
                                <Form.Field required>
                                  <label>Email</label>
                                  <input
                                    required
                                    ref="signUpUsername"
                                    defaultValue={this.state.signUpUsername}
                                    placeholder="Nhập email"
                                  />
                                </Form.Field>
                                <Form.Field required>
                                  <label>Password</label>
                                  <input
                                    required
                                    ref="signUpPassword"
                                    defaultValue={this.state.signUpPassword}
                                    type="password"
                                    placeholder="Nhập password"
                                  />
                                </Form.Field>
                                <Button.Group fluid>
                                  <Button
                                    type="submit"
                                    onClick={this.handleSignUpCancelButton.bind(
                                      this
                                    )}
                                  >
                                    Cancel
                                  </Button>
                                  <Button.Or />
                                  <Button type="submit" color="blue">
                                    Submit
                                  </Button>
                                </Button.Group>
                              </Form>
                            </Modal.Content>
                          </Modal>
                        )}
                        {this.props.isAuthenticated && (
                          <Menu.Item position="right">
                            <Dropdown
                              item
                              trigger={
                                <span>Xin chào, {this.props.email}</span>
                              }
                            >
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  as="a"
                                  onClick={this.props.onLogout}
                                >
                                  <Icon name="log out" />Đăng xuất
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Menu.Item>
                        )}
                      </Container>
                    </Menu>
                  </Grid.Row>
                  <Grid.Row>
                    <Menu
                      pointing
                      secondary
                      style={{ borderBottom: '2px solid white' }}
                    >
                      <Container>
                        <Menu.Item
                          fitted="horizontally"
                          className="MenuItemLower"
                          active={
                            this.props.activeMenuItem === 'home' ||
                            this.props.activeMenuItem === ''
                          }
                          position="right"
                          as={Link}
                          onClick={this.handleItemClick.bind(this)}
                          to="/"
                          name="home"
                        >
                          <strong>TRANG CHỦ</strong>
                        </Menu.Item>
                        <Menu.Item
                          fitted="horizontally"
                          className="MenuItemLower"
                          active={this.props.activeMenuItem === 'search'}
                          as={Link}
                          onClick={this.handleItemClick.bind(this)}
                          to="/search"
                          name="search"
                        >
                          <strong>TÌM KIẾM LUẬT</strong>
                        </Menu.Item>
                        <Menu.Item
                          fitted="horizontally"
                          className="MenuItemLower"
                          active={this.props.activeMenuItem === 'news'}
                          as={Link}
                          onClick={this.handleItemClick.bind(this)}
                          to="/news"
                          name="news"
                        >
                          <strong>TIN TỨC LUẬT</strong>
                        </Menu.Item>
                        <Menu.Item
                          fitted="horizontally"
                          className="MenuItemLower"
                          active={this.props.activeMenuItem === 'about'}
                          as={Link}
                          onClick={this.handleItemClick.bind(this)}
                          to="/about"
                          name="about"
                        >
                          <strong>LIÊN HỆ</strong>
                        </Menu.Item>
                        {this.props.userAccount && (
                          <Menu.Item
                            fitted="horizontally"
                            className="MenuItemLower"
                            active={this.props.activeMenuItem === 'saved'}
                            as={Link}
                            onClick={this.handleItemClick.bind(this)}
                            to="/saved"
                            name="saved"
                          >
                            <strong>ĐIỀU LUẬT ĐÃ LƯU</strong>
                          </Menu.Item>
                        )}
                      </Container>
                    </Menu>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null,
    email: state.auth.email,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onLogout: () => dispatch(actions.logout()),
    onAuthReset: () => dispatch(actions.authReset())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuLayout);
