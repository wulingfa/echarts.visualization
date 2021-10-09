<template lang="">
  <div class="com-container">
    <div class="com-chart" ref="sellerRef"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      chartInstance: null,
      allData: null, // 服务器返回的数据
      currentPage: 1,
      totalPage: 0,
      timerId: null // 定时器标识
    }
  },
  created() {
    // 在组件创建完成之后 进行回调函数的注册
    this.$socket.registerCallBack('sellerData', this.getData)
  },
  mounted() {
    this.initEcharts()
    // this.getData()
    // 发送数据给服务器, 告诉服务器, 我现在需要数据
    this.$socket.send({
      action: 'getData',
      socketType: 'sellerData',
      chartName: 'seller',
      value: ''
    })
    // 为浏览起窗口添加监听事件
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    clearInterval(this.timerId)
    // 组件销毁时，清除监听事件
    window.removeEventListener('resize', this.$refs.sellerRef)
    // 在组件销毁的时候, 进行回调函数的取消
    this.$socket.unRegisterCallBack('sellerData')
  },
  computed: {
    ...mapState(['theme'])
  },
  watch: {
    theme() {
      console.log('主题切换了')
      this.chartInstance.dispose() //销毁当前的图表
      this.initEcharts()
      this.screenAdapter()
      this.upDateData()
    }
  },
  methods: {
    // 初始化echarts
    initEcharts() {
      this.chartInstance = this.$echarts.init(this.$refs.sellerRef, this.theme)
      // 为图表进行初始化配置
      const initOption = {
        title: {
          text: '▎商家销售统计',
          left: 20,
          top: 20
        },
        grid: {
          // 坐标轴位置
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true // 距离包含坐标轴上的内容
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              color: '#2D3443'
            }
          }
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category'
        },
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: 'white'
              }
            },
            itemStyle: {
              // 指明柱状图的颜色渐变
              color: new this.$echarts.graphic.LinearGradient(0, 1, 1, 0, [
                {
                  offset: 0,
                  color: '#5052EE'
                },
                {
                  offset: 1,
                  color: '#AB6EE5'
                }
              ])
            }
          }
        ]
      }
      this.chartInstance.setOption(initOption)
      // 为图表添加鼠标移入移出事件
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timerId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    // 获取数据
    async getData(ret) {
      // const { data: ret } = await this.$http.get('/seller')
      this.allData = ret.sort((a, b) => {
        return a.value - b.value
      })
      this.upDateData()
      this.startInterval()
    },
    // 更新图表数据
    upDateData() {
      this.totalPage = Math.ceil(this.allData.length / 5)
      const start = (this.currentPage - 1) * 5
      const end = this.currentPage * 5
      const filterData = this.allData.slice(start, end)
      const sellerNames = filterData.map(item => {
        return item.name
      })
      const sellerValues = filterData.map(item => {
        return item.value
      })
      // 设置echarts配置数据
      const option = {
        yAxis: {
          data: sellerNames
        },
        series: [
          {
            data: sellerValues
          }
        ]
      }
      this.chartInstance.setOption(option)
    },
    // 设置定时器让数据自动刷新
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timeId)
      } else {
        this.timerId = setInterval(() => {
          this.currentPage++
          if (this.currentPage > this.totalPage) {
            this.currentPage = 1
          }
          this.upDateData()
        }, 3000)
      }
    },
    // 屏幕分辨率适配事件
    screenAdapter() {
      const titleFontSize = (this.$refs.sellerRef.offsetWidth / 100) * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize
            }
          }
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0]
            }
          }
        ]
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    }
  }
}
</script>
<style lang="less" scoped></style>
