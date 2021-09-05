export const CHANGE_LANGUAGE = 'change_language'
export const ADD_LANGUAGE = 'add_language'
type LanguageType = 'zh' | 'en'

interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE,// 这里typeof 很关键 reducer那边action.type === CHANGE_LANGUAGE  payload就自动有类型了
  payload: 'zh' | 'en'
}
interface AddLanguageAction {
  type: typeof ADD_LANGUAGE,
  payload: { name: string, code: string }
}
export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction
export const changeLanguageActionCreator = (languageCode: LanguageType):ChangeLanguageAction => {
  return {
    type: CHANGE_LANGUAGE,
    payload: languageCode
  }
}
export const addLanguageActionCreator = (name: string, code: string): AddLanguageAction => {
  return {
    type: ADD_LANGUAGE,
    payload: { name, code}
  }
}