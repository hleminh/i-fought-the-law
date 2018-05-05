import React, { Component } from "react";
import { Button, Icon, Popup } from "semantic-ui-react";
import ChatBot from "./Chatbot/ChatBot";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class ChatBotLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatBoxOpen: false
    };
  }

  componentWillMount() {}

  handleChatBoxOpenButtonClick(e) {
    if (this.state.chatBoxOpen) {
      this.setState({
        chatBoxOpen: false
      });
    } else {
      this.setState({
        chatBoxOpen: true
      });
    }
  }

  handleChatBotLayoutButtonRef(node) {
    this.chatBotLayoutButton = node;
  }

  render() {
    return (
      <div className="ChatBotLayout">
        {this.state.chatBoxOpen && (
          <ChatBot
            handleExitButtonClick={this.handleChatBoxOpenButtonClick.bind(this)}
          />
        )}
        {!this.state.chatBoxOpen && (
          <Popup
            trigger={
              <Button
                className="ChatBoxOpenButton"
                attached="top"
                ref={this.handleChatBotLayoutButtonRef.bind(this)}
                onClick={this.handleChatBoxOpenButtonClick.bind(this)}
                size="large"
                color="red"
              >
                <Button.Content>
                  Trò chuyện với Chat Bot &nbsp;
                  <Icon name="comment" />
                </Button.Content>
              </Button>
            }
            content="Mở cửa sổ trò chuyện"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    steps: state.chatbot.steps,
    isStepsLoading: state.chatbot.isStepsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBotLayout);
