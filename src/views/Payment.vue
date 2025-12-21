<script setup lang="ts">
import FooterBar from "@/components/FooterBar.vue";
</script>

<template>
    <div class="wrapper">
        <div class="return" onclick="history.back()"><&nbsp;</div>
        <div class="header">在线支付</div>

        <div class="paymentInfo">
            <div class="paymentInfoTitle">订单信息：</div>
            <div class="paymentInfoContent">
                <div>万家饺子（软件园E18店）</div>
                <div class="finalBill">￥49</div>
            </div>
        </div>

        <div class="paymentItem">
            <div class="paymentItemInfo">
                <div>纯肉鲜肉（水饺）&nbsp;×2</div>
                <div>￥15</div>
            </div>
            <div class="paymentItemInfo">
                <div>玉米鲜肉（水饺）&nbsp;×1</div>
                <div>￥16</div>
            </div>
            <div class="paymentItemInfo">
                <div>配送费</div>
                <div>￥3</div>
            </div>
        </div>

        <div class="paymentWay">
            <form>
                <label class="paymentWayInfo">
                    <input type="radio" name="payment" value="alipay" checked>
                    <div class = "paymentWayItem">
                        <img src="@/assets/img/wechat.png" alt="">
                        <img src="@/assets/img/check.png" alt="" class="checkmark">
                    </div>
                </label>

                <label class="paymentWayInfo">
                    <input type="radio" name="payment" value="wechat">
                    <div class = "paymentWayItem">
                        <img src="@/assets/img/alipay.png" alt="">
                        <img src="@/assets/img/check.png" alt="" class="checkmark">
                    </div>
                </label>
            </form>
        </div>

        <div class="paymentConfirm">
            <div class="paymentConfirmInfo">确认支付</div>
        </div>

        <div style="margin-bottom: 11vw">&nbsp;</div>
        <div>&nbsp;</div>
        <FooterBar/>
    </div>
</template>

<style scoped>
.wrapper{
    width: 91vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/*头部*/
.header{
    width: 100%;
    height: 10vw;
    background-color: #0097FF;

    display: flex;
    justify-content: center;
    align-items: center;
    color: white;

    font-size: 5vw;
}

.return{
    position: fixed;
    top: 3vw;
    left: 2vw;
    color: white;
    cursor: pointer;
}

/*信息列*/
.paymentInfo{
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
}

.paymentInfoTitle{
    font-size: 4vw;
    padding: 2.5vw;
    color: #888888;
    text-align: left;
}

.paymentInfoContent{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.paymentInfoContent >div:nth-child(1){
    color: #666666;
    padding: 2.5vw;
    font-size: 4vw;
}

.paymentInfoContent >div:nth-child(2){
    font-size: 4vw;
    color: red;
    padding: 2.5vw;
}

/*支付项*/
.paymentItem{
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
}

.paymentItemInfo{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 3.5vw;
    color: #666666;
    padding: 0.5vw 2.5vw;
}

/*支付方式*/
.paymentWay{
    display: flex;
    flex-direction: column;
    padding-top: 3vw;
    width: 100%;
}

.paymentWayInfo{
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding-bottom: 4vw;
}

.paymentWayInfo input[type="radio"]{
    display: none;
}

.paymentWayItem{
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    width: 100%;
}

.paymentWayItem img{
    width: 30%;
    height: 100%;
    padding-left: 2vw;
}

.paymentWayItem .checkmark{
    width: 5vw;
    height: 5vw;
    margin-left: auto;
    padding-right: 2vw;

    visibility: hidden;
}

.paymentWayInfo input[type="radio"]:checked + .paymentWayItem .checkmark{
    visibility: visible;
}

/*确认支付*/
.paymentConfirm{
    width: 100%;
    height: 10vw;

    display: flex;
    justify-content: center;
    align-items: center;

}

.paymentConfirmInfo{
    display: flex;
    justify-content: center;
    align-items: center;

    width: 92%;
    height: 10vw;

    color: white;
    font-size: 4vw;

    background-color: #38CA73;

}

/*底部样式*/
.footer {
    width: 100%;
    display: flex;
    height: 12vw;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    border-top: 2px solid #656464;

    position: fixed;
    left: 0;
    bottom: 0;
}


.footer div {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    color: #656464;
    padding-top: 2vw;
}

.footer >div:nth-child(1) {
    padding-left: 1vw;
}

.footer >div:nth-child(4) {
    padding-right: 1vw;
}

.footer i {
    font-size: 4.5vw;
}

.footer p {
    font-size: 2.5vw;
}
</style>