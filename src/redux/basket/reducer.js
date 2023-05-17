const basketData = localStorage.getItem('basket');
const basketDataJson = JSON.parse(basketData);
const defaultState = {
    items:basketDataJson ? basketDataJson : [],
};

const basketReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_ITEM_DATA':
            return {
                ...state,
                items:[...state.items,action.data],
            };
        case 'DELETE_ITEM_DATA':
            return {
                items:[
                    ...state.items.filter(item => item !== action.data)
                ]
            };
        default:
            return state;
    }
};

export default basketReducer;