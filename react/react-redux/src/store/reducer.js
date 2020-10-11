const initialState = {
  inputValue: '',
  list: ['123']
};
export default (state = initialState, action) => {
  if (action.type === 'change_input') {
    let newState = { ...initialState };
    newState.inputValue = action.value;
    return newState;
  }
  if (action.type === 'add_item') {
    let newState = { ...initialState };
    newState.list.push(newState.inputValue);
    newState.inputValue = '';
    return newState;
  }
  return state;
};
