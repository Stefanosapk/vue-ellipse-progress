<template>
  <example-card
    link="https://github.com/setaman/vue-ellipse-progress/blob/demo/demo/src/components/Examples/Example1.vue"
  >
    <component
      :is="component"
      :progress="progress"
      :determinate="determinate"
      v-bind="options"
      :loading="loading"
      :no-data="noData"
    >
    </component>
  </example-card>
</template>

<script>
import ExampleCard from "@/components/Examples/ExampleCard";
import Interval from "@/utils/interval";
import randomNumberInRange from "@/utils/randomNumberInRange";
import props from "@/components/Examples/examplesProps";

export default {
  name: "Example1",
  components: { ExampleCard },
  props,
  data: () => ({
    progress: 34,
    options: {
      color: "#7579ff",
      "empty-color": "#324c7e",
      size: 180,
      thickness: 5,
      "empty-thickness": 3,
      "line-mode": "out 5",
      animation: "rs 700 1000",
      "font-size": "1.5rem",
      "font-color": "white",
    },
  }),
  computed: {
    component() {
      return this.test ? "vue-ellipse-progress-test" : "vue-ellipse-progress";
    },
  },
  methods: {
    randomizeOptions() {
      this.progress = randomNumberInRange(0, 100);
    },
  },
  mounted() {
    Interval.addTask(this.randomizeOptions);
  },
};
</script>

<style scoped></style>
