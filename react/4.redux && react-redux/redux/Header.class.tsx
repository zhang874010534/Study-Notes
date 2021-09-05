import React from 'react'
import { withRouter, RouteComponentProps, useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";
import store from '../../redux/store'
import { ILanguageState } from '../../redux/language/languageReducer'
import { withTranslation, WithTranslation } from 'react-i18next';
import { changeLanguageActionCreator } from "../../redux/language/languageActions";
interface PropsType extends RouteComponentProps {
  name: string
}
interface IState extends ILanguageState{
  language: 'zh' | 'en',
  languageList: {name: string, code: string}[]
}
class HeaderComponent extends React.Component<PropsType & WithTranslation, IState> {
  constructor(props: any){
    super(props)
    const storeState = store.getState()
    this.state = {
      language: storeState.language,
      languageList: storeState.languageList
    }
    store.subscribe(() => {
      const storeState = store.getState()
      this.setState({
        language: storeState.language
      })
    })
  }
  handleLanguage () {
    const action = changeLanguageActionCreator('en')
    store.dispatch(action)
  }
  render(){
    let { history } = this.props;
    return <div>
      {this.state.language}
      <div onClick={() => {
        history.push('/signIn')
      }}>{this.props.t('header.name')}</div>
      <div onClick={this.handleLanguage}>修改数据</div>
    </div>
  }
}
export const Header = withTranslation()(withRouter(HeaderComponent))
