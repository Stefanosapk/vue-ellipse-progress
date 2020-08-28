import { computed } from "vue";

export default (progress) => computed(() => parseFloat(progress || 0));
