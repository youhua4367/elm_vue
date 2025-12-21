<script setup lang="ts">
import FooterBar from "@/components/FooterBar.vue";
import {useRouter} from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import {useBusinessStore} from "@/store/business.ts";
import type {FoodType} from "@/types/foodType.ts";
import {foodTypeService} from "@/api/foodType.ts";

const foodType = ref<FoodType[]>([])
const businessStore = useBusinessStore()

// 绑定 DOM
const searchRef = ref<HTMLElement | null>(null)
const router = useRouter();

// 滚动处理函数
const handleScroll = () => {
    console.log('scroll triggered')
    // 兼容 PC / 移动端
    const s1 = document.documentElement.scrollTop
    const s2 = document.body.scrollTop
    const scroll = s1 === 0 ? s2 : s1

    const width = document.documentElement.clientWidth

    console.log(searchRef.value)
    if (searchRef.value) {
        if (scroll >= 0.12 * width) {
            searchRef.value.style.position = 'fixed'
            searchRef.value.style.left = '0'
            searchRef.value.style.top = '20vw'
            searchRef.value.style.zIndex = '10000'
        } else {
            searchRef.value.style.position = 'static'
        }
    }
}

const showFoodType = (typeId: number) => {
    router.push(`/list/${typeId}`)
}

const getFoodTypes = async () => {
    try {
        const res = await foodTypeService();
        if (res.code === 1) {
            foodType.value = [...res.data].sort(
                (a, b) => a.sortOrder - b.sortOrder,
            );
        }
    } catch (err) {
        console.log(err);
    }
}

const getImgUrl = (baseUrl: String) => {
    return new URL(`../assets/img/${baseUrl}`, import.meta.url).href
}


onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    businessStore.getBusinessList()
    getFoodTypes()
})

// 卸载时移除（非常重要）
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

</script>

<template>
    <div class="wrapper">
        <div class="header">
            <div class="icon-location-box">
                <div class='icon-location'></div>
            </div>
            <div class="location-text">
                云南大学呈贡校区力行楼<i style="margin-left: 0.2vw" class="fa fa-caret-down"></i>
            </div>
        </div>
        <div class="search" ref="searchRef">
            <div id='fixedSearchBox' class="search-box">
                <div class='search-panel'>
                    <i class="fa fa-search" style="flex: 0 0 6vw;padding-left: 8px;padding-right: 3px"></i>
                    <input id="keyWords" type="text" placeholder="请输入要查询的内容"
                           style="flex: 10;outline: none; border: none;color: #9f9f9f">
                    <div class="search-button" style="flex: 0 0 17vw;">搜索</div>
                </div>
            </div>
        </div>
        <div class="foodType">
            <div class="foodTypeItem"
                 @click="showFoodType(type.typeId)"
                 v-for="type in foodType"
                 :key="type.typeId">
                <img :src="getImgUrl(type.typeImg)" height="120" width="140" alt=""/>
                <p>{{ type.typeName }}</p>
            </div>
        </div>

        <div class="banner">
            <h3 class="h3Title" style="margin-bottom: 1.2vw">品质套餐</h3>
            <div class="bannerText" style="margin-bottom: 4.5vw">搭配齐全吃得好</div>
            <div class="bannerText">
                <a class="linkText">立即抢购&nbsp;&nbsp;></a>
            </div>
        </div>

        <div class="member">
            <div class="left">
                <img src="@/assets/img/super_member.png" height="45" width="45">
                <h3 class="h3Title">&nbsp;&nbsp; 超级会员&nbsp;&nbsp;</h3>
                <p class="bannerText">&#8226;&nbsp;&nbsp;每月享超值权益</p>
            </div>
            <div class="right linkText">立即开通&nbsp;&nbsp;></div>
        </div>

        <div class="recommend">
            <div class="recommend-line"></div>
            <p class="h3Title">推荐商家</p>
            <div class="recommend-line"></div>
        </div>

        <div class="recommendType">
            <div>综合排序 <i class="fa fa-caret-down"></i></div>
            <div>距离最近</div>
            <div>销量最高</div>
            <div>筛选 <i class="fa fa-filter"></i></div>
        </div>

        <div class="businessList">
            <div class="business"
                 v-for="business in businessStore.businessList"
                 :key="business.businessId">
                <img :src="business.businessImg">

                <div class="businessInfo">
                    <div class="businessTitle">
                        <h3>{{ business.businessName }}</h3>
                        <i class="fa fa-mobile-phone"></i>
                    </div>

                    <div class="businessSaleInf">
                        <div class="businessSaleInfLeft">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <p>&nbsp;4.9&nbsp;&nbsp;月售345单</p>
                        </div>
                        <div class="fengniaoDiver">蜂鸟专送</div>

                    </div>

                    <div class="businessPak">
                        <p>￥{{ business.starPrice }}起送&nbsp;&nbsp;|&nbsp;&nbsp;￥{{ business.deliveryPrice }}配送</p>
                        <p>3.22km&nbsp;&nbsp;|&nbsp;&nbsp;30分钟</p>
                    </div>

                    <div class="businessDescript">
                        <p>{{ business.businessExplain }}</p>
                    </div>

                    <div class="businessInfoPromotion">
                        <div class="left">
                            <div class="icon">新</div>
                            <p>饿了么新用户首单立减9元</p>
                        </div>
                        <div class="right">
                            <p>2个活动</p>
                            <i class="fa fa-caret-down"></i>
                        </div>
                    </div>

                    <div class="businessInfoPromotion">
                        <div class="left">
                            <div class="icon" style="background-color: #F1884F">特</div>
                            <p>特价商品5元起</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>


        <div style="margin-bottom: 11vw">&nbsp;</div>
        <div>&nbsp;</div>
        <FooterBar/>

    </div>
