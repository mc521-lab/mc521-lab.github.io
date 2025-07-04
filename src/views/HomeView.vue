<script setup lang="ts">
    import { computed, onMounted, onUnmounted, ref } from "vue";
    import PreviewImage from "@/components/PreviewImage.vue";

    const title_frame = ref(3);
    let title_timer = 0;

    const preview_frame = ref(0);
    const previewImages = [
        { src: "/images/card-frame/1.png", text: "主城风景1", filter: [0, 1] },
        { src: "/images/card-frame/2.png", text: "主城风景2", filter: [0, 1] },
        { src: "/images/card-frame/3.png", text: "宣传海报", filter: [0, 2] },
        { src: "/images/card-frame/4.png", text: "小游戏联赛合照", filter: [0, 3] },
        { src: "/images/card-frame/5.jpg", text: "玩家合照", filter: [0, 3] },
        { src: "/images/card-frame/6.jpg", text: "游乐设施", filter: [0, 3] },
        { src: "/images/card-frame/7.png", text: "玩家建筑", filter: [0, 4] },
        { src: "/images/card-frame/8.png", text: "社区小镇", filter: [0, 4] },
    ];
    const filteredImages = computed(() => previewImages.filter((img) => img.filter.includes(preview_frame.value)));

    onMounted(() => {
        title_frame.value = 0;
        title_timer = setInterval(() => {
            title_frame.value++;
        }, 2000);
    });
    onUnmounted(() => {
        clearInterval(title_timer);
    });
    const goDown = () => {
        window.scrollTo({
            top: window.innerHeight - 24,
            behavior: "smooth",
        });
    };
</script>

