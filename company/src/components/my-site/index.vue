<template>
  <div class="bytedance-home">
    <!-- 导航栏 -->
    <div class="_header"></div>
    <el-header
      class="header"
      :style="{
        background: `rgba(60, 140, 255, ${navOpacity})`,
        transform: `scale(${bannerScale}) translateY(${
          10 * (1 - bannerScale)
        }px)`,
        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }"
    >
      <div class="container">
        <div class="logo">
          <img loading="eager" src="@/assets/byte-dance-logo.png" alt="ByteDance" />
        </div>
        <el-menu
          mode="horizontal"
          class="nav-menu"
          @select="handleSelect"
          :ellipsis="false"
        >
          <el-menu-item index="about">{{ t("header.about") }}</el-menu-item>
          <el-menu-item index="products">{{
            t("header.products")
          }}</el-menu-item>
          <el-menu-item index="news">{{ t("header.news") }}</el-menu-item>
          <el-menu-item index="csr">{{ t("header.csr") }}</el-menu-item>
          <el-menu-item index="join">{{ t("header.join") }}</el-menu-item>
        </el-menu>
      </div>
      <!-- <search></search> -->
    </el-header>

    <!-- 动态内容区域 -->
    <Suspense>
      <component
        :is="currentComponent"
        :key="activeTab"
        class="content-section"
      />

      <template #fallback>
        <div class="loading-container">
          <el-icon class="is-loading"><Loading /></el-icon>
        </div>
      </template>
    </Suspense>
    <el-container
      v-loading="isLoading"
      :style="{
        visibility: activeTab != 'news' ? 'hidden' : 'visible',
        display: activeTab != 'news' ? 'none' : 'flex',
      }"
    >
      <!-- <el-main>
        <iframe
          src="https://opensource.icegl.cn/#/plugins/digitalCity/weather"
          frameborder="0"
          :style="{ width: '90vw', height: '100vh' }"
        ></iframe
      ></el-main> -->
    </el-container>

    <!-- 底部信息 -->
    <el-footer class="main-footer">
      <div class="footer-container">
        <div class="footer-columns">
          <!-- Logo列 -->
          <div class="footer-logo">
            <img
              :src="getImageUrl('byte-dance-logo.png')"
              alt="ByteDance"
              class="logo-image"
              loading="eager"
            />
          </div>

          <!-- 动态生成链接列 -->
          <div
            v-for="(col, index) in footerColumns"
            :key="index"
            class="footer-col"
            :class="{ 'pr-50': index === 3 }"
          >
            <h3 class="column-title">{{ t(col.title) }}</h3>
            <div
              v-for="(link, linkIndex) in col.links"
              :key="linkIndex"
              class="link-item"
            >
              <el-link :href="link.url" type="info" class="footer-link">
                {{ t(link.text) }}
              </el-link>
            </div>
          </div>
        </div>

        <!-- 底部信息 -->
        <div class="footer-bottom">
          <div class="copyright">
            <!-- © 2017 Todos los Derechos Reservados |
            <el-link type="info" href="#">Magtimus</el-link> -->
            {{ t("copyright") }}
          </div>
          <div class="legal-info">
            <!-- © 2012-2021 字节跳动<br />
            京公网安备 11000002002068号 京ICP备12025439号-7 -->
            {{ t("legalInfo") }}
          </div>
        </div>
      </div>
    </el-footer>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
// 新增缩放比例响应式变量

defineProps({
  navOpacity: {
    type: Number,
    default: 1,
  },
  navScale: {
    type: Number,
    default: 1,
  },
});
// 在组件中动态引用
const getImageUrl = name => {
  return new URL(`/src/assets/${name}`, import.meta.url).href;
};

