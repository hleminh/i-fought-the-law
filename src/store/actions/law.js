import * as actionTypes from "../actions/actionTypes";

export const getChapterList = () => {
  return {
    type: actionTypes.GET_LIST_CHAPTER
  };
};

export const getChapterListStart = () => {
  return {
    type: actionTypes.GET_LIST_CHAPTER_START
  };
};

export const getChapterListSuccess = chapterList => {
  return {
    type: actionTypes.GET_LIST_CHAPTER_SUCCESS,
    chapters: chapterList
  };
};

export const getChapterListFail = errorMsg => {
  return {
    type: actionTypes.GET_LIST_CHAPTER_FAIL,
    errorMsg: errorMsg
  };
};

export const getChapterDetail = (currentChapter, pageIndex, itemPerPage) => {
  return {
    type: actionTypes.GET_CHAPTER_DETAIL,
    currentChapter: currentChapter,
    pageIndex: pageIndex,
    itemPerPage: itemPerPage
  };
};

export const getChapterDetailStart = currentChapter => {
  return {
    type: actionTypes.GET_CHAPTER_DETAIL_START,
    currentChapter: currentChapter
  };
};

export const getChapterDetailSuccess = articleList => {
  return {
    type: actionTypes.GET_CHAPTER_DETAIL_SUCCESS,
    articles: articleList
  };
};

export const getChapterDetailFail = errorMsg => {
  return {
    type: actionTypes.GET_CHAPTER_DETAIL_FAIL,
    errorMsg: errorMsg
  };
};

export const search = (keyword, pageIndex, itemPerPage, chapterId) => {
  return {
    type: actionTypes.SEARCH,
    keyword: keyword,
    pageIndex: pageIndex,
    itemPerPage: itemPerPage,
    chapterId: chapterId
  };
};
