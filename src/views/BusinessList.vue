<script setup lang="ts">
import FooterBar from "@/components/FooterBar.vue";
import {useRouter} from "vue-router";
const router = useRouter();
const goBack = () => {
    router.go(-1)
}
const goDetail = (id: number) => {
    if (!Number.isInteger(id)) {
        console.error("id 必须是整数");
        return;
    }
    router.push(`/Info/${id}`)
}

</script>

<template>
    <div class="wrapper">
        <div class="header">
            <div class="return" @click="goBack"><&nbsp;</div>
            <p>商家列表</p>
        </div>
        <div class="business">
            <div class="businessItem" @click="goDetail(1)">
                <div class="businessImg">
                    <img src="@/assets/img/sj02.png">
                    <div class="businessQty">3</div>
                </div>
                <div class="businessInfo">
                    <h3>小锅饭豆腐店（全运店）</h3>
                    <p>￥15起送&nbsp;&nbsp;|&nbsp;&nbsp;￥3配送</p>
                    <p>特色美食</p>
                </div>
            </div>

            <div class="businessItem">
                <div class="businessImg">
                    <img src="@/assets/img/sj02.png">
                    <div class="businessQty">3</div>
                </div>
                <div class="businessInfo">
                    <h3>小锅饭豆腐店（全运店）</h3>
                    <p>￥15起送&nbsp;&nbsp;|&nbsp;&nbsp;￥3配送</p>
                    <p>特色美食</p>
                </div>
            </div>

            <div class="businessItem">
                <div class="businessImg">
                    <img src="@/assets/img/sj02.png">
                    <div class="businessQty">3</div>
                </div>
                <div class="businessInfo">
                    <h3>小锅饭豆腐店（全运店）</h3>
                    <p>￥15起送&nbsp;&nbsp;|&nbsp;&nbsp;￥3配送</p>
                    <p>特色美食</p>
                </div>
            </div>

            <div class="businessItem">
                <div class="businessImg">
                    <img src="@/assets/img/sj02.png">
                    <div class="businessQty">3</div>
                </div>
                <div class="businessInfo">
                    <h3>小锅饭豆腐店（全运店）</h3>
                    <p>￥15起送&nbsp;&nbsp;|&nbsp;&nbsp;￥3配送</p>
                    <p>特色美食</p>
                </div>
            </div>

            <div class="businessItem">
                <div class="businessImg">
                    <img src="@/assets/img/sj02.png">
                    <div class="businessQty">3</div>
                </div>
                <div class="businessInfo">
                    <h3>小锅饭豆腐店（全运店）</h3>
                    <p>￥15起送&nbsp;&nbsp;|&nbsp;&nbsp;￥3配送</p>
                    <p>特色美食</p>
                </div>
            </div>

            <div class="businessItem">
                <div class="businessImg">
                    <img src="@/assets/img/sj02.png">
                    <div class="businessQty">3</div>
                </div>
                <div class="businessInfo">
                    <h3>小锅饭豆腐店（全运店）</h3>
                    <p>￥15起送&nbsp;&nbsp;|&nbsp;&nbsp;￥3配送</p>
                    <p>特色美食</p>
                </div>
            </div>

            <div class="businessItem">
                <div class="businessImg">
                    <img src="@/assets/img/sj02.png">
                    <div class="businessQty">3</div>
                </div>
                <div class="businessInfo">
                    <h3>小锅饭豆腐店（全运店）</h3>
                    <p>￥15起送&nbsp;&nbsp;|&nbsp;&nbsp;￥3配送</p>
                    <p>特色美食</p>
                </div>
            </div>

            <div class="businessItem">
                <div class="businessImg">
                    <img src="@/assets/img/sj02.png">
                    <div class="businessQty">3</div>
                </div>
                <div class="businessInfo">
                    <h3>小锅饭豆腐店（全运店）</h3>
                    <p>￥15起送&nbsp;&nbsp;|&nbsp;&nbsp;￥3配送</p>
                    <p>特色美食</p>
                </div>
            </div>

            <div class="businessItem">
                <div class="businessImg">
                    <img src="@/assets/img/sj02.png">
                    <div class="businessQty">3</div>
                </div>
                <div class="businessInfo">
                    <h3>小锅饭豆腐店（全运店）</h3>
                    <p>￥15起送&nbsp;&nbsp;|&nbsp;&nbsp;￥3配送</p>
                    <p>特色美食</p>
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
    width: 91vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    /*overflow: auto;*/
}

/*头部样式*/
.header {
    height: 12vw;
    width: 100%;

    background-color: #17BAF9;
    color: white;
    font-size: 4.8vw;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
}

.header .return{
    position: fixed;
    top: 3.5vw;
    left: 2vw;
    color: white;
    cursor: pointer;
}

/*商家样式*/
.business {
    width: 100%;
    margin-top: 12vw;
}

.businessItem {
    display: flex;
    align-items: center;
    padding: 2.5vw;
    border-bottom: 1px solid #555555;
    cursor: pointer;
}

.businessInfo {
    margin-left: 3vw;
}

.businessInfo h3 {
    font-size: 4vw;
    font-weight: 700;
    color: #333333;
    text-align: left;
}

.businessInfo p {
    font-size: 3vw;
    color: #555555;
    text-align: left;
}

.businessImg {
    position: relative;
}

.businessImg img {
    width: 23vw;
    height: 23vw;;
}

.businessQty {
    border-radius: 50%;
    background-color: red;
    color: white;
    width: 5vw;
    height: 5vw;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 3.6vw;

    position: absolute;
    top: -1.5vw;
    right: -1.5vw;
}

</style>