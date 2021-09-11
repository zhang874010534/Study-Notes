import React from 'react'
import { withRouter, RouteComponentProps, useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { LanguageActionTypes, changeLanguageActionCreator } from "../../redux/language/languageActions";

interface PropsType extends RouteComponentProps{
  name: string
}

const HeaderComponent:React.FC<PropsType> = (props) => {
  let { history } = props
  const location = useLocation()
  const { t, i18n} = useTranslation()
  
  const language = useSelector((state) => state.language)
  const languageList = useSelector((state) => state.languageList)

  // 不是很推荐这样子定义dispatch 会丢失js的灵活性
  // const dispatch = useDispatch<Dispatch<LanguageActionTypes>>()
  const dispatch = useDispatch()

  const changeLanguage = (e: React.MouseEvent) => {
    e.stopPropagation()
    let action = changeLanguageActionCreator('en')
    dispatch(action)
  }
  return <div onClick={(e) => {
    history.push('/signIn')
  }}>
    <div>
      {t('header.name')}
    </div>
    <div onClick={changeLanguage}>
      我是语言{language}
    </div>
  </div>
}
export const Header = withRouter(HeaderComponent)
