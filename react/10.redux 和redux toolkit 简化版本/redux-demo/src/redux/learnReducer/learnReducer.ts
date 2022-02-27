import { IActionType } from './learnAction'

const defaultState = 0;
const reducer = (state = defaultState, action: IActionType) => {
	switch (action.type) {
		case 'add':
			return state + action.payload
		default:
            return state
			break;
	}
};

export default reducer;
