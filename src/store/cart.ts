import {defineStore} from "pinia";
import type {CartItem} from "@/types/cart.ts";
import type {Food} from "@/types/food.ts";


export const useCartStore = defineStore("cart", {
    state: () => ({
        items: [] as CartItem[],
    }),
    getters: {
       totalQuantity: (state) =>
            state.items.reduce((sum, item) => sum + item.quantity, 0),
       
       totalPrice: (state) =>
            state.items.reduce((sum, item) => sum + item.quantity * item.foodPrice, 0),
    },
    actions: {
        // 添加到购物车 +1
        addToCart(food:Food) {
            const item = this.items.find((it) => it.foodId === food.foodId);
            if (item) {
                // 存在此商品则数量 +1
                item.quantity += 1;
            } else {
                // 不存在此商品则添加
                this.items.push({
                    foodId: food.foodId,
                    foodName: food.foodName,
                    foodPrice: food.foodPrice,
                    quantity: 1
                })
            }
        },
        // 移除购物车 -1
        removeFromCart(food:Food) {
            const item = this.items.find((it) => it.foodId === food.foodId);
            if (item) {
                item.quantity -= 1;
            } else {
                this.items = this.items.filter(it => it.foodId === food.foodId);
            }
        },
        // 移除商品
        deleteItem(foodId:number) {
            this.items.filter(it => it.foodId !== foodId);
        },
        // 清空购物车
        clearCart() {
            this.items = []
        }
    },
    persist:true,
})