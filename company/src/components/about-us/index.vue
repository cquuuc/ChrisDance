<template>
  <!-- 轮播图 -->
  <el-carousel class="banner" height="89vh" indicator-position="inside">
    <!-- 新增定位容器 -->
    <div class="banner-overlay">
      <div class="before_banner">
        <div class="mission">{{ t("common.mission") }}</div>
        <div class="desc">{{ t("common.desc1") }}</div>
        <div class="desc">{{ t("common.desc2") }}</div>
      </div>
    </div>
    <el-carousel-item v-for="(item, index) in banners" :key="index">
      <img :src="item.image" :alt="item.title" loading="eager" />
    </el-carousel-item>
  </el-carousel>
  <!-- 企业文化板块 -->
  <section class="culture-section">
    <div class="container">
      <div class="culture-left">
        <h1>{{ t("common.culture") }}</h1>
        <span>{{ t("common.cultureDescription") }}</span>
      </div>
      <el-carousel class="culture-carousel" indicator-position="outside">
        <el-carousel-item v-for="(item, index) in cultureItems" :key="index">
          <div class="culture-card">
            <img :src="item.image" alt="culture" loading="lazy" />
            <div class="culture-content">
              <h2>{{ t(item.title) }}</h2>
              <ul>
                <li v-for="(point, i) in item.points" :key="i">
                  {{ t(point) }}
                </li>
              </ul>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </section>

  <!-- 大事记板块 -->
  <section class="milestone-section">
    <div class="container">
      <h3>{{ t("common.milestones") }}</h3>
      <div class="milestone-content">
        <div
          v-for="(event, index) in milestones"
          :key="index"
          class="milestone-item"
        >
          <img :src="event.image" alt="milestone" loading="lazy" />
          <div class="milestone-info">
            <p>{{ t(event.date) }}</p>
            <h1>{{ t(event.description) }}</h1>
          </div>
        </div>
      </div>
      <div class="historyline">
        <el-divider border-style="dotted" class="divider" />
        <div class="imgBox">
          <img
            v-for="(contact, index) in miniLine"
            :key="index"
            :src="contact.image"
            :alt="contact.alt"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
  <section class="contact-section">
    <h3>{{ t("common.boardMembers") }}</h3>
    <div class="person">
      <div v-for="i in 3" :key="i">
        <div class="avatar">
          <el-avatar shape="circle" :size="70" :src="getImageUrl('ME.jpg')" />
        </div>
        <p>Chris Chen</p>
        <p>Chairman of the Board</p>
      </div>
    </div>
  </section>

  <!-- 联系我们板块 -->
  <section class="contact-section">
    <div class="container">
      <h3>{{ t("common.contactUs") }}</h3>
      <div class="contact-grid">
        <div
          v-for="(contact, index) in contacts"
          :key="index"
          class="contact-item"
        >
          <p>{{ t(contact.title) }}</p>
          <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
// 新增缩放比例响应式变量
import { useI18n } from "vue-i18n";
const { t } = useI18n();

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

const banners = ref([
  {
    image: getImageUrl("banner0.png"),
      srcset:`
    ${getImageUrl("banner0.png")} 81w,
    /assets/logo-medium.png 162w,
    /assets/logo-large.png 324w `,
    title: "激发创造，丰富生活",
    description: "通过技术提升全球人们的生活品质",
  },
  {
    image: getImageUrl("banner1.png"),
    title: "激发创造，丰富生活",
    description: "通过技术提升全球人们的生活品质",
  },
  {
    image: getImageUrl("banner2.png"),
    title: "激发创造，丰富生活",
    description: "通过技术提升全球人们的生活品质",
  },
]);
const cultureItems = ref([
  {
    image: getImageUrl("culture1.jpg"),
    title: "common.title",
    points: ["common.txt1"],
  },
  {
    image: getImageUrl("culture1.jpg"),
    title: "common.title",
    points: ["common.txt2"],
  },
  {
    image: getImageUrl("culture1.jpg"),
    title: "common.title",
    points: ["common.txt3"],
  },
  {
    image: getImageUrl("culture1.jpg"),
    title: "common.title",
    points: ["common.txt4"],
  },
]);

const milestones = ref([
  {
    date: "common.date",
    description: "common.datedescription",
    image: getImageUrl("dsj-1.png"),
  },
  // 补充其他大事记
]);

const miniLine = ref([
  {
    image: getImageUrl("dsj-logo1.png"),
    alt:'dsj1'
  },
  {
    image: getImageUrl("dsj-logo2.png"),
    alt:'dsj2'
  },
  {
    image: getImageUrl("dsj-logo3.png"),
    alt:'dsj3'
  },
  {
    image: getImageUrl("dsj-logo4.png"),
    alt:'dsj4'
  },
  {
    image: getImageUrl("dsj-logo5.png"),
    alt:'dsj5'
  },
]);
const contacts = ref([
  { title: "common.mediaInquiry", email: "Chris@bytedance.com" },
  { title: "common.wechatInquiry", email: "Chris@wechart.com" },
  { title: "common.emailInquiry", email: "Chris@mail.com" },
  { title: "common.phoneInquiry", email: "Chris@tel.com" },
  // 补充其他联系方式
]);
</script>

<style lang="scss" scoped>
// 补充样式
.culture-section {
  padding: 80px 0;

  .container {
    display: flex;
    gap: 40px;
    justify-content: space-evenly;
  }
  .culture-card {
    img {
    }
    .culture-content {
      height: 20vh;
      display: flex;
      flex-direction: column;
      align-content: space-around;
      align-items: center;
      font-size: 1vw;
    }
  }

  .culture-left {
    width: 19vw;
    // float: left;
    h1 {
      text-align: center;
      margin-top: 5vw;
      margin-bottom: 5vw;
      font-size: 3vw;
      font-family: Gilroy-Bold, -apple-system, "Sofia Pro", "Microsoft YaHei",
        Helvetica, Arial, sans-serif;
      font-weight: 700;
    }
    span {
      text-align: center;
      font-size: 2vw;
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
    margin-left: 5vw;
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
      font-weight: 600;
      font-size: 3vw;
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
  h3 {
    font-size: 3vw;
    margin-left: 5vw;
  }
  .person {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 9vw;
    div {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      align-items: center;
      .avatar {
        margin-bottom: 2vw;
      }
      p:nth-child(2) {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 900;
      }
      p:nth-child(3) {
        font-size: 2vw;
      }
    }
  }

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
</style>
