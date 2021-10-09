<template lang="">
  <!--  公共组件图表模板 -->
  <div class="com-container">
    <div class="com-chart" ref="trendRef"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartsInstance: null,
      allData: null
    }
  },
  mounted() {
    this.initCharts()
    this.getData()
    this.screeAdapter()
    // 监听浏览器窗口变化事件
    window.addEventListener('resize', this.screeAdapter)
  },
  destroyed() {
    // 组件销毁时解绑事件
    window.removeEventListener('resize', this.screeAdapter)
  },
  methods: {
    initCharts() {
      this.chartsInstance = this.$echarts.init(this.$refs.trendRef)
      // 初始化配置option
      const initOption = {}
      this.$echarts.setOption(initOption)
    },
    // 获取数据
    async getData() {
      const { data: ret } = await this.$http.get('/')
      this.allData = ret
      // 更新图表
      this.updateChart()
    },
    updateChart() {
      // 数据项配置
      const dataOption = {}
      this.$echarts.setOption(dataOption)
    },
    // 分辨率适配
    screeAdapter() {
      const adapterOption = {}
      this.$echarts.setOption(adapterOption)
      this.$echarts.resize()
    }
  }
}
</script>
<style lang=""></style>
