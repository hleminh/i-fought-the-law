import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utilities';

const initialState = {
  chapters: [],
  listError: null,
  listLoading: false,
  currentChapter: null,
  articles: [],
  articlesLoading: false,
  articlesError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIST_CHAPTER_START:
      return getChapterListStart(state, action);
    case actionTypes.GET_LIST_CHAPTER_SUCCESS:
      return getChapterListSuccess(state, action);
    case actionTypes.GET_LIST_CHAPTER_FAIL:
      return getChapterListFail(state, action);
    case actionTypes.GET_CHAPTER_DETAIL_START:
      return getChapterDetailStart(state, action);
    case actionTypes.GET_CHAPTER_DETAIL_SUCCESS:
      return getChapterDetailSuccess(state, action);
    case actionTypes.GET_CHAPTER_DETAIL_FAIL:
      return getChapterDetailFail(state, action);
    default:
      return state;
  }
};

const getChapterListStart = (state, action) => {
  return updateObject(state, {listLoading: true, listError: null});
};

const getChapterListSuccess = (state, action) => {
  return updateObject(state, {chapters: action.chapters, listLoading: false});
};

const getChapterListFail = (state, action) => {
  return updateObject(state, {listError: action.errorMsg, listLoading: false});
};


const getChapterDetailStart = (state, action) => {
  return updateObject(state, {articlesLoading: true, articlesError: null, currentChapter: action.currentChapter});
};

const getChapterDetailSuccess = (state, action) => {
  return updateObject(state, {articlesLoading: false, articles: action.articles});
};

const getChapterDetailFail = (state, action) => {
  return updateObject(state, {articlesLoading: false, articlesError: action.errorMsg});
};

export default reducer;
