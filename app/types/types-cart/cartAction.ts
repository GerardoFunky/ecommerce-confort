export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string; variant?: any } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { id: string; quantity: number; variant?: any };
    }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: Cart };