</template>


<style scoped>
/*总容器样式*/
.wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    /*overflow: auto;*/
    margin: 0;
}

/*头部样式*/
.header {
    display: flex;
    height: 12vw;
    width: 100%;
    margin-left: 0;
    background-color: #17BAF9;
    align-items: center;
}

.icon-location-box {
    height: 8vw;
    width: 8vw;
    margin: 1vw 3vw 3vw 3vw;
}

.icon-location {
    border-radius: 50% 50% 50% 0;
    background-color: white;
    width: 100%;
    height: 100%;
    transform: rotate(-45deg);
    position: relative;
}

.icon-location:after {
    content: "";
    width: 40%;
    height: 40%;
    background-color: #0097FF;
    position: absolute;
    margin: 30% 0 0 -15%;
    border-radius: 50%;
}

.location-text {
    font-size: 4.5vw;
    color: white;
    font-weight: bold;
}

/*搜索栏样式*/
.search {
    width: 100%;
    height: 10vw;
    /*position: sticky;*/
    /*top: 0;*/
    /*z-index: 10;*/
}

.search input {
    display: flex;
    font-size: 5vw;
}

.search-box {
    display: flex;
    width: 100%;
    height: 10vw;
    justify-content: center;
    background-color: white;
    /*align-items: center;*/
}

.search-panel {
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 25px;
    border: 2px solid #17BAF9;
    height: 8vw;
    width: 97%;

    font-size: 5vw;
    color: #9f9f9f;

}

.search-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #17BAF9;
    color: white;
    border-radius: 23px;
    height: 8vw;
    font-size: 4vw;
    cursor: pointer;
}

/*食物类别*/
.foodType {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}

.foodTypeItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    width: 18vw;
    height: 20vw;
}

.foodTypeItem img {
    width: 12vw;
    height: 10vw;
}

.foodTypeItem p {
    color: #656464;
    font-size: 3.5vw;
    margin: 0;
}


/*广告*/
.banner {
    width: 91vw;
    height: 29vw;
    background-image: url("@/assets/img/index_banner.png");
    background-repeat: no-repeat;
    background-size: cover;
    margin-left: 4vw;

}

.h3Title {
    text-align: left;
    margin-left: 1vw;
}

.bannerText {
    text-align: left;
    margin-left: 1vw;
}

.banner a {
    text-align: left;
    margin-left: 1vw;
}

/*会员*/
.member {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    border-radius: 2px;
    border: 2px solid #17BAF9;
    background-color: #FEEDC1;
    height: 11.5vw;
}

.member img {
    width: 6vw;
    height: 6vw;
    margin-left: 4vw;
}

.member .left {
    display: flex;
    align-items: center;

}

.member .right {
    margin-right: 4vw;
}

/*推荐商家样式*/
.recommend {
    display: flex;
    align-items: center;
    justify-content: center;
}

.recommend-line {
    height: 0.2vw;
    width: 6vw;
    background-color: #888888;
    margin-left: 3vw;
    margin-right: 3vw;
}

.recommendType {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 3.5vw;
    color: #555555;
}

/*商家样式*/
.businessList {
    display: flex;
    flex-direction: column;
}

.businessList img {
    width: 20vw;
    height: 20vw;
}

.businessList .business {
    padding: 2.5vw;
    display: flex;

    border-bottom: 1px solid #555555;
}

.businessInfo {
    color: #666666;
    font-size: 3.2vw;
    margin-left: 3vw;
    flex: 9;
    line-height: 0;
}

.businessTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.businessTitle h3 {
    font-size: 4vw;
    color: #333333;
}

.businessSaleInf {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.businessSaleInfLeft {
    display: flex;
    align-items: center;
}

.businessSaleInfLeft i {
    color: #FEC80E;
}

.fengniaoDiver {
    color: white;
    background-color: #0097FF;
    font-size: 2.4vw;
    padding: 0.5vw;
    border-radius: 2px;
    line-height: 1;
}

.businessPak {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.businessDescript {
    display: flex;
    align-items: center;
}

.businessInfoPromotion {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.businessInfoPromotion .left, .right {
    display: flex;
    align-items: center;
    justify-content: center;
}

.businessInfoPromotion .left .icon {
    background-color: #70BC47;
    line-height: 1.5;
    width: 4vw;
    height: 4vw;
    border-radius: 3px;
    color: white;
    margin-right: 2vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
