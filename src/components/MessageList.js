import React, { Component } from "react";
import { Image, Label, Grid, Popup, Button, Divider } from "semantic-ui-react";
import RobotPNG from "../assets/images/bot1.png";
import BotLoadingGIF from "../assets/images/dot1.gif";
import UserLoadingGIF from "../assets/images/dot3.gif";
import TimeStamp from "./TimeStamp";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

class MessageList extends Component {
  render() {
    const messages = this.props.dataList.map(data => {
      if (data.type === "userMessage") {
        return (
          <Grid.Row className="MessageContainer">
            <Grid.Column width={2} />
            <Grid.Column
              className="UserMessageCol"
              width={14}
              verticalAlign="middle"
            >
              <Popup
                trigger={
                  <Label
                    className="UserMessage"
                    size="large"
                    color="red"
                    pointing="right"
                  >
                    {data.message.split("\n").map((item, key) => {
                      return (
                        <span>
                          {item}
                          <br />
                        </span>
                      );
                    })}
                  </Label>
                }
                content={<TimeStamp by="Tôi" />}
              />
            </Grid.Column>
          </Grid.Row>
        );
      } else if (data.type === "botMessage") {
        return (
          <Grid.Row className="MessageContainer">
            <Grid.Column
              className="BotAvatarCol"
              width={2}
              verticalAlign="middle"
            >
              <Popup
                trigger={
                  <Image
                    inline={true}
                    verticalAlign="middle"
                    src={RobotPNG}
                    size="mini"
                    circular={true}
                    bordered={true}
                  />
                }
                content={<TimeStamp by="Chat Bot" />}
              />
            </Grid.Column>
            <Grid.Column
              className="BotMessageCol"
              width={14}
              verticalAlign="middle"
            >
              <Label
                as="span"
                className="BotMessage"
                size="large"
                pointing="left"
              >
                {data.message.split("\n").map((item, key) => {
                  return (
                    <span key={key}>
                      {item}
                      <br />  
                    </span>
                  );
                })}
              </Label>
            </Grid.Column>
          </Grid.Row>
        );
      } else if (data.type === "botMessageWithSurvey") {
        var surveyList = this.props.survey.map(data => {
          return (
            <Button
              compact
              fluid
              style={{ textAlign: "left" }}
              size="small"
              color="red"
              onClick={() => this.props.onSurveyClick(data)}
            >
              {data.name}
            </Button>
          );
        });
        return (
          <Grid.Row>
            <Grid.Column>
              <Grid>
                <Grid.Row className="MessageContainer" columns={2}>
                  <Grid.Column
                    className="BotAvatarCol"
                    width={2}
                    verticalAlign="middle"
                  >
                    <Popup
                      trigger={
                        <Image
                          inline={true}
                          verticalAlign="middle"
                          src={RobotPNG}
                          size="mini"
                          circular={true}
                          bordered={true}
                        />
                      }
                      content={<TimeStamp by="Chat Bot" />}
                    />
                  </Grid.Column>
                  <Grid.Column
                    className="BotMessageCol"
                    width={14}
                    verticalAlign="middle"
                  >
                    <Label
                      as="span"
                      className="BotMessage"
                      size="large"
                      pointing="left"
                    >
                      Hiện tại, bạn đang {this.props.setName}. Nếu đây không
                      phải hành động bạn muốn thực hiện, xin hãy chọn hành động
                      bạn muốn ở bên dưới:
                      <Divider />
                      {surveyList}
                    </Label>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="MessageContainer" columns={2}>
                  <Grid.Column
                    className="BotAvatarCol"
                    width={2}
                    verticalAlign="middle"
                  >
                    <Popup
                      trigger={
                        <Image
                          inline={true}
                          verticalAlign="middle"
                          src={RobotPNG}
                          size="mini"
                          circular={true}
                          bordered={true}
                        />
                      }
                      content={<TimeStamp by="Chat Bot" />}
                    />
                  </Grid.Column>
                  <Grid.Column
                    className="BotMessageCol"
                    width={14}
                    verticalAlign="middle"
                  >
                    <Label
                      as="span"
                      className="BotMessage"
                      size="large"
                      pointing="left"
                    >
                      Nếu không, xin hãy nhập dữ liệu để bắt đầu{" "}
                      {this.props.setName}
                    </Label>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="MessageContainer" columns={2}>
                  <Grid.Column
                    className="BotAvatarCol"
                    width={2}
                    verticalAlign="middle"
                  >
                    <Popup
                      trigger={
                        <Image
                          inline={true}
                          verticalAlign="middle"
                          src={RobotPNG}
                          size="mini"
                          circular={true}
                          bordered={true}
                        />
                      }
                      content={<TimeStamp by="Chat Bot" />}
                    />
                  </Grid.Column>
                  <Grid.Column
                    className="BotMessageCol"
                    width={14}
                    verticalAlign="middle"
                  >
                    <Label
                      as="span"
                      className="BotMessage"
                      size="large"
                      pointing="left"
                    >
                      {data.message.split("\n").map((item, key) => {
                        return (
                          <span>
                            {item}
                            <br />
                          </span>
                        );
                      })}
                    </Label>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        );
      } else if (data.type === "botRestartOption") {
        return (
          <Grid.Row className="MessageContainer" columns={2}>
            <Grid.Column
              className="BotAvatarCol"
              width={2}
              verticalAlign="middle"
            >
              <Popup
                trigger={
                  <Image
                    inline={true}
                    verticalAlign="middle"
                    src={RobotPNG}
                    size="mini"
                    circular={true}
                    bordered={true}
                  />
                }
                content={<TimeStamp by="Chat Bot" />}
              />
            </Grid.Column>
            <Grid.Column
              className="BotMessageCol"
              width={14}
              verticalAlign="middle"
            >
              <Label
                as="span"
                className="BotMessage"
                size="large"
                pointing="left"
              >
                Bạn có muốn tiếp tục tìm kiếm không?
                <Divider />
                <Button
                  positive
                  fluid
                  compact
                  onClick={() => {
                    this.props.onResetBtnClick();
                  }}
                >
                  Có, hãy bắt đầu lại
                </Button>
                <br />
                <Button
                  negative
                  fluid
                  compact
                  onClick={this.props.onExitBtnClick}
                >
                  Không, kết thúc cuộc trò chuyện
                </Button>
              </Label>
            </Grid.Column>
          </Grid.Row>
        );
      } else if (data.type === "botLoading") {
        return (
          <Grid.Row className="MessageContainer">
            <Grid.Column
              className="BotAvatarCol"
              width={2}
              verticalAlign="middle"
            >
              <Popup
                trigger={
                  <Image
                    inline={true}
                    verticalAlign="middle"
                    src={RobotPNG}
                    size="mini"
                    circular={true}
                    bordered={true}
                  />
                }
                content="Chat Bot"
              />
            </Grid.Column>
            <Grid.Column
              className="BotMessageCol"
              width={14}
              verticalAlign="middle"
            >
              <Popup
                trigger={
                  <Label
                    as="span"
                    className="BotMessage"
                    size="large"
                    pointing="left"
                  >
                    <Image
                      verticalAlign="middle"
                      src={BotLoadingGIF}
                      size="mini"
                    />
                  </Label>
                }
                content="Chat Bot đang nhập..."
              />
            </Grid.Column>
          </Grid.Row>
        );
      } else if (data.type === "userLoading") {
        return (
          <Grid.Row className="MessageContainer">
            <Grid.Column className="UserMessageCol" verticalAlign="middle">
              <Popup
                trigger={
                  <Label
                    className="UserMessage"
                    size="large"
                    color="red"
                    pointing="right"
                  >
                    <Image
                      verticalAlign="middle"
                      src={UserLoadingGIF}
                      size="mini"
                    />
                  </Label>
                }
                content="Tôi đang nhập..."
              />
            </Grid.Column>
          </Grid.Row>
        );
      } else return null;
    });

    return <Grid className="MessageList">{messages}</Grid>;
  }
}

const mapStateToProps = state => {
  return {
    survey: state.chatbot.survey,
    setName: state.chatbot.setName
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
