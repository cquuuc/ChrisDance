<template>
  <div class="dashboard-container">
    <el-tabs v-model="activeTab" type="card">
      <!-- 直接竞争对手 -->
      <el-tab-pane :label="$t('competitor.direct')" name="direct">
        <el-row :gutter="20">
          <el-col
            :span="12"
            v-for="(item, index) in directCompetitors"
            :key="index"
          >
            <el-card shadow="hover" class="competitor-card">
              <template #header>
                <div class="card-header">
                  <span
                    class="category-tag"
                    :style="categoryStyle(item.category)"
                  >
                    {{ $t(`competitor.category.${item.category}`) }}
                  </span>
                  +
                  <h3>{{ $t(item.nameKey) }}</h3>
                </div>
              </template>
              <div class="attribute-grid">
                <div
                  v-for="(valueKey, key) in item.attributes"
                  :key="key"
                  class="attribute-item"
                >
                  <el-icon :color="attributeColors[key]"
                    ><ArrowRight
                  /></el-icon>
                  <strong>{{ $t(`competitor.attributes.${key}`) }}:</strong>
                  + <span>{{ $t(valueKey) }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>

      <!-- 跨界颠覆者 -->
      <el-tab-pane :label="$t('competitor.cross')" name="cross">
        <el-collapse v-model="activeCollapse">
          <el-collapse-item
            v-for="(item, index) in crossCompetitors"
            :name="index"
            :key="index"
          >
            <template #title>
              <div class="collapse-header">
                +
                <el-tag effect="dark" type="warning">{{
                  $t(item.typeKey)
                }}</el-tag>
                <span class="threat-level">
                  {{ $t("competitor.threatLevel") }}: {{ item.threat }}
                </span>
                +
                <h4 style="margin-left: 20px">{{ $t(item.nameKey) }}</h4>
              </div>
            </template>
            <div class="strategy-container">
              <el-row :gutter="20">
                <el-col
                  :span="8"
                  v-for="(strategy, key) in item.strategies"
                  :key="key"
                >
                  <el-alert
                    :title="$t(`strategy.labels.${key}`)"
                    :type="strategy.opportunity ? 'success' : 'error'"
                    show-icon
                  >
                    + {{ $t(strategy.descKey) }}
                    <div v-if="strategy.actionKey" class="action-link">
                      +
                      <el-link type="primary">{{
                        $t(strategy.actionKey)
                      }}</el-link>
                    </div>
                  </el-alert>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>

      <!-- 隐形竞争者 -->
      <el-tab-pane :label="$t('competitor.hidden')" name="hidden">
        <el-descriptions :column="2" border>
          <template v-for="(item, index) in hiddenCompetitors" :key="index">
            +
            <el-descriptions-item :label="$t(item.nameKey)">
              <div class="countermeasure">
                <div class="data-point">
                  <el-progress
                    type="dashboard"
                    :percentage="item.impact"
                    :color="item.impact > 30 ? '#e6a23c' : '#67c23a'"
                  />
                  <span class="data-label">{{
                    $t("competitor.impactIndex")
                  }}</span>
                </div>
                <div class="tactics">
                  <el-tag
                    v-for="(tactic, tIndex) in item.tactics"
                    :key="tIndex"
                    :type="isValidTagType(tactic.type) ? tactic.type : 'info'"
                  >
                    + {{ $t(tactic.textKey) }}
                  </el-tag>
                </div>
              </div>
            </el-descriptions-item>
          </template>
        </el-descriptions>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// ================== 类型定义 ==================
type CompetitorCategory = "A" | "B"; // 改为通用标识
type ValidTagType = "success" | "warning" | "info" | "primary" | "danger";

interface StrategyItem {
  descKey: string; // 改为使用翻译键
  opportunity: boolean;
  actionKey?: string;
}

interface TacticItem {
  textKey: string; // 使用翻译键
  type: ValidTagType;
}

interface DirectCompetitor {
  category: CompetitorCategory;
  nameKey: string; // 改为键名
  attributes: {
    strengthKey?: string;
    weaknessKey?: string;
    killerKey?: string;
  };
}

interface CrossCompetitor {
  typeKey: string;
  nameKey: string;
  threat: string;
  strategies: Record<string, StrategyItem>;
}

interface HiddenCompetitor {
  nameKey: string;
  impact: number;
  tactics: TacticItem[];
}

// ================== 响应式数据 ==================
const directCompetitors = ref<DirectCompetitor[]>([
  {
    category: "A",
    nameKey: "competitor.companies.zhongruan",
    attributes: {
      strengthKey: "competitor.strengths.govRelation",
      weaknessKey: "competitor.weaknesses.waterfall",
    },
  },
  {
    category: "B",
    nameKey: "competitor.companies.mingyuan",
    attributes: {
      killerKey: "competitor.strengths.aiPlatform",
      weaknessKey: "competitor.weaknesses.highCost",
    },
  },
]);

const crossCompetitors = ref<CrossCompetitor[]>([
  {
    typeKey: "competitor.types.lowcode",
    nameKey: "competitor.companies.dingtalk",
    threat: t("competitor.threatLoss", { percent: 15 }),
    strategies: {
      threat: {
        descKey: "strategy.threats.smeLoss",
        opportunity: false,
      },
      cooperation: {
        descKey: "strategy.opportunities.moduleSupplier",
        opportunity: true,
        actionKey: "action.contactCooperation",
      },
    },
  },
]);

const hiddenCompetitors = ref<HiddenCompetitor[]>([
  {
    nameKey: "competitor.hiddenGroups.internalIT",
    impact: 47,
    tactics: [
      { textKey: "competitor.tactics.techLoan", type: "success" },
      { textKey: "competitor.tactics.onsiteDev", type: "warning" },
    ],
  },
]);

// ================== 样式配置 ==================
const categoryStyle = (category: CompetitorCategory) => ({
  backgroundColor: category === "A" ? "#f4e3e7" : "#e3f4f1",
  color: category === "A" ? "#c45664" : "#429991",
});

const attributeColors = {
  strength: "#67c23a",
  weakness: "#f56c6c",
  killer: "#409eff",
};

// ================== 获取翻译标签 ==================
const attributeLabels = {
  strength: t("competitor.attributes.strength"),
  weakness: t("competitor.attributes.weakness"),
  killer: t("competitor.attributes.killer"),
};

const strategyLabels = {
  threat: t("strategy.labels.threat"),
  cooperation: t("strategy.labels.cooperation"),
};

// ================== 状态管理 ==================
const activeTab = ref("direct");
const activeCollapse = ref(0);

// ================== 类型校验 ==================
const isValidTagType = (type: string): type is ValidTagType => {
  return ["success", "warning", "info", "primary", "danger"].includes(type);
};
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  background: #f5f7fa;
}

.competitor-card {
  margin-bottom: 20px;

  .card-header {
    display: flex;
    align-items: center;
    .category-tag {
      padding: 4px 8px;
      border-radius: 4px;
      margin-right: 10px;
    }
  }
}

.attribute-grid {
  display: grid;
  gap: 12px;

  .attribute-item {
    display: flex;
    align-items: center;
    font-size: 14px;

    > * {
      margin-right: 8px;
    }
  }
}

.collapse-header {
  display: flex;
  align-items: center;

  .threat-level {
    margin-left: 15px;
    color: #f56c6c;
  }
}

.countermeasure {
  display: flex;
  justify-content: space-around;
  align-items: center;

  .data-point {
    text-align: center;

    .data-label {
      display: block;
      margin-top: 8px;
      color: #909399;
    }
  }
}

.tactics {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.action-link {
  margin-top: 8px;
}
</style>
