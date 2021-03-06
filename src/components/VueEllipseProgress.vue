<template>
  <div
    class="ep-container"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
    }"
  >
    <div class="ep-content">
      <circle-container
        v-for="(options, i) in circlesData"
        :key="i"
        v-bind="options"
        :multiple="isMultiple"
        :index="i"
        :globalThickness="thickness"
        :globalGap="gap"
        :globalDot="dot"
      />
      <div class="ep-legend--container" :style="{ maxWidth: `${size}px` }">
        <div
          class="ep-legend--value"
          v-if="legend && !isMultiple"
          :class="[legendClass, { 'ep-hidden': shouldHideLegendValue }]"
          :style="{ fontSize, color: fontColor }"
        >
          <counter :value="legendVal" :animation="animation" :loading="loading">
            <template v-slot:default="{ counterTick }">
              <slot v-if="$scopedSlots.default" :counterTick="counterTick"></slot>
              <span v-if="legendFormatter">
                <span v-if="isHTML" v-html="legendFormatter(counterTick)"></span>
                <span v-else>{{ legendFormatter(counterTick) }}</span>
              </span>
              <span v-else-if="!$scopedSlots.default">{{ counterTick.currentFormattedValue }}</span>
            </template>
          </counter>
          <slot name="legend-value"></slot>
        </div>
        <slot name="legend-caption"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { getNumberIfValid, isValidNumber } from "../utils";
import { props } from "./interface";
import CircleContainer from "./Circle/CircleContainer.vue";
import Counter from "./Counter.vue";

export default {
  name: "VueEllipseProgress",
  components: { Counter, CircleContainer },
  props: {
    ...props,
    legendFormatter: {
      type: Function,
      required: false,
    },
  },
  data: () => ({
    counterTick: {},
  }),
  computed: {
    legendVal() {
      if (this.loading || this.noData) {
        return 0;
      }
      return this.legendValue ? this.legendValue : getNumberIfValid(this.progress) || 0;
    },
    shouldHideLegendValue() {
      return !this.isDataAvailable || this.loading;
    },
    isDataAvailable() {
      return isValidNumber(this.progress) && !this.noData;
    },
    isMultiple() {
      return this.data.length > 1;
    },
    isHTML() {
      return /<[a-z/][\s\S]*>/i.test(this.legendFormatter({ currentValue: 0 }).toString().trim());
    },
    circlesData() {
      if (this.isMultiple) {
        return this.data.map((data) => ({
          ...this.$props,
          ...data,
          emptyThickness: isValidNumber(data.thickness) ? data.thickness : this.$props.thickness,
        }));
      }
      return [this.$props];
    },
  },
};
</script>

<style scoped lang="scss">
.ep-container {
  display: inline-block;
  overflow: hidden;
}

.ep-content {
  transition: inherit;
  max-width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;
}

.ep-legend--container {
  transition: inherit;
  position: absolute;
  text-align: center;
}
.ep-legend--value {
  transition: 0.3s;
  text-align: center;
  opacity: 1;
}
.ep-hidden {
  opacity: 0;
}
svg.ep-svg {
  transition: inherit;
  transform-origin: 50% 50%;
}
</style>
