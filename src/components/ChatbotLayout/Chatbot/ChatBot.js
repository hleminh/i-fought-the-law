import React, { Component } from "react";
import {
  Card,
  Input,
  Ref,
  Popup,
  Icon,
  Image,
  Loader,
  Dropdown,
  Button
} from "semantic-ui-react";
import MessageList from "../../MessageList";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

class ChatBot extends Component {
  lawClassOptions = [];
  agencyOptions = [];
  statusOptions = [];

  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      currentStep: this.props.steps[0],
      dataList: [
        {
          message: this.props.steps[0].message,
          type: "botMessage"
        }
      ],
      disableInput: false,
      userSetInput: null,
      surveyClickedOnce: false,
      userLoadingExist: false,
      searchData: {
        keyword: null,
        pageIndex: 1,
        itemPerPage: 10,
        lawClass: null,
        agency: null,
        status: null,
        signer: null
      }
    };
  }

  nextStep(currentStep, data) {
    switch (currentStep) {
      case "action":
        console.log("action");
        for (var i = 0; i < this.props.steps.length; i++) {
          if (this.state.currentStep === this.props.steps[i]) {
            this.props.steps[i + 1].message = data;
            this.setState(
              {
                currentStep: this.props.steps[i + 1]
              },
              () => {
                this.botReply();
                if (this.state.currentStep.action) {
                  console.log("next step is action");
                  this.botProcess();
                }
              }
            );
          }
        }
        break;
      case "message":
        console.log("message");
        for (var i = 0; i < this.props.steps.length; i++) {
          if (this.state.currentStep === this.props.steps[i]) {
            this.setState(
              {
                currentStep: this.props.steps[i + 1]
              },
              () => {
                if (!this.state.currentStep.action) {
                  this.botReply();
                } else {
                  console.log("next step is action");
                  this.botProcess();
                }
              }
            );
          }
        }
        break;
    }
  }

  componentWillMount() {
    if  (this.props.lawClassList.length === 0)
      this.props.onGetLawClassList(); 
    if  (this.props.agencyList.length === 0)
      this.props.onGetAgencyList();
    if  (this.props.validityStatusList.length === 0)
      this.props.onGetStatusList();
  }

  componentDidMount() {
    this.userInput.focus();
  }

  getDropDownItemNameFromId = (dataType = this.state.currentStep.dataType) => {
    switch (dataType) {
      case "lawClass":
        for (var item in this.lawClassOptions) {
          if (this.state.userInput == this.lawClassOptions[item].value)
            return this.lawClassOptions[item].text;
        }
        break;
      case "status":
        for (var item in this.statusOptions) {
          if (this.state.userInput == this.statusOptions[item].value)
            return this.statusOptions[item].text;
        }
        break;
      case "agency":
        for (var item in this.agencyOptions) {
          if (this.state.userInput == this.agencyOptions[item].value)
            return this.agencyOptions[item].text;
        }
        break;
      default:
        return this.state.userInput.trim();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.steps !== this.props.steps) {
      this.changeSet(nextProps);
    }
    if (nextProps.lawClassList != this.props.lawClassList || this.props.lawClassList.length !== 0) {
      let lawClassOptionNew = nextProps.lawClassList.map(lawClass => {
        return {
          key: lawClass._id,
          value: lawClass._id,
          text: lawClass.name
        };
      });
      this.lawClassOptions = lawClassOptionNew;
    }

    if (nextProps.agencyList != this.props.agencyList || this.props.agencyList.length !== 0) {
      let agencyListNew = nextProps.agencyList.map(agency => {
        return {
          key: agency._id,
          value: agency._id,
          text: agency.name
        };
      });
      this.agencyOptions = agencyListNew;
    }

    if (nextProps.validityStatusList != this.props.validityStatusList || this.props.validityStatusList.length !== 0) {
      let statusOptionNew = nextProps.validityStatusList.map(status => {
        return {
          key: status._id,
          value: status._id,
          text: status.name
        };
      });
      this.statusOptions = statusOptionNew;
    }

    if (nextProps.searchResult !== this.props.searchResult) {
      this.showSearchResult(nextProps);
    }
  }

  componentWillUnmount() {
    this.onChatBotClose();
  }

  showSearchResult(nextProps) {
    this.setState(
      {
        dataList: this.state.dataList.map(data => {
          if (data.type === "botLoading") {
            return Object.assign({}, data, {
              message:
                nextProps.searchResult[0] == null
                  ? "Không tìm thấy kết quả nào"
                  : `Đã tìm thấy ${this.props.totalResult} kết quả`,
              type: "botMessage"
            });
          } else {
            return data;
          }
        }),
        disableInput: false
      },
      () => {
        this.chatBotMessageContainer.scrollTop = this.chatBotMessageContainer.scrollHeight;
        this.props.handleUrlChange("/search");
        if (
          !this.state.currentStep.dataType ||
          this.state.currentStep.dataType === "keyword" ||
          this.state.currentStep.dataType === "signer"
        ) {
          this.userInput.focus();
        }
        this.onChatBotFinishedSet();
      }
    );
  }

  onChatBotClose = () => {
    this.props.onResetChatBot();
  };

  changeSet(nextProps) {
    console.log("changeSet");
    this.setState(
      {
        currentStep: nextProps.steps[0]
      },
      () => {
        this.chatBotMessageContainer.scrollTop = this.chatBotMessageContainer.scrollHeight;
        this.setState(
          {
            dataList: this.state.dataList.map(data => {
              if (data.type === "botLoading") {
                if (this.props.survey == null) {
                  return Object.assign({}, data, {
                    message: this.state.currentStep.message,
                    type: "botMessage"
                  });
                } else {
                  if (!this.state.surveyClickedOnce) {
                    return Object.assign({}, data, {
                      message: this.state.currentStep.message,
                      type: "botMessageWithSurvey"
                    });
                  } else {
                    return Object.assign({}, data, {
                      message: this.state.currentStep.message,
                      type: "botMessage"
                    });
                  }
                }
              } else {
                return data;
              }
            }),
            disableInput: false
          },
          () => {
            this.chatBotMessageContainer.scrollTop = this.chatBotMessageContainer.scrollHeight;
            if (
              !this.state.currentStep.dataType ||
              this.state.currentStep.dataType === "keyword" ||
              this.state.currentStep.dataType === "signer"
            )
              this.userInput.focus();
          },
          () => {
            this.botReply();
          }
        );
      }
    );
  }

  botProcess() {
    console.log(this.state.currentStep);
    if (this.state.currentStep.action) {
      this.botProcessAction();
    } else {
      this.botProcessMessage();
    }
  }

  botProcessAction() {
    console.log("process action");
    console.log(this.state.currentStep.action);
    var input = this.state.userInput;
    var callback = () => {
      this.setState(
        {
          dataList: this.state.dataList.concat([
            {
              type: "botLoading"
            }
          ]),
          userInput: "",
          disableInput: true,
          userLoadingExist: false
        },
        () => {
          this.chatBotMessageContainer.scrollTop = this.chatBotMessageContainer.scrollHeight;
        }
      );
    };
    var func = eval(this.state.currentStep.action);
    console.log(func);
    if (this.props.setName == null) {
      this.setState(
        {
          userSetInput: this.state.userInput
        },
        () => {
          console.log("userSetInput: ", this.state.userSetInput);
          func(callback, this.state.userInput);
        }
      );
    } else {
      func(callback, this.state.searchData);
    }
  }

  botProcessMessage() {
    console.log("process message");
    if (this.state.currentStep.dataType) {
      console.log(this.state.currentStep.dataType);
      this.setState(
        prevState => ({
          searchData: {
            ...prevState.searchData,
            [this.state.currentStep.dataType]: this.state.userInput
          }
        }),
        () => {
          console.log(this.state.searchData);
          this.nextStep("message");
        }
      );
    } else {
      this.nextStep("message");
    }
  }

  botReply() {
    this.setState(
      {
        dataList: this.state.dataList.concat([
          {
            type: "botLoading"
          }
        ]),
        userInput: "",
        disableInput: true,
        userLoadingExist: false
      },
      () => {
        this.chatBotMessageContainer.scrollTop = this.chatBotMessageContainer.scrollHeight;
        setTimeout(() => {
          this.setState(
            {
              dataList: this.state.dataList.map(data => {
                if (data.type === "botLoading") {
                  return Object.assign({}, data, {
                    message: this.state.currentStep.message,
                    type: "botMessage"
                  });
                } else {
                  return data;
                }
              }),
              disableInput: false
            },
            () => {
              this.chatBotMessageContainer.scrollTop = this.chatBotMessageContainer.scrollHeight;
              if (
                !this.state.currentStep.dataType ||
                this.state.currentStep.dataType === "keyword" ||
                this.state.currentStep.dataType === "signer"
              )
                this.userInput.focus();
            }
          );
        }, 1000);
      }
    );
  }

  onChatBotFinishedSet = () => {
    this.setState(
      {
        dataList: this.state.dataList.concat([
          {
            type: "botLoading"
          }
        ])
      },
      () => {
        this.chatBotMessageContainer.scrollTop = this.chatBotMessageContainer.scrollHeight;
        console.log(this.state.dataList);
        setTimeout(() => {
          this.setState(
            {
              dataList: this.state.dataList.map(data => {
                if (data.type === "botLoading") {
                  return Object.assign({}, data, {
                    type: "botRestartOption"
                  });
                } else {
                  return data;
                }
              })
            },
            () => {
              this.chatBotMessageContainer.scrollTop = this.chatBotMessageContainer.scrollHeight;
            }
          );
        }, 1000);
      }
    );
  };

  onResetBtnClick = () => {
    this.setState(
      {
        dataList: [],
        userInput: "",
        disableInput: true,
        userLoadingExist: false,
        surveyClickedOnce: false,
        searchData: {
          keyword: null,
          pageIndex: 1,
          itemPerPage: 10,
          lawClass: null,
          agency: null,
          status: null,
          signer: null
        }
      },
      () => {
        this.setState(
          {
            dataList: this.state.dataList.concat([
              {
                type: "botLoading"
              }
            ])
          },
          () => {
            this.chatBotMessageContainer.scrollTop = this.chatBotMessageContainer.scrollHeight;
            setTimeout(() => {
              this.props.onResetChatBot();
            }, 1000);
          }
        );
      }
    );
  };

  handleButtonClick() {
    console.log("handle button click");
    console.log(this.state.userInput);
    if (this.state.userInput.trim() !== "") {
      this.setState(
        {
          dataList: this.state.dataList.map(data => {
            if (data.type === "userLoading") {
              return Object.assign({}, data, {
                message: this.getDropDownItemNameFromId(),
                type: "userMessage"
              });
            } else {
              return data;
            }
          })
        },
        () => {
          this.botProcess();
        }
      );
    } else {
      this.setState(
        {
          userInput: ""
        },
        () => {
          if (
            !this.state.currentStep.dataType ||
            this.state.currentStep.dataType === "keyword" ||
            this.state.currentStep.dataType === "signer"
          )
            console.log("userInput focus");
          this.userInput.focus();
        }
      );
    }
  }

  handleMessageContainerRef(node) {
    this.chatBotMessageContainer = node;
  }

  handleInputRef(node) {
    this.userInput = node;
  }

  handleOnKeyDown(e) {
    if (e.keyCode === 13) {
      this.handleButtonClick();
    }
  }

  onDropDownChange = (e, data) => {
    console.log(data.value);
    this.setState(
      {
        userInput: data.value
      },
      () => {
        if (
          !this.state.userLoadingExist &&
          this.state.userInput.trim() !== ""
        ) {
          this.setState(
            {
              dataList: this.state.dataList.concat([
                {
                  message: "",
                  type: "userLoading"
                }
              ]),
              userLoadingExist: true
            },
            () => {
              this.chatBotMessageContainer.scrollTop = this.chatBotMessageContainer.scrollHeight;
            }
          );
        }
        if (this.state.userLoadingExist && this.state.userInput.trim() === "") {
          this.setState(
            {
              dataList: this.state.dataList.filter(
                data => data.type !== "userLoading"
              ),
              userLoadingExist: false
            },
            () => {
              this.chatBotMessageContainer.scrollTop = this.chatBotMessageContainer.scrollHeight;
            }
          );
        }
      }
    );
  };

  handleOnInputChange(e) {
    this.setState(
      {
        userInput: e.target.value
      },
      () => {
        if (
          !this.state.userLoadingExist &&
          this.state.userInput.trim() !== ""
        ) {
          this.setState(
            {
              dataList: this.state.dataList.concat([
                {
                  message: "",
                  type: "userLoading"
                }
              ]),
              userLoadingExist: true
            },
            () => {
              this.chatBotMessageContainer.scrollTop = this.chatBotMessageContainer.scrollHeight;
            }
          );
        }
        if (this.state.userLoadingExist && this.state.userInput.trim() === "") {
          this.setState({
            dataList: this.state.dataList.filter(
              data => data.type !== "userLoading"
            ),
            userLoadingExist: false
          });
        }
      }
    );
  }

  renderUserInputByDataType = (dataType = this.state.currentStep.dataType) => {
    switch (dataType) {
      case "lawClass":
        return (
          <div>
            <Dropdown
              upward
              placeholder="Chọn loại văn bản"
              selection
              value={this.state.userInput}
              onChange={this.onDropDownChange}
              options={this.lawClassOptions}
              disabled={this.state.disableInput}
              className="ChatBotDropDown"
            />
            <Button
              attached="right"
              icon
              onClick={this.handleButtonClick.bind(this)}
              loading={this.state.disableInput}
              disabled={this.state.disableInput}
            >
              <Icon name="chevron right" />
            </Button>
          </div>
        );
        break;
      case "agency":
        return (
          <div>
            <Dropdown
              upward
              placeholder="Chọn cơ quan ban hành"
              noResultsMessage="Không có kết quả"
              selection
              search
              value={this.state.userInput}
              onChange={this.onDropDownChange}
              options={this.agencyOptions}
              disabled={this.state.disableInput}
              className="ChatBotDropDownSearch"
            />
            <Button
              attached="right"
              icon
              onClick={this.handleButtonClick.bind(this)}
              loading={this.state.disableInput}
              disabled={this.state.disableInput}
            >
              <Icon name="chevron right" />
            </Button>
          </div>
        );
        break;
      case "status":
        return (
          <div>
            <Dropdown
              upward
              placeholder="Chọn tình trạng hiệu lực"
              selection
              value={this.state.userInput}
              onChange={this.onDropDownChange}
              options={this.statusOptions}
              disabled={this.state.disableInput}
              className="ChatBotDropDown"
            />
            <Button
              attached="right"
              icon
              onClick={this.handleButtonClick.bind(this)}
              loading={this.state.disableInput}
              disabled={this.state.disableInput}
            >
              <Icon name="chevron right" />
            </Button>
          </div>
        );
        break;
      default:
        return (
          <Input
            disabled={this.state.disableInput}
            fluid={true}
            action={{
              icon: "chevron right",
              onClick: this.handleButtonClick.bind(this),
              loading: this.state.disableInput
            }}
            value={this.state.userInput}
            placeholder="Gõ và nhấn Enter để gửi"
            onKeyDown={this.handleOnKeyDown.bind(this)}
            onChange={this.handleOnInputChange.bind(this)}
            ref={this.handleInputRef.bind(this)}
          />
        );
        break;
    }
  };

  onSurveyClick = data => {
    console.log(data);
    console.log("survey clicked");
    this.setState(
      {
        dataList: [],
        userInput: "",
        disableInput: true,
        userLoadingExist: false,
        surveyClickedOnce: true,
        searchData: {
          keyword: null,
          pageIndex: 1,
          itemPerPage: 10,
          lawClass: null,
          agency: null,
          status: null,
          signer: null
        }
      },
      () => {
        this.setState(
          {
            dataList: this.state.dataList.concat([
              {
                type: "botLoading"
              }
            ])
          },
          () => {
            this.chatBotMessageContainer.scrollTop = this.chatBotMessageContainer.scrollHeight;
            this.props.onUpdateSetFeatureByIdAndInput(
              data._id,
              this.state.userSetInput
            );
          }
        );
      }
    );
  };

  render() {
    return <div className="ChatBotContainer">
        {!this.props.isStepsLoading && <Card className="ChatBot">
            <Card.Content className="ChatBotHeaderContainer">
              <Card.Header className="ChatBotHeader" textAlign="left">
                Chat Bot
                <Popup trigger={<Image floated="right">
                      <Icon link={true} name="close" onClick={this.props.handleExitButtonClick} />
                    </Image>} content="Đóng cửa sổ trò chuyện" />
              </Card.Header>
            </Card.Content>
            <Ref innerRef={this.handleMessageContainerRef.bind(this)}>
              <Card.Content className="ChatBotMessageContainer">
                <MessageList onExitBtnClick={this.props.handleExitButtonClick} onResetBtnClick={this.onResetBtnClick} onSurveyClick={this.onSurveyClick} dataList={this.state.dataList} />
              </Card.Content>
            </Ref>
            <Card.Content>{this.renderUserInputByDataType()}</Card.Content>
          </Card>}
        <Loader active={this.props.isStepsLoading} />
      </div>;
  }
}

