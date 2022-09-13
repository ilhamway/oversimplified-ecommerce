import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
// TODO: answer here

const useItemStore = create(
    persist(
        devtools((set) => ({
            items: [],
            addItem: (item) => {
                set((state) => ({
                    items: [...state.items, item]
                }));
            },
           removeItem: (id) => {
               set((state) => ({
                   items : state.items.filter(item => item.id !== id)
               }))
           },
        })), {
            name:"items"
        }
    )
)
// TODO: answer here

export default useItemStore
