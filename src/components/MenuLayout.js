import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {
  Container,
  Image,
  Menu,
  Modal,
  Button,
  Form,
  Tab,
  Message,
  Dropdown,
  Grid,
  Icon,
} from 'semantic-ui-react';

import BannerIMG from '../assets/images/banner.png';

class MenuLayout extends Component {
  constructor(props){
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
      tab: '0',
      activeItem: 'home',
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleNewCancelButton(e){
    e.preventDefault();
    this.setState({newModalOpen: false})
  }

  handleSignUpCancelButton(e){
    e.preventDefault();
    this.setState({signUpModalOpen: false})
  }

  handleSignInCancelButton(e){
    e.preventDefault();
    this.setState({signInModalOpen: false})
  }

  handleNewSubmitButton(e){
    e.preventDefault();
    this.setState({
      newModalOpen: false,
    });
    var newData = {
      origin: this.state.origin,
      kana: this.state.kana,
      definition: JSON.parse(this.state.definition),
    }
    var category = (this.state.tab === "0") ? 'jpn_vie' : 'vie_jpn';
    this.props.handleNewSubmit(newData, category, (success, oldData) => {
      if (success){
        this.setState({
          origin: '',
          kana: '',
          definition: '',
          tab: '0',
        });
      } else{
        this.setState({
          origin: oldData.origin,
          kana: oldData.kana,
          definition: oldData.definition
        });
        this.setState({newModalOpen: true});
      }
    });
  }

  handleSignUpSubmitButton(e){
    e.preventDefault();
    this.setState({
      signUpModalOpen: false,
    });
    var newData = {
      username: this.refs.signUpUsername.value,
      password: this.refs.signUpPassword.value,
    }
    this.props.handleSignUpSubmit(newData, (success, oldData) => {
      if (success){
        this.setState({
          signUpPassword: '',
          signUpUsername: '',
        });
      } else{
        this.setState({
          signUpPassword: oldData.password,
          signUpUsername: oldData.username,
        });
        this.setState({signUpModalOpen: true});
      }
    });
  }

  handleSignInSubmitButton(e){
    e.preventDefault();
    this.setState({
      signInModalOpen: false,
    });
    var newData = {
      username: this.refs.signInUsername.value,
      password: this.refs.signInPassword.value,
    }
    this.props.handleSignInSubmit(newData, (success, oldData) => {
      if (success){
        this.setState({
          signInPassword: '',
          signInUsername: '',
        });
      } else{
        this.setState({
          signInPassword: oldData.password,
          signInUsername: oldData.username,
        });
        this.setState({signInModalOpen: true});
      }
    });
  }

  handleNewModalOpen(e){
    e.preventDefault();
    this.setState({newModalOpen: true});
  }

  handleSignUpModalOpen(e){
    e.preventDefault();
    this.setState({signUpModalOpen: true});
  }

  handleSignInModalOpen(e){
    e.preventDefault();
    this.setState({signInModalOpen: true});
  }

  handleOriginChange(e){
    console.log(e.target.value);
    this.setState({origin: e.target.value})
  }

  handleKanaChange(e){
    console.log(e.target.value);
    this.setState({kana: e.target.value})
  }

  handleDefinitionChange(e){
    console.log(e.target.value);
    this.setState({definition: e.target.value})
  }

  handleTabChange(e, data){
    console.log(data.activeIndex);
    this.setState({tab: data.activeIndex});
  }

  render() {
    const { activeItem } = this.state

    const panes = [
      { menuItem: 'Nhật - Việt', render: () =>
        <Tab.Pane attached={false}>
          <Form.Field required>
            <label>Origin</label>
            <input required ref="origin" placeholder='Nhập chữ' defaultValue={this.state.origin} onChange={this.handleOriginChange.bind(this)}/>
          </Form.Field>
          <Form.Field required>
            <label>Kana</label>
            <input required ref="kana" placeholder='Nhập kana' defaultValue={this.state.kana} onChange={this.handleKanaChange.bind(this)}/>
          </Form.Field>
          <Form.Field required>
            <label>Definition</label>
            <input required ref="definition" placeholder='Nhập nghĩa' defaultValue={JSON.stringify(this.state.definition)} onChange={this.handleDefinitionChange.bind(this)}/>
          </Form.Field>
        </Tab.Pane>},
      { menuItem: 'Việt - Nhật', render: () =>
        <Tab.Pane attached={false}>
          <Form.Field required>
            <label>Origin</label>
            <input required ref="origin" placeholder='Nhập chữ' defaultValue={this.state.origin} onChange={this.handleOriginChange.bind(this)}/>
          </Form.Field>
          <Form.Field required>
            <label>Kana</label>
            <input required ref="kana" placeholder='Nhập chữ không dấu' defaultValue={this.state.kana} onChange={this.handleKanaChange.bind(this)}/>
          </Form.Field>
          <Form.Field required>
            <label>Definition</label>
            <input required ref="definition" placeholder='Nhập nghĩa' defaultValue={JSON.stringify(this.state.definition)} onChange={this.handleDefinitionChange.bind(this)}/>
          </Form.Field>
        </Tab.Pane> },
    ]

    return (<div className="MenuLayout">
      <Container className= "MenuContainer">
        <Grid>
         <Grid.Row style = {{
           'paddingBottom':'0'
         }}>
           <Grid.Column verticalAlign = 'middle' width={4} style = {{
           }}>
            <Image fluid src = {BannerIMG} verticalAlign = 'middle' size = 'tiny'/>
           </Grid.Column>
           <Grid.Column width={12} style = {{
           }}>
           <Grid.Row>
             <Menu secondary>
               <Container>
               {this.props.userAccount && this.props.userAccount.user.admin &&
               <Modal size = 'mini' trigger={
                 <Menu.Item className = 'MenuItemUpper' as='a' name='sign_up' onClick = {this.handleNewModalOpen.bind(this)}>
                   Tạo bản ghi mới
                 </Menu.Item>}
                 open={this.state.newModalOpen}
                 >
                   <Modal.Header>Tạo bản ghi mới</Modal.Header>
                   <Modal.Content>
                     <Form onSubmit={this.handleNewSubmitButton.bind(this)}>
                       <Message
                         error
                         header='Không thể tạo bản ghi'
                         content='Đã xảy ra lỗi khi gửi yêu cầu đến server. Xin hãy thử lại.'
                       />
                       <Tab defaultActiveIndex = {this.state.tab} menu={{ secondary: true, pointing: true }} panes={panes} onTabChange = {this.handleTabChange.bind(this)} />
                       <br />
                       <Button.Group fluid>
                         <Button type='submit' onClick = {this.handleNewCancelButton.bind(this)}>Cancel</Button>
                         <Button.Or />
                         <Button type='submit' color = 'blue'>Submit</Button>
                       </Button.Group>
                   </Form>
                   </Modal.Content>
               </Modal>
               }
               {!this.props.userAccount &&
               <Modal trigger ={
                 <Menu.Item className = 'MenuItemUpper' as='a' position = 'right' name='sign_in' onClick = {this.handleSignInModalOpen.bind(this)}>
                   <Icon name = "sign in"/><strong>Đăng nhập</strong>
                 </Menu.Item>}
                 size = 'mini'
                 open={this.state.signInModalOpen}>
                 <Modal.Header>Đăng nhập</Modal.Header>
                 <Modal.Content>
                   <Form onSubmit={this.handleSignInSubmitButton.bind(this)}>
                     <Message
                       error
                       header='Không thể đăng nhập'
                       content='Đã xảy ra lỗi khi gửi gửi yêu cầu đến server. Xin hãy thử lại.'
                     />
                     <Form.Field required>
                       <label>Username</label>
                       <input required ref="signInUsername" placeholder='Nhập username'/>
                     </Form.Field>
                     <Form.Field required>
                       <label>Password</label>
                       <input required ref="signInPassword" type="password" placeholder='Nhập password'/>
                     </Form.Field>
                     <Button.Group fluid>
                       <Button type='submit' onClick = {this.handleSignInCancelButton.bind(this)}>Cancel</Button>
                       <Button.Or />
                       <Button type='submit' color = 'blue'>Submit</Button>
                     </Button.Group>
                 </Form>
                 </Modal.Content>
               </Modal>
               }
               {!this.props.userAccount &&
               <Modal trigger ={
                 <Menu.Item className = 'MenuItemUpper' as='a' name='sign_up' onClick = {this.handleSignUpModalOpen.bind(this)}>
                   <Icon name ="signup"/><strong>Đăng ký</strong>
                 </Menu.Item>}
                 size = 'mini'
                 open={this.state.signUpModalOpen}>
                 <Modal.Header>Tạo tài khoản mới</Modal.Header>
                 <Modal.Content>
                   <Form onSubmit={this.handleSignUpSubmitButton.bind(this)}>
                     <Message
                       error
                       header='Không thể tạo tài khoản'
                       content='Đã xảy ra lỗi khi gửi gửi yêu cầu đến server. Xin hãy thử lại.'
                     />
                     <Form.Field required>
                       <label>Username</label>
                       <input required ref="signUpUsername" defaultValue={this.state.signUpUsername} placeholder='Nhập username'/>
                     </Form.Field>
                     <Form.Field required>
                       <label>Password</label>
                       <input required ref="signUpPassword" defaultValue={this.state.signUpPassword} type="password" placeholder='Nhập password'/>
                     </Form.Field>
                     <Button.Group fluid>
                       <Button type='submit' onClick = {this.handleSignUpCancelButton.bind(this)}>Cancel</Button>
                       <Button.Or />
                       <Button type='submit' color = 'blue'>Submit</Button>
                     </Button.Group>
                 </Form>
                 </Modal.Content>
               </Modal>
               }
               {this.props.userAccount &&
                   <Dropdown item simple trigger={
                     <span>Xin chào, {this.props.userAccount.user.username}</span>
                   }>
                   <Dropdown.Menu>
                     <Dropdown.Item as='a' onClick={this.props.handleSignOutSubmit}><Icon name = "signout"/>Đăng xuất</Dropdown.Item>
                   </Dropdown.Menu>
                 </Dropdown>
               }
               </Container>
             </Menu>
           </Grid.Row>
           <Grid.Row>
             <Menu pointing secondary style = {{
               'borderBottom': '2px solid white',
             }}>
               <Container>
                 <Menu.Item fitted = 'horizontally' className = "MenuItemLower" active={activeItem === 'home'} position = 'right' as={Link} onClick = {this.handleItemClick.bind(this)} to= '/' name = 'home'>
                   <strong>TRANG CHỦ</strong>
                 </Menu.Item>
                 <Menu.Item fitted = 'horizontally' className = "MenuItemLower" active={activeItem === 'search'} as={Link} onClick = {this.handleItemClick.bind(this)} to='/search' name='search'>
                   <strong>TÌM KIẾM LUẬT</strong>
                 </Menu.Item>
                 <Menu.Item fitted = 'horizontally' className = "MenuItemLower" active={activeItem === 'news'} as={Link} onClick = {this.handleItemClick.bind(this)} to='/news' name='news'>
                   <strong>TIN TỨC LUẬT</strong>
                 </Menu.Item>
                 <Menu.Item fitted = 'horizontally' className = "MenuItemLower" active={activeItem === 'about'} as={Link} onClick = {this.handleItemClick.bind(this)} to='/about' name='about'>
                   <strong>LIÊN HỆ</strong>
                 </Menu.Item>
                 {this.props.userAccount &&
                   <Menu.Item fitted = 'horizontally' className = "MenuItemLower" active={activeItem === 'saved'} as={Link} onClick = {this.handleItemClick.bind(this)} to='/saved' name='saved'>
                     <strong>ĐIỀU LUẬT ĐÃ LƯU</strong>
                   </Menu.Item>
                 }
               </Container>
             </Menu>
           </Grid.Row>
           </Grid.Column>
         </Grid.Row>
        </Grid>
    </Container>
  </div>);
  }
}

export default MenuLayout;