const mapStateToProps = state => {
  return {
    steps: state.chatbot.steps,
    isStepsLoading: state.chatbot.isStepsLoading,
    setName: state.chatbot.setName,
    survey: state.chatbot.survey,
    searchResult: state.laws.searchResult,
    searchLoading: state.laws.searchLoading,
    totalResult: state.laws.totalResult,
    lawClassList: state.laws.lawClassList,
    lawClassLoading: state.laws.lawClassLoading,
    agencyList: state.laws.agencyList,
    agencyListLoading: state.laws.agencyListLoading,
    validityStatusList: state.laws.validityStatusList,
    statusListLoading: state.laws.statusListLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onResetChatBot: () => dispatch(actions.resetChatBot()),
    onGetStepSetByInput: input => dispatch(actions.getStepSetByInput(input)),
    onGetLawClassList: () => dispatch(actions.getLawClassList()),
    onGetAgencyList: () => dispatch(actions.getListAgency()),
    onGetStatusList: () => dispatch(actions.getValidityStatusList()),
    onUpdateSetFeatureByIdAndInput: (id, input) => {
      dispatch(actions.updateSetFeatureByIdAndInput(id, input));
    },
    searchLaw: (
      keyword,
      searchType,
      pageIndex,
      itemPerPage,
      lawClass,
      agency,
      validityStatus,
      signer
    ) =>
      dispatch(
        actions.search(
          keyword,
          searchType,
          pageIndex,
          itemPerPage,
          lawClass,
          agency,
          validityStatus,
          signer
        )
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBot);
