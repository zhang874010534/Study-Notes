import i18n from "i18next";
import { CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes } from "./languageActions";
export interface ILanguageState {
  language: 'en' | 'zh';
  languageList: {name: string, code: string}[]
}

const defaultState: ILanguageState = {
  language: 'zh',
  languageList: [
    {name: '中文', code: 'zh'},
    {name: 'English', code: 'en'}
  ]
}

export default (state = defaultState, action: LanguageActionTypes) => {
  console.log(state, action)
  // if(action.type === 'change_language') {
  //   const newState = { ...state, language: action.payload }
  //   return newState
  // }
  switch (action.type) {
    case CHANGE_LANGUAGE:
      i18n.changeLanguage(action.payload)
      return { 
        ...state, 
        language: action.payload 
      };
      break;
    default:
      break;
  }
  return state
}