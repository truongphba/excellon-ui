<script>
import { Bar } from 'vue-chartjs'
export default {
  name: 'BarChartSevenDay',
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
    const months = this.chartData.map(d => d.date).reverse()
    const totals = this.chartData.map(d => d.total).reverse()
    const { borderColor, pointColor, pointBackgroundColor, backgroundColor } = this.chartColors
    this.renderChart({
      labels: months,
      datasets: [{
        label: this.label,
        data: totals,
        borderColor: borderColor,
        pointColor: pointColor,
        pointBackgroundColor: pointBackgroundColor,
        backgroundColor: backgroundColor
      }]
    },
    this.options)
  }
}
</script>

<style scoped>
</style>
