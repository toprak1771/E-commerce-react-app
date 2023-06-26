export const addItem = (data) => {
    return {
        type:'SET_ITEM_DATA',
        data
    }
};

export const deleteItem = (data) => {
    return {
        type:'DELETE_ITEM_DATA',
        data
    }
};

export const emptyItem = () => {
    return {
        type:'EMPTY_ITEM',
    }
};