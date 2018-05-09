import * as actionTypes from '../actions/actionTypes';

export const getStepSetByInput = input => {
  return {
    type: actionTypes.GET_STEP_SET_BY_INPUT,
    input: input
  };
};

export const getStepSetByInputStart = () => {
  return {
    type: actionTypes.GET_STEP_SET_BY_INPUT_START
  };
};

export const getStepSetByInputSuccess = results => {
  return {
    type: actionTypes.GET_STEP_SET_BY_INPUT_SUCCESS,
    results: results
  };
};

export const getStepSetByInputFail = () => {
  return {
    type: actionTypes.GET_STEP_SET_BY_INPUT_FAIL
  };
};

export const updateSetFeatureByIdAndInput = (id, input) => {
  return {
    type: actionTypes.UPDATE_SET_FEATURE_BY_ID_AND_INPUT,
    input: input,
    id: id
  };
};

export const updateSetFeatureByIdAndInputStart = () => {
  return {
    type: actionTypes.UPDATE_SET_FEATURE_BY_ID_AND_INPUT_START
  };
};

export const updateSetFeatureByIdAndInputSuccess = results => {
  return {
    type: actionTypes.UPDATE_SET_FEATURE_BY_ID_AND_INPUT_SUCCESS,
    results: results
  };
};

export const updateSetFeatureByIdAndInputFail = () => {
  return {
    type: actionTypes.UPDATE_SET_FEATURE_BY_ID_AND_INPUT_FAIL
  };
};

export const resetChatBot = () => {
  return {
    type: actionTypes.RESET_CHAT_BOT
  };
};
