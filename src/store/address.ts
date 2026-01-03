import { defineStore } from "pinia";
import { ref } from "vue";
import type { Address } from "@/types/address.ts";
import {
    addressGetService,
    addressGetByIdService,
    addressDeleteByIdService,
    addressGetDefaultService,
    addressSetDefaultService,
    addressAddService,
    addressChangeByIdService, addressGetCurrentService
} from "@/api/address.ts";

export const useAddressStore = defineStore("address", () => {
    const address = ref<Address>();
    const addresses = ref<Address[]>([]);
    const defaultAddress = ref<Address | null>(null);
    const currentAddress = ref<Address | null>(null);
    
    // 获取地址列表
    const getAddresses = async () => {
        try {
            const res = await addressGetService();
            if (res.code === 1) {
                addresses.value = res.data;
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    // 获取默认地址
    const getDefaultAddress = async () => {
        try {
            const res = await addressGetDefaultService();
            if (res.code === 1) {
                defaultAddress.value = res.data;
                currentAddress.value = res.data;
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    
    // 新增地址
    const addAddress = async (address: Address) => {
        try {
            const res = await addressAddService(address);
            if (res.code === 1) {
                await getAddresses(); // 更新列表
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    // 修改地址
    const updateAddress = async (address: Address) => {
        try {
            const res = await addressChangeByIdService(address);
            if (res.code === 1) {
                await getAddresses();
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    // 删除地址
    const deleteAddress = async (id: number) => {
        try {
            const res = await addressDeleteByIdService(id);
            if (res.code === 1) {
                await getAddresses();
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    // 设置默认地址
    const setDefaultAddress = async (address: Address) => {
        try {
            const res = await addressSetDefaultService(address);
            if (res.code === 1) {
                await getDefaultAddress();
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    // 根据id查询地址
    const getAddressById = async (id: number) => {
        try {
            const res = await addressGetByIdService(id);
            if (res.code === 1) {
                address.value = res.data;
            }
        }catch (error) {
            console.error(error);
        }
    }
    
    // 获取目前的地址
    const getCurrentAddress = async (position: string) => {
        try {
            const res = await addressGetCurrentService(position);
            if (res.code === 1) {
                currentAddress.value = res.data.address;
            }
        }catch (error) {
            console.error(error);
        }
    }
    
    return {
        addresses,
        defaultAddress,
        address,
        currentAddress,
        getAddresses,
        getDefaultAddress,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        getAddressById,
        getCurrentAddress
    };
});