<template>
    <main>
        <section class="hero min-h-screen" style="background-image: url(/images/poster.png)">
            <div class="hero-overlay backdrop-blur-xs"></div>
            <div class="hero-content text-neutral-content text-center">
                <div class="max-w-md scale-110">
                    <section class="flex flex-col lg:flex-row lg:gap-4 justify-self-center text-[#fffacd]">
                        <h1 class="mb-5 text-5xl font-bold">世外桃源</h1>
                        <section class="w-[calc(var(--text-5xl)*4)] relative">
                            <Transition name="fadeQuickOut">
                                <h1 v-if="title_frame % 4 === 0" class="mb-5 text-5xl font-bold absolute">梦里踏雪</h1>
                            </Transition>
                            <Transition name="fadeQuickOut">
                                <h1 v-if="title_frame % 4 === 1" class="mb-5 text-5xl font-bold absolute">诗丽画境</h1>
                            </Transition>
                            <Transition name="fadeQuickOut">
                                <h1 v-if="title_frame % 4 === 2" class="mb-5 text-5xl font-bold absolute">桃李花开</h1>
                            </Transition>
                            <Transition name="fadeQuickOut">
                                <h1 v-if="title_frame % 4 === 3" class="mb-5 text-5xl font-bold absolute">梧桐叶落</h1>
                            </Transition>
                        </section>
                    </section>
                    <p class="text-[#fffacd] mt-32 lg:mt-8">我的世界君庭阁服务器</p>
                    <p class="text-[#fffacd] mb-8">服务器正常运行中！欢迎加入我们！</p>
                    <div class="flex gap-2 justify-self-center">
                        <button class="btn btn-warning" @click="$router.push('/server')">下载客户端</button>
                        <button class="btn btn-warning btn-outline" @click="goDown()">了解详情</button>
                    </div>
                </div>
            </div>
        </section>
        <section class="flex justify-center items-center flex-col gap-12 py-12 px-8 w-full lg:w-2/3 lg:justify-self-center lg:flex-row lg:gap-48 lg:min-h-128">
            <div>
                <h2 class="text-4xl">君庭阁欢迎您</h2>
                <br />
                <p class="opacity-75 lg:w-2/3">
                    亲爱的的玩家,欢迎加入君庭阁这个大家庭！本服务器内置多个玩法：附魔 / 副本 / 挂机池 / 称号 / RPG武器 /
                    阶级系统等。服务器还配有小游戏世界和官方刷怪塔，快
                    <a class="link" @click="$router.push('/server')">下载客户端</a> 加入我们吧!
                </p>
                <p id="poem-text"></p>
            </div>
            <img
                class="has-event size-64 rounded-lg lg:size-72 lg:hover:scale-110 lg:transition-all lg:duration-250 lg:ease-in-out"
                src="/images/logo.png"
                alt="服务器Logo" />
        </section>
        <section class="flex justify-center items-center flex-col lg:min-h-128 pb-24">
            <h2 class="text-4xl">风景欣赏</h2>
            <div class="flex flex-col lg:flex-row justify-center items-center mt-8 gap-2">
                <button
                    class="btn btn-sm"
                    :class="{ 'btn-warning btn-outline': preview_frame === 0, 'btn-dash': preview_frame !== 0 }"
                    @click="preview_frame = 0">
                    显示全部
                </button>
                <button
                    class="btn btn-sm"
                    :class="{ 'btn-warning btn-outline': preview_frame === 1, 'btn-dash': preview_frame !== 1 }"
                    @click="preview_frame = 1">
                    主城风景
                </button>
                <button
                    class="btn btn-sm"
                    :class="{ 'btn-warning btn-outline': preview_frame === 2, 'btn-dash': preview_frame !== 2 }"
                    @click="preview_frame = 2">
                    宣传海报
                </button>
                <button
                    class="btn btn-sm"
                    :class="{ 'btn-warning btn-outline': preview_frame === 3, 'btn-dash': preview_frame !== 3 }"
                    @click="preview_frame = 3">
                    玩家合照
                </button>
                <button
                    class="btn btn-sm"
                    :class="{ 'btn-warning btn-outline': preview_frame === 4, 'btn-dash': preview_frame !== 4 }"
                    @click="preview_frame = 4">
                    玩家建筑
                </button>
            </div>
            <TransitionGroup name="list" tag="div" class="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-16">
                <div
                    v-for="(img, _idx) in filteredImages"
                    :key="img.src"
                    :enter="{ scale: 0, opacity: 0 }"
                    :enter-active="{ scale: 1, opacity: 1 }"
                    :leave-active="{ scale: 1, opacity: 1 }"
                    :leave-to="{ scale: 0, opacity: 0 }">
                    <PreviewImage class="w-64" :src="img.src" :hoverText="img.text" />
                </div>
            </TransitionGroup>
        </section>
        <section class="flex flex-col lg:flex-row w-full justify-start transition-all duration-300 ease-in-out">
            <img src="/images/bottom1.png" />
            <div class="mt-16 px-16">
                <h2 class="text-4xl">主城风景欣赏</h2>
                <p class="mt-8 opacity-75 lg:w-128">
                    全新的主城风格给您带来不一样的体验，让您在探索服务器的同时，获得前所未有的视觉与体验盛宴。庞大的建筑、生动的场景细节、独特的光影变化，交织出属于服务器的美丽景象。从现代都市到古典小镇，在这里你尽可以寻找到自己所喜欢的一切，发现属于自己的那份惊喜和喜爱。
                </p>
            </div>
        </section>
        <section class="flex flex-col lg:flex-row w-full justify-end">
            <div class="mt-16 px-16">
                <h2 class="text-4xl text-center lg:text-right">服务器后台</h2>
                <p class="mt-8 opacity-75 lg:text-right lg:w-128">
                    后台搭载AMD7950x 16 核心 32 线程 1T 硬盘容量的顶级配置
                    <br />
                    备份硬盘12T每三个小时备份一次24小时不间断保护大家的数据
                    <br />
                    不会担心服务器卡顿或过载，旨在为玩家提供更出色的游戏体验
                </p>
            </div>
            <img src="/images/bottom2.png" class="mt-8 lg:mt-0" />
        </section>
    </main>
</template>

<style scoped>
    /* 控制进入和离开的透明度 */
    .fadeQuickOut-enter-active,
    .fadeQuickOut-leave-active {
        transition: all 0.5s;
    }
    .fadeQuickOut-enter-from,
    .fadeQuickOut-leave-to {
        opacity: 0;
    }
    .fadeQuickOut-leave-to {
        transition: none;
    }

    .list-move,
    .list-enter-active,
    .list-leave-active {
        transition: all 0.5s ease;
    }

    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }

    .list-leave-active {
        position: absolute;
    }
</style>

