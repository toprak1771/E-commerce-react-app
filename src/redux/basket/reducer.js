const basketData = localStorage.getItem('basket');
console.log("basketData:",basketData);

const basketDataJson = basketData ? JSON.parse(basketData) : [];
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
        case 'EMPTY_ITEM':
            return {
                items:[]
            };
        default:
            return state;
    }
};

export default basketReducer;