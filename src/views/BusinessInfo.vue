<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
const goBack = () => {
    router.go(-1)
}
</script>

<template>
    <div class="wrapper">
        <div class="header">
            <div class="return" @click="goBack"><i class="fa fa-arrow-left"></i></div>
            <p>商家信息</p>
        </div>
        <div class="content">
            <div class="businessInfo">
                <img src="@/assets/img/sj01.png" alt="">
                <div>万家饺子（软件园E18店）</div>
                <div>&#165;15起送&#165;3配送</div>
                <div>各种饺子炒菜</div>
            </div>

            <div class="foodList">
                <div class="foodListMenu">
                    <img src="@/assets/img/sp01.png" alt="">
                    <div class="foodListForm">
                        <div class="foodListMenuInfo">
                            <div class="foodName">纯肉鲜肉（水饺）</div>
                            <div>新鲜猪肉</div>
                            <div class="menuPrice">&#165;15</div>
                        </div>
                        <div class="foodListMenuInput">
                            <button class="minus">-</button>
                            <span class="number">0</span>
                            <button class="plus">+</button>
                        </div>
                    </div>
                </div>
                <div class="foodListMenu">
                    <img src="@/assets/img/sp01.png" alt="">
                    <div class="foodListForm">
                        <div class="foodListMenuInfo">
                            <div class="foodName">纯肉鲜肉（水饺）</div>
                            <div>新鲜猪肉</div>
                            <div class="menuPrice">&#165;15</div>
                        </div>
                        <div class="foodListMenuInput">
                            <button class="minus">-</button>
                            <span class="number">0</span>
                            <button class="plus">+</button>
                        </div>
                    </div>
                </div>
                <div class="foodListMenu">
                    <img src="@/assets/img/sp01.png" alt="">
                    <div class="foodListForm">
                        <div class="foodListMenuInfo">
                            <div class="foodName">纯肉鲜肉（水饺）</div>
                            <div>新鲜猪肉</div>
                            <div class="menuPrice">&#165;15</div>
                        </div>
                        <div class="foodListMenuInput">
                            <button class="minus">-</button>
                            <span class="number">0</span>
                            <button class="plus">+</button>
                        </div>
                    </div>
                </div>
                <div class="foodListMenu">
                    <img src="@/assets/img/sp01.png" alt="">
                    <div class="foodListForm">
                        <div class="foodListMenuInfo">
                            <div class="foodName">纯肉鲜肉（水饺）</div>
                            <div>新鲜猪肉</div>
                            <div class="menuPrice">&#165;15</div>
                        </div>
                        <div class="foodListMenuInput">
                            <button class="minus">-</button>
                            <span class="number">0</span>
                            <button class="plus">+</button>
                        </div>
                    </div>
                </div>
                <div class="foodListMenu">
                    <img src="@/assets/img/sp01.png" alt="">
                    <div class="foodListForm">
                        <div class="foodListMenuInfo">
                            <div class="foodName">纯肉鲜肉（水饺）</div>
                            <div>新鲜猪肉</div>
                            <div class="menuPrice">&#165;15</div>
                        </div>
                        <div class="foodListMenuInput">
                            <button class="minus">-</button>
                            <span class="number">0</span>
                            <button class="plus">+</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div>&nbsp;</div>
        <div class="footer">
            <div class="footerLeft">
                <div class="footerIcon">
                    <i class="fa fa-shopping-cart"></i>
                    <div class="footerQty">0</div>
                </div>
                <div class="footerInf">
                    <div class="footerPrice">&#165;0</div>
                    <div>另需配送费3元</div>
                </div>
            </div>
            <div class="footerRight" id="submitBtn">
                去结算
            </div>
        </div>
    </div>
</template>


<style scoped>
.wrapper {
    width: 91vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/*头部样式*/
.header {
    width: 100%;
    height: 12vw;

    background-color: #17BAF9;
    color: white;
    font-size: 4.8vw;

    display: flex;
    align-items: center;
    justify-content: center;

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

/*内容样式*/
.content {
    width: 100%;
    margin-top: 14vw;
    margin-bottom: 14vw;
}

.businessInfo{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.businessInfo img{
    width: 30%;
    border-radius: 5px;
}

.businessInfo div:nth-child(2){
    font-size: 6vw;
    margin-left: 1vw;
    font-weight: bold;
}

.businessInfo div:nth-child(3){
    font-size: 5vw;
    color: #666666;
    margin-top: 1vw;
}

.businessInfo div:nth-child(4){
    font-size: 5vw;
    color: #666666;
    margin-top: 1vw;
}

/*商品信息*/
.foodListMenu{
    width: 100%;
    padding-top: 2vw;

    display: flex;
    align-items: center;
    /*border: 0.5vw solid #17BAF9;*/
}

.foodListMenu div {
    text-align: left;
}

.foodListMenu img{
    width: 20%;
    height: 100%;
}

.foodListForm{
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 80%;
}

.foodListMenuInfo{
    margin-left: 2.4vw;
}

.foodListMenuInfo div:nth-child(1){
    font-size: 5vw;
    color: #505051;
    margin-bottom: 1vw;
}

.foodListMenuInfo div:nth-child(2){
    font-size: 4.5vw;
    color: #666666;
    margin-bottom: 1vw;
}

.foodListMenuInfo div:nth-child(3){
    font-size: 4.5vw;
    color: #666666;
    margin-bottom: 1vw;
}

.foodListMenuInput{
    display: flex;
    align-items: center;

    padding-right: 2vw;
}

.foodListMenuInput button{
    border-radius: 50%;
    width: 4vw;
    height: 4vw;
    font-size: 3vw;
    cursor: pointer;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
}

.foodListMenuInput span{
    font-size: 3.5vw;
    text-align: center;
    margin: 0 3vw;
    display: none;
}

.foodListMenuInput .minus{
    background-color: #777777;
    display: none;
}

.foodListMenuInput .plus{
    background-color: #00b2ff;

}
/*底部样式*/
.footer {
    width: 100%;
    height: 14vw;

    position: fixed;
    left: 0;
    bottom: 0;
    border: 1px;

    display: flex;
    z-index: 999;
}

.footerLeft {
    flex: 2;
    background-color: #505051;
    display: flex;
}

.footerIcon{
    width: 16vw;
    height: 16vw;
    font-size: 4vw;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background-color: blue;
    border: 1.6vw solid #444444;

    position: relative;
    top: -7vw;
    left: 4vw;
}

.footerQty{
    border-radius: 50%;
    width: 5vw;
    height: 5vw;
    background-color: red;
    font-size: 3.6vw;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: -1.5vw;
    right: -1vw;
}

.footerInf{
    padding-left: 4vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.footerInf div:nth-of-type(1){
    font-size: 5vw;
    color: white;
}

.footerInf div:nth-of-type(2){
    font-size: 3.6vw;
    color: #AAAAAA;
}

.footerRight {
    flex: 1;
    background-color: #38CA73;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 4.6vw;
    font-weight: bold;

    cursor: pointer;
}
</style>