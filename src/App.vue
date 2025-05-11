<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from "vue";
    import { RouterView } from "vue-router";

    const openLink = (url: string) => {
        window.open(url, "_blank");
    };

    const scrolled = ref(false);
    onMounted(() => {
        const onScroll = () => {
            scrolled.value = window.scrollY > 64;
        };
        window.addEventListener("scroll", onScroll);
        onScroll();
        onUnmounted(() => window.removeEventListener("scroll", onScroll));
    });
</script>

<template>
    <header
        class="fixed top-0 w-full h-22 bg-black/50 flex items-center px-32 gap-2 transition-all duration-150 ease-in-out z-10"
        :class="{ 'pl-48 bg-black/90': scrolled }">
        <img src="/images/juntingge.png" alt="君庭阁" class="size-16 -rotate-12 rounded-sm mr-6" />
        <button class="btn btn-outline border-0" @click="$router.push('/')">
            <span :class="{ 'opacity-75': $route.fullPath !== '/' }">首页</span>
        </button>
        <button class="btn btn-outline border-0" @click="$router.push('/server')">
            <span :class="{ 'opacity-75': $route.fullPath !== '/server' }">纯净生存服</span>
        </button>
        <button
            class="ml-auto btn btn-info btn-outline btn-circle"
            @click="openLink('https://space.bilibili.com/354529617')">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M18.223 3.086a1.25 1.25 0 0 1 0 1.768L17.08 5.996h1.17A3.75 3.75 0 0 1 22 9.747v7.5a3.75 3.75 0 0 1-3.75 3.75H5.75A3.75 3.75 0 0 1 2 17.247v-7.5a3.75 3.75 0 0 1 3.75-3.75h1.166L5.775 4.855a1.25 1.25 0 0 1 1.767-1.768l2.652 2.652q.119.119.198.257h3.213q.08-.14.199-.258l2.651-2.652a1.25 1.25 0 0 1 1.768 0m.027 5.42H5.75a1.25 1.25 0 0 0-1.247 1.157l-.003.094v7.5c0 .659.51 1.198 1.157 1.246l.093.004h12.5a1.25 1.25 0 0 0 1.247-1.157l.003-.093v-7.5c0-.69-.56-1.25-1.25-1.25m-10 2.5c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25m7.5 0c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25" />
            </svg>
        </button>
        <button class="btn btn-warning btn-outline btn-circle" @click="openLink('https://www.huya.com/ccjun6')">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-7" viewBox="0 0 48 48">
                <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path
                        d="M36.495 14.143c8.681 9.38 6.688 18.158 2.032 22.234c-2.847 2.492-7.11 3.919-11.935 4.278c-9.112.677-18.77-1.863-20.777-11.023c-.806-3.678-.363-8.764 4.068-13.49c.007-3.586.93-5.806 2.636-8.474a14 14 0 0 1 6.628 2.203c2.339-.735 4.115-.868 6.372-.582c1.186-.919 1.837-1.562 3.143-2.047c4.19 1.772 5.994 3.938 7.833 6.9" />
                    <path d="M18.857 32.391c1.943 2.417 11.815 1.56 14.092-1.254" />
                    <path
                        d="M32.73 31.382c.223 1.427-.005 2.722-.592 3.853c-1.063-.31-2.258-1.063-2.837-2.14m-6.381.675c-.418 1.048-1.217 1.894-2.362 2.504c-.823-1.003-1.361-2.287-1.402-3.584M5.857 29.814c1.416-.861 3.266-1.382 5.388-1.575c-1.573 1.66-2.94 3.422-3.83 5.424m2.125 2.578c1.424-1.985 3.34-3.374 5.699-4.017c-1.227 1.975-1.685 4.424-1.545 6.673m28.639-9.461c-.752-1.066-1.707-2.064-3.203-3.18c1.195-.17 2.155-.084 3.349.233m-3.74 9.695c-.3-1.716-1.072-3.864-2.619-5.48a9.53 9.53 0 0 1 5.089 2.182M30.174 20.278c.086 1.717-5.602 5.454-7.11 4.671s-1.854-7.648-.432-8.583c1.422-.934 7.455 2.195 7.542 3.912" />
                    <path
                        d="M25.724 28.984c7.56-.66 11.817-.87 12.804-4.93c1.227-5.046-5.582-12.697-14.321-11.934c-6.277.547-12.65 4.821-12.52 11.765c.109 5.845 4.485 5.933 14.037 5.1" />
                </g>
            </svg>
        </button>
    </header>
    <RouterView />
    <footer class="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
        <aside>
            <img src="/images/logo.png" alt="君庭阁" class="size-14 -rotate-12 rounded-sm" />
            <p>
                君庭阁服务器
                <br />
                {这句话是占位用的，记得换}
            </p>
        </aside>
        <nav>
            <h6 class="footer-title">{还没想好写啥标题}</h6>
            <a class="link link-hover">{还没想好写啥}</a>
            <a class="link link-hover">{还没想好写啥}</a>
            <a class="link link-hover">{还没想好写啥}</a>
            <a class="link link-hover">{还没想好写啥}</a>
        </nav>
        <nav>
            <h6 class="footer-title">更多</h6>
            <a class="link link-hover">关于我们</a>
            <a class="link link-hover">网站作者</a>
        </nav>
        <nav>
            <h6 class="footer-title">备案信息</h6>
            <a class="link link-hover">陕ICP备2022008445号</a>
            <a
                class="link link-hover flex gap-1 items-center"
                href="https://beian.mps.gov.cn/#/query/webSearch?code=61092602000117">
                <img src="/icons/beian.png" class="size-4" alt="公安" />
                陕公网安备61092602000117号
            </a>
        </nav>
    </footer>
</template>
