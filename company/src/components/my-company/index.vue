<template>
  <el-descriptions class="margin-top" :column="3" :size="size" border>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <user />
          </el-icon>
          {{ $t("common.name") }}
        </div>
      </template>
      Chris Company
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <iphone />
          </el-icon>
          Telephone
        </div>
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <location />
          </el-icon>
          Place
        </div>
      </template>
      Hangzhou
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <tickets />
          </el-icon>
          My users
        </div>
      </template>

      <div class="tags-container">
        <el-check-tag
          v-for="tag in tags"
          :key="tag.id"
          :checked="tag.checked"
          @change="status => onTagChange(tag.id, status)"
          @click="showInfo(tag.id)"
        >
          {{ $t(tag.label) }}
        </el-check-tag>
      </div>
    </el-descriptions-item>
  </el-descriptions>
  <el-dialog v-model="visible" :show-close="false" width="500">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">
          {{ $t(selectedTag?.label) }} Details
        </h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </div>
    </template>
    <p v-if="selectedTag">{{ selectedTag.description }}</p>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  Iphone,
  Location,
  Tickets,
  User,
  CircleCloseFilled,
} from "@element-plus/icons-vue";
import type { ComponentSize } from "element-plus";

const tags = ref([
  {
    id: "startup",
    label: "company.startup",
    checked: false,
    description: "预算有限，技术合伙人情怀绑定,种子轮-A轮",
  },
  {
    id: "medium",
    label: "company.medium",
    checked: false,
    description: "有遗留系统改造需求,招标比价3家以上,数字化升级刚需",
  },
  {
    id: "enterprise",
    label: "company.enterprise",
    checked: false,
    description: "区域性银行、三甲医院、物流龙头企业,定制化解决方案",
  },
]);

const size = ref<ComponentSize>("large");
const visible = ref(false);
const selectedTag = ref<(typeof tags.value)[number]>();

const iconStyle = computed(() => ({
  marginRight:
    { large: "8px", default: "6px", small: "4px" }[size.value] || "6px",
}));

const onTagChange = (tagId: string, status: boolean) => {
  const tag = tags.value.find(t => t.id === tagId);
  if (tag) tag.checked = status;
};

const showInfo = (tagId: string) => {
  selectedTag.value = tags.value.find(t => t.id === tagId);
  visible.value = true;
};
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
.el-check-tag {
  margin-inline: 1vw;
}
.my-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
