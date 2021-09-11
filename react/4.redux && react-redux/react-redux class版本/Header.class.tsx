import React from 'react'
import { withRouter, RouteComponentProps, useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";
import store,{ RootState } from '../../redux/store'
import { ILanguageState } from '../../redux/language/languageReducer'
import { withTranslation, WithTranslation } from 'react-i18next';
import { changeLanguageActionCreator } from "../../redux/language/languageActions";
import { connect } from "react-redux";
import { Dispatch } from "redux"; 
import { LanguageType } from "../../redux/language/languageActions";
interface PropsType {
  name: string
} 
interface IState extends ILanguageState{
  language: 'zh' | 'en',
  languageList: {name: string, code: string}[]
}

const mapStateToProps = (state: RootState) => {
  return {
    language: state.language,
    languageList: state.languageList
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (code: LanguageType) => {
      const action = changeLanguageActionCreator(code)
      dispatch(action)
    }
  }
}

class HeaderComponent extends React.Component<
PropsType & WithTranslation & 
RouteComponentProps & // react-router props类型
ReturnType<typeof mapStateToProps> & //redux store 映射类型
ReturnType<typeof mapDispatchToProps> // redux dispatch 映射类型
, IState
> {
  constructor(props: any){
    super(props)
    const storeState = store.getState()
    // this.state = {
    //   // language: storeState.language,
    //   languageList: storeState.languageList
    // }
    // store.subscribe(() => {
    //   const storeState = store.getState()
    //   this.setState({
    //     language: storeState.language
    //   })
    // })
    // this.handleLanguage = this.handleLanguage.bind(this)
  }
  handleLanguage = () => {
    // const action = changeLanguageActionCreator('en')
    // store.dispatch(action)
    this.props.changeLanguage('en')
  }
  render(){
    let { history } = this.props;
    return <div>
      {this.props.language}
      <div onClick={() => {
        history.push('/signIn')
      }}>{this.props.t('header.name')}</div>
      <div onClick={this.handleLanguage}>修改数据</div>
    </div>
  }
}
export const Header = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent)))
