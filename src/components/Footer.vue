<template>
    <footer class="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
        <aside>
            <img src="/images/logo.png" alt="君庭阁" class="size-14 -rotate-12 rounded-sm" />
            <p>
                君庭阁服务器
                <br />
                有任何问题随时可以私聊服主或管理，24 小时在线为你解答
            </p>
        </aside>
        <nav>
            <h6 class="footer-title">更多链接</h6>
            <a class="link link-hover" @click="$router.push('/utils')">工具箱</a>
            <a class="link link-hover" href="https://www.yuque.com/u29304293/cc">WiKi</a>
            <!-- <a class="link link-hover">玩家交流群</a> -->
        </nav>
        <nav>
            <h6 class="footer-title">社交媒体</h6>
            <a class="link link-hover" href="https://www.huya.com/ccjun6">服主虎牙直播间</a>
            <a class="link link-hover" href="https://space.bilibili.com/354529617">服务器官方 B 站账户</a>
        </nav>
        <!-- <nav>
            <h6 class="footer-title">更多</h6>
            <a class="link link-hover">关于我们</a>
            <a class="link link-hover">网站作者</a>
        </nav> -->
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
