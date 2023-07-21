import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            state.items = [...state.items, action.payload];
        },
        removeFromBasket: (state, action) => {
            const index = state.items.findIndex(
                (basketItem) => basketItem.id === action.payload.id
            );

            let newBasket = [...state.items];
            
            if(index >= 0) {
              //The items exists in the basket so i will remove it
              newBasket.splice(index, 1) // remove the  item with spicif index
            }
            else {
              console.warn(`Cant Remove The Product (id: ${action.payload.id}) as its not in the basket`);
            }
            state.items = newBasket;
        },
    },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + item.price, 0)

export default basketSlice.reducer;