const componentsMap = {
  about: defineAsyncComponent(() => import("@/components/about-us/index.vue")),
  products: defineAsyncComponent(() =>
    import("@/components/our-products/index.vue")
  ),
  news: defineAsyncComponent(() => import("@/components/news/index.vue")),
  csr: defineAsyncComponent(() => import("@/components/social-CSR/index.vue")),
  join: defineAsyncComponent(() => import("@/components/about-us/index.vue")),
};
const activeTab = ref("about");
const loading = ref(true);
// 使用computed来根据activeTab的值动态计算loading状态
const isLoading = computed(() => loading.value && activeTab.value == "news");
// 使用计算属性保持响应性
const currentComponent = computed(() => componentsMap[activeTab.value]);
const handleSelect = index => {
  activeTab.value = index;
  console.log(index);
  loading.value = true; // 在切换选项卡时设置 loading 为 true
  // 模拟加载过程
  setTimeout(() => {
    loading.value = false; // 2秒后将 loading 设置为 false
  }, 2000);
};
const footerColumns = ref([
  {
    title: "footer.aboutUs.title",
    links: [
      { text: "footer.aboutUs.links[0].text", url: "#" },
      { text: "footer.aboutUs.links[1].text", url: "#" },
      { text: "footer.aboutUs.links[2].text", url: "#" },
      { text: "footer.aboutUs.links[3].text", url: "#" },
      { text: "footer.aboutUs.links[4].text", url: "#" },
    ],
  },
  {
    title: "footer.news.title",
    links: [
      { text: "footer.news.links[0].text", url: "#" },
      { text: "footer.news.links[1].text", url: "#" },
    ],
  },
  {
    title: "footer.csr.title",
    links: [
      { text: "footer.csr.links[0].text", url: "#" },
      { text: "footer.csr.links[1].text", url: "#" },
      { text: "footer.csr.links[2].text", url: "#" },
      { text: "footer.csr.links[3].text", url: "#" },
      { text: "footer.csr.links[4].text", url: "#" },
    ],
  },
  {
    title: "footer.joinUs.title",
    links: [{ text: "footer.joinUs.links[0].text", url: "#" }],
  },
]);
</script>

