<script setup lang="ts">
import FooterBar from "@/components/FooterBar.vue";
</script>

<template>
    <div class="wrapper">
        <div class="header">我的订单</div>

        <div class="headerInf">
            <div class="headerInf1">未支付订单信息：</div>
        </div>

        <div class="unpaidOrd">
            <div class="unpaidOrd-box" onclick="showInf(this)">
                <div class="unpaidOrd-business">
                    <div class="left">
                        <p>万家饺子&nbsp;（软件园E18店）</p>
                        <i class="fa fa-caret-down"></i>
                    </div>
                    <div class="right">
                        <p>￥49&nbsp;</p>
                        <p>去支付</p>
                    </div>
                </div>

                <div class="unpaidOrdItem">
                    <div>纯肉鲜肉（水饺）&nbsp;×2</div>
                    <div>￥15</div>
                </div>
                <div class="unpaidOrdItem">
                    <div>玉米鲜肉（水饺）&nbsp;×1</div>
                    <div>￥16</div>
                </div>
                <div class="unpaidOrdItem">
                    <div>配送费</div>
                    <div>￥3</div>
                </div>
            </div>

            <div class="unpaidOrd-box" onclick="showInf(this)">
                <div class="unpaidOrd-business">
                    <div class="left">
                        <p>小锅板豆腐馆&nbsp;（全运店）</p>
                        <i class="fa fa-caret-down"></i>
                    </div>
                    <div class="right">
                        <p>￥55&nbsp;</p>
                        <p>去支付</p>
                    </div>
                </div>

                <div class="unpaidOrdItem">
                    <div>纯肉鲜肉（水饺）&nbsp;×2</div>
                    <div>￥30</div>
                </div>
                <div class="unpaidOrdItem">
                    <div>玉米鲜肉（水饺）&nbsp;×1</div>
                    <div>￥22</div>
                </div>
                <div class="unpaidOrdItem">
                    <div>配送费</div>
                    <div>￥3</div>
                </div>
            </div>
        </div>

        <div class="paidInf">
            <div class="paidInf1">已支付订单信息：</div>
        </div>

        <div class="paidOrd">
            <div class="paidOrd-box" onclick="showInf1(this)">
                <div class="paidOrd-business">
                    <div class="left">
                        <p>万家饺子&nbsp;（软件园E18店）</p>
                        <i class="fa fa-caret-down"></i>
                    </div>
                    <div class="right">
                        <p>￥49&nbsp;</p>
                    </div>
                </div>

                <div class="paidOrdItem">
                    <div>纯肉鲜肉（水饺）&nbsp;×2</div>
                    <div>￥15</div>
                </div>
                <div class="paidOrdItem">
                    <div>玉米鲜肉（水饺）&nbsp;×1</div>
                    <div>￥16</div>
                </div>
                <div class="paidOrdItem">
                    <div>配送费</div>
                    <div>￥3</div>
                </div>
            </div>

            <div class="paidOrd-box" onclick="showInf1(this)">
                <div class="paidOrd-business">
                    <div class="left">
                        <p>小锅板豆腐馆&nbsp;（全运店）</p>
                        <i class="fa fa-caret-down"></i>
                    </div>
                    <div class="right">
                        <p>￥55&nbsp;</p>
                    </div>
                </div>

                <div class="paidOrdItem">
                    <div>纯肉鲜肉（水饺）&nbsp;×2</div>
                    <div>￥30</div>
                </div>
                <div class="paidOrdItem">
                    <div>玉米鲜肉（水饺）&nbsp;×1</div>
                    <div>￥22</div>
                </div>
                <div class="paidOrdItem">
                    <div>配送费</div>
                    <div>￥3</div>
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

.headerInf{
    display: flex;
    align-items: center;

    height: 8vw;
    width: 100%;
}

.headerInf1{
    display: flex;
    align-items: center;

    width: 92%;
    height: 8vw;
    color: #BBBBBB;
    font-size: 5vw;

    padding-left: 2vw;
}

/*未支付订单的信息*/
.unpaidOrd{
    display: flex;
    flex-direction: column;

    width: 100%;

}

.unpaidOrd-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
}

.unpaidOrd-business{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 7vw;
}

.unpaidOrd-business .left{
    font-size: 4.2vw;
    color: #777777;

    padding-left: 2vw;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
}

.unpaidOrd-business .right{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 2vw;
}

.unpaidOrd-business .right >p:nth-child(1){
    color: #777777;
    font-size: 5vw;
}

.unpaidOrd-business .right >p:nth-child(2){
    background-color: #FF9900;
    color: white;
    font-size: 4.2vw;
}

.unpaidOrdItem{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.unpaidOrdItem div{
    color: #777777;
    font-size: 3.8vw;
    padding: 0.2vw 2vw 2vw 2vw;
}

/*已支付*/
.paidInf{
    display: flex;
    align-items: center;

    height: 8vw;
    width: 100%;
    margin-top: 8vw;
}

.paidInf1{
    display: flex;
    align-items: center;

    width: 92%;
    height: 8vw;
    color: #BBBBBB;
    font-size: 5vw;

    padding-left: 2vw;
}


/*已支付的信息*/

.paidOrd{
    display: flex;
    flex-direction: column;

    width: 100%;
}

.paidOrd-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
}

.paidOrd-business{
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 7vw;
}

.paidOrd-business .left{
    font-size: 4.2vw;
    color: #777777;

    padding-left: 2vw;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
}

.paidOrd-business .right{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 2vw;
}

.paidOrd-business .right >p:nth-child(1){
    color: #777777;
    font-size: 4.2vw;
}

.paidOrdItem{
    display: none;
    align-items: center;
    justify-content: space-between;
    width: 100%;

}

.paidOrdItem div{
    color: #777777;
    font-size: 3.8vw;
    padding: 0.2vw 2vw 2vw 2vw;
}
</style>