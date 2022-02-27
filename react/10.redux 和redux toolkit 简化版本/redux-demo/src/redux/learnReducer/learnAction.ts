interface IAction {
    type: 'add',
    payload: number
}
export type IActionType = IAction
export const createLearnAction = (payload: number): IAction => {
    return {
        type: 'add',
        payload
    }
}