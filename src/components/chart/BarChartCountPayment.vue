<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'BarChartCountPayment',
  extends: Bar,
  props: {
    label: {
      type: String
    },
    chartData: {
      type: Array
    },
    chartColors: {
      type: Object
    },
    options: {
      type: Object
    }
  },
  mounted () {
    const months = this.chartData.map(d => d.date)
    const count = this.chartData.map(d => d.count)
    const { borderColor, pointColor, pointBackgroundColor, backgroundColor } = this.chartColors
    this.renderChart({
      labels: months,
      datasets: [
        {
          label: 'Number of Payment',
          data: count,
          borderColor: borderColor,
          pointColor: pointColor,
          pointBackgroundColor: pointBackgroundColor,
          backgroundColor: backgroundColor
        }
      ]
    },
    this.options)
  }
}
</script>

<style scoped>
</style>
