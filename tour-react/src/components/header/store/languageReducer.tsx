import i18n from '../../../i18n/configs';
import { LanguageActionTypes } from './actionCreators';
import * as actionTypes from './constents';

export interface LanguageState {
    language : 'en' | 'zh',
    languageList: {name:string,code:string}[]
}

const defaultState: LanguageState = {
    language:'zh',
    languageList:[
        {
            name:'中文',
            code:'zh'
        },
        {
            name:'English',
            code:'en'
        }
    ]
}

const languageReducer = (state=defaultState,action:LanguageActionTypes) => {
  switch (action.type) {
      case actionTypes.CHANGE_LANGUAGE:
          i18n.changeLanguage(action.payload)
          return {
            ...state, language: action.payload
          }
        
        case actionTypes.ADD_LANGUAGE:
            return {
                ...state,
                languageList: [...state.languageList, action.payload],
            }
  
      default:
        return state;
  }
   
}

export default languageReducer