import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

const basicStepSet = [
  {
    message: "Xin chào! Tôi là Chat Bot. Tôi có thể giúp bạn việc gì?"
  },
  {
    action:
      "(callback, input) => {this.props.onGetStepSetByInput(input); callback();}"
  }
];

const initialState = {
  steps: basicStepSet,
  stepsLoading: false,
  setName: null,
  survey: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_STEP_SET_BY_INPUT_START:
      return getStepSetByInputStart(state, action);
    case actionTypes.GET_STEP_SET_BY_INPUT_SUCCESS:
      return getStepSetByInputSuccess(state, action);
    case actionTypes.GET_STEP_SET_BY_INPUT_FAIL:
      return getStepSetByInputFail(state, action);
    case actionTypes.UPDATE_SET_FEATURE_BY_ID_AND_INPUT_START:
      return updateSetFeatureByIdAndInputStart(state, action);
    case actionTypes.UPDATE_SET_FEATURE_BY_ID_AND_INPUT_SUCCESS:
      return updateSetFeatureByIdAndInputSuccess(state, action);
    case actionTypes.UPDATE_SET_FEATURE_BY_ID_AND_INPUT_FAIL:
      return updateSetFeatureByIdAndInputFail(state, action);
    case actionTypes.RESET_CHAT_BOT:
      return resetChatBot(state, action);
    default:
      return state;
  }
};

const getStepSetByInputStart = (state, action) => {
  return updateObject(state, { stepsLoading: true });
};

const getStepSetByInputSuccess = (state, action) => {
  return updateObject(state, {
    steps: action.results.data.set.steps,
    survey: action.results.data.survey,
    setName: action.results.data.set.name,
    stepsLoading: false
  });
};

const getStepSetByInputFail = (state, action) => {
  return updateObject(state, { stepsLoading: false });
};

const updateSetFeatureByIdAndInputStart = (state, action) => {
  return updateObject(state, { stepsLoading: true });
};

const updateSetFeatureByIdAndInputSuccess = (state, action) => {
  return updateObject(state, {
    steps: action.results.data.set.steps,
    setName: action.results.data.set.name,
    survey: action.results.data.survey,
    stepsLoading: false
  });
};

const updateSetFeatureByIdAndInputFail = (state, action) => {
  return updateObject(state, { stepsLoading: false });
};

const resetChatBot = (state, action) => {
  return updateObject(state, {
    steps: basicStepSet,
    survey: null,
    stepsLoading: false,
    setName: null
  });
};

export default reducer;
