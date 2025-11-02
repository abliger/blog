<template>
    <div class="Steam">
        <video
            class="steam-video"
            loop
            autoplay
            preload="auto"
            src="steam-profile.mp4"
        ></video>
        <a class="link" :href="config.steamUrl" target="_blank">Steam</a>
        <div class="info">
            <div>
                <div class="steam-logo">
                    <div class="logo-border">
                        <img
                            src="https://shared.fastly.steamstatic.com/community_assets/images/items/860950/6e1b5f5977036a189465f5455f2c54722c12883d.png"
                        />
                    </div>

                    <img
                        src="https://shared.fastly.steamstatic.com/community_assets/images/items/843200/37743171dc20121d000c03cc576a79438ffdaf53.gif"
                    />
                </div>
                <div class="admin-info">
                    <div class="name">ohhhhhh</div>
                    <div class="active">上次在线 1 天前</div>
                </div>
            </div>
            <div class="steam-detail-info">
                <div>
                    <div class="level">10</div>
                    <div>等级</div>
                </div>
                <div>
                    <div class="have-game">169</div>
                    <div>拥有游戏</div>
                </div>
                <div>
                    <div class="total-game-time">11535</div>
                    <div>总时长</div>
                </div>
                <div>
                    <div class="total-workshop-mod">13</div>
                    <div>创意工坊</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="tsx" setup>
    import config from '../../../../config/env/config'
</script>
<style lang="css" scoped>
    .steam-detail-info {
        transform: translateY(-10px);
    }
    .link {
        position: absolute;
        right: 10px;
        top: 5px;
    }
    .Steam {
        height: 100%;
        position: relative;
        ::after {
            content: '';
            position: absolute;
            inset: 0;
            top: 120px;
            background-color: #23262dd6;
            backdrop-filter: blur(1px);
            z-index: -2;
        }
        .steam-video {
            position: absolute;
            inset: 0;
            width: 100%;
            z-index: -3;
        }
    }
    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
        :first-child {
            display: flex;
            flex-direction: row;
            .admin-info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: start;
            }
        }
        :last-child {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            > div {
                display: flex;
                flex-direction: column;
            }
        }
    }
    .steam-logo {
        overflow: hidden;
        height: 160px;
        width: 160px;
        position: relative;
        .logo-border {
            position: absolute;
            inset: 0;
        }
        & > img {
            position: absolute;
            z-index: -1;
            padding: 14px;
        }
    }
</style>
