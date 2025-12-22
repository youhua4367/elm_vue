import { defineStore } from "pinia";
import {computed, ref} from "vue";
import type {Cart, CartItem} from "@/types/cart";
import {
    cartAddService,
    cartSubService,
    cartGetService,
    cartCleanService
} from "@/api/cart";

export const useCartStore = defineStore("cart", () => {
    // 购物车列表
    const items = ref<Cart[]>([]);
    
    // 总数量
    const totalQuantity = computed(() => {
        return items.value.reduce((sum, item) => sum + item.quantity, 0);
    });
    
    // 总金额
    const totalPrice = computed(() => {
        return items.value.reduce((sum, item) => sum + item.amount, 0);
    });
    
    // 获取购物车列表
    const getCart = async () => {
        try {
            const res = await cartGetService();
            if (res.code === 1) {
                items.value = res.data; // 后端返回的购物车列表
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    // 添加商品
    const addToCart = async (cartItem: CartItem) => {
        try {
            const res = await cartAddService(cartItem);
            if (res.code === 1) {
                await getCart(); // 更新购物车
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    // 减少商品
    const subFromCart = async (cartItem: CartItem) => {
        try {
            const res = await cartSubService(cartItem);
            if (res.code === 1) {
                await getCart();
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    // 清空购物车
    const clearCart = async () => {
        try {
            const res = await cartCleanService();
            if (res.code === 1) {
                items.value = [];
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    return { items, totalQuantity, totalPrice, getCart, addToCart, subFromCart, clearCart };
});
