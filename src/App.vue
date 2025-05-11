<script setup lang="ts">
    import { RouterView } from "vue-router";
    import Header from "@/components/Header.vue";
</script>

<template>
    <Header />
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