<style lang="scss" scoped>
.loading-container {
  height: 200px;
  display: grid;
  place-items: center;

  .el-icon {
    font-size: 40px;
    color: #3c8cff;
    animation: rotate 1s linear infinite;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.content-section {
  animation: fadeSlide 0.5s ease;

  @keyframes fadeSlide {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
// 补充样式
.culture-section {
  padding: 80px 0;

  .container {
    display: flex;
    gap: 40px;
    justify-content: space-evenly;
  }
  .culture-card {
    .culture-content {
      height: 20vh;
      display: flex;
      flex-direction: column;
      align-content: space-around;
      align-items: center;
    }
  }

  .culture-left {
    width: 19vw;
    // float: left;
    h1 {
      text-align: center;
      margin-top: 5vw;
      margin-bottom: 5vw;
      font-size: xx-large;
      font-family: Gilroy-Bold, -apple-system, "Sofia Pro", "Microsoft YaHei",
        Helvetica, Arial, sans-serif;
      font-weight: 700;
    }
    span {
      text-align: center;
      font-size: larger;
    }
  }

  .culture-carousel {
    width: 45%;
    border-radius: 50px;
    overflow: hidden;
  }
}

.milestone-section {
  padding: 20px 0;
  h3 {
    font-size: 3vw;
    margin-left: 10vw;
  }
  .historyline {
    margin-top: 10vw;
    .divider {
      border-color: #000;
    }
    .imgBox {
      display: flex;
      margin-top: -4vw;
      justify-content: space-around;
      img {
        width: 5vw;
        border-radius: 2vw;
        z-index: 1;
        -webkit-transition: -webkit-transform 0.3s linear;
        -webkit-transition: transform 0.3s linear;
        transition: transform 0.3s linear;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform-style: preserve-3d;
        -ms-transform-style: preserve-3d;
        transform-style: preserve-3d;
        -webkit-perspective: 1000;
        -moz-perspective: 1000;
        -ms-perspective: 1000;
        perspective: 1000;
      }
      img:hover {
        transform: scale(1.25);
      }
    }
  }
  .milestone-item {
    margin-left: 20vw;
    margin-top: 5vw;
    display: flex;
    align-items: center;
    gap: 40px;
    margin-bottom: 40px;
    h1 {
      font-weight: 300;
    }

    img {
      width: 25vw;
      height: calc(232 / 314) * 25vw;
      object-fit: cover;
      border-top-left-radius: 2vw;
      border-bottom-left-radius: 2vw;
    }
  }
}

.contact-section {
  padding: 60px 0;

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;

    .contact-item {
      padding: 20px;
      border-left: 4px solid #3c8cff;

      a {
        color: #3c8cff;
        font-size: 16px;
      }
    }
  }
}
.bytedance-home {
  font-family: "Helvetica Neue", Arial, sans-serif;
  ._header {
    height: 60px;
    width: -webkit-fill-available;
  }
  .header {
    // 添加以下样式
    transform-box: fill-box;
    transform-origin: center top;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    height: 60px;
    background: #3c8cff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    width: -webkit-fill-available;
    position: fixed;
    margin-top: -60px;
    z-index: 100;
    // 修改原有定位样式
    position: sticky;
    top: 0;

    .container {
      display: flex;
      align-items: center;
      // max-width: 1200px;
      width: -webkit-fill-available;
      margin: 0 auto;

      .logo img {
        height: 40px;
        margin-left: 40px;
        scale: 0.8;
      }

      .nav-menu {
        flex: 1;
        margin-left: 60px;
        border: none;
        flex-direction: row-reverse;
        background: transparent;

        :deep(.el-menu-item) {
          font-size: 12px;
          color: #fff;

          &:hover {
            color: #0077ff;
          }
        }
      }

      .lang-switch {
        margin-left: 40px;
        color: #666;
        cursor: pointer;
      }
    }
  }

  .banner {
    position: relative;
    .banner-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none; // 防止遮挡轮播操作
      z-index: 2;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .banner-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-70%, -180%);
      text-align: center;
      color: #fff;

      h2 {
        font-size: 48px;
        margin-bottom: 20px;
      }

      p {
        font-size: 24px;
      }
    }
  }
  .before_banner {
    position: absolute;
    top: 0px; // 与导航栏高度一致
    left: 2vw;
    padding: 4vw;
    padding-block: 3vh;
    width: 15vw;
    height: 15vw;
    border-radius: 0 0 5vw;
    background: #fff;
    z-index: 3;

    // 原有样式保留
    div {
      font-size: 1.2em;
      line-height: 1.5;
    }
    .mission {
      font-family: Gilroy;
      font-weight: 500;
      font-size: 16px;
      line-height: 0.31rem;
      color: rgb(130, 130, 130);
    }
    .desc {
      // margin-top: 0.22rem;
      font-family: Gilroy-Bold;
      font-weight: 500;
      text-align: left;
      font-size: 30px;
      line-height: 1.1;
    }
  }

  .footer {
    background: #3c8cff;
    color: #fff;
    padding: 60px 0;

    .footer-links {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 40px;
      margin-bottom: 40px;

      h5 {
        font-size: 16px;
        margin-bottom: 20px;
      }

      a {
        color: #999;
        line-height: 2;

        &:hover {
          color: #fff;
        }
      }
    }

    .copyright {
      text-align: center;
      color: #666;
      margin-top: 40px;
    }
  }
}

.main-footer {
  // background: #f8f9fa;
  padding: 40px 0 20px;
  // margin-top: 80px;

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: #3c8cff;
  }

  .footer-columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
    padding-bottom: 40px;
    border-bottom: 1px solid #eee;

    .footer-logo {
      .logo-image {
        width: 200px;
        height: auto;
        margin-top: 15px;
      }
    }

    .footer-col {
      &.pr-50 {
        padding-right: 50px;
      }

      .column-title {
        font-size: 18px;
        color: #fff;
        margin-bottom: 15px;
      }

      .link-item {
        margin: 8px 0;

        .footer-link {
          color: #fff;
          font-size: 14px;
          padding: 1vw;
          border-radius: 1vw;
          transition: border-color var(--el-transition-duration),
            background-color var(--el-transition-duration),
            color var(--el-transition-duration);
          &:hover {
            color: #3c8cff !important;
            background: #fff;
          }
        }
      }
    }
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    margin-top: 20px;
    color: #fff;
    font-size: 12px;

    .copyright {
      a {
        color: inherit;
        &:hover {
          color: #3c8cff;
        }
      }
    }

    .legal-info {
      text-align: right;
      line-height: 1.5;
    }
  }
}

@media (max-width: 768px) {
  .header .nav-menu {
    display: none;
  }

  .products .product-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
  .main-footer {
    .footer-columns {
      grid-template-columns: 1fr;

      .footer-logo {
        text-align: center;
      }

      .footer-col {
        text-align: center;
        &.pr-50 {
          padding-right: 0;
        }
      }
    }

    .footer-bottom {
      flex-direction: column;
      align-items: center;
      text-align: center;

      .legal-info {
        margin-top: 15px;
        text-align: center;
      }
    }
  }
}
</style>
