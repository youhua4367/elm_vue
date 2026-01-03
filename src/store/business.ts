import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {BusinessInfo} from '@/types/business'
import {businessInfoService} from '@/api/business'

export const useBusinessStore = defineStore('business', () => {
    // 状态
    const businessList = ref<BusinessInfo[]>([])
    const currentBusiness = ref<BusinessInfo>()
    const loading = ref(false)
    // 获取商家列表
    const getBusinessList = async () => {
        if (businessList.value.length > 0) return // 防止重复请求
        
        loading.value = true
        try {
            const res = await businessInfoService()
            if (res.code === 1) {
                businessList.value = res.data
            }
        } finally {
            loading.value = false
        }
    }
    
    // 根据分类筛选
    const getByType = (typeId: number) => {
        return businessList.value.filter(b => b.orderTypeId === typeId)
    }
    
    // 获取指定商家
    const getByBusinessId = (businessId: number) => {
        currentBusiness.value = businessList.value.filter(b => b.businessId === businessId)[0]
    }

    // 清空（登出用）
    const removeBusiness = () => {
        businessList.value = []
    }
    
    return {
        businessList,
        currentBusiness,
        loading,
        getBusinessList,
        getByType,
        removeBusiness,
        getByBusinessId,
    }
})
