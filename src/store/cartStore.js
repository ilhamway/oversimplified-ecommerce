import create from "zustand"
import { persist} from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
// TODO: answer here

const cartQuantityMiddleware = (config) => (set, get, api) =>
  config(
    // TODO: answer here
    (...args) => {
      set(...args)
      const melebihiStock = get().items.filter((item) => item.quantity > item.stock);
      const limitSatu = get().items.filter((item) => item.quantity < 1)
      if(melebihiStock.length > 0){
        return set((state) => ({
          items: state.items.map((item) => item.id === melebihiStock[0].id ? {
            ...item, quantity: item.stock} : item)
        }))
      }
      if(limitSatu.length > 0){
        return set((state) => ({
          items: state.items.map((item) => item.id === limitSatu[0].id ? {
          ...item, quantity: 1} : item)
        }))
      }
    },
    get,
    api,
  );

const useCartStore = create(
  persist(immer(cartQuantityMiddleware((set, get) => ({
      items: [],
      addItem: (item) => {
        const checkDataDiCart = get().items.find((it) => it.id === item.id)
        set((state) => ({
          items: [
            ...state.items.filter((it) => it.id !== item.id),
            {
              ...item, quantity: checkDataDiCart ? checkDataDiCart.quantity + 1 : 1
            }
          ]
        }))
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }))
      },
      changeQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((it) => it.id === id ? 
            { ...it, quantity } : it
          )
        }))
      }
    }))), {
      name:"cart"
    }
  )
)
// TODO: answer here



export default useCartStore
