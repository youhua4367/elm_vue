// 发送请求的购物车对象
export interface CartItem {
    foodId?: number;
    setMealId?: number;
    flavor?: string;
    businessId: number;
}
// 接受返回的购物车对象
export interface Cart {
    cartId: number;
    foodId: number;
    businessId: number;
    userId: string;
    setMealId: (mealId: number) => void;
    quantity: number;
    flavor: string;
    img: string;
    amount: number;
    name: string;
}