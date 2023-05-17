import { addItem } from "./actions";

const addItemtoBasket = (data) => {
    return async (dispatch) => {
        dispatch(addItem(data));
    };
};

export default addItemtoBasket;