<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'LineChartYearServicePayment',
  extends: Line,
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
    console.log(this.chartData)
    const months = this.chartData.map(d => d.date)
    const totalInbound = this.chartData.map(d => d.total)
    const totalOutbound = this.chartData.map(d => d.total).reverse()
    const { borderColor, pointColor, pointBackgroundColor, backgroundColor } = this.chartColors
    this.renderChart({
      labels: months,
      datasets: [
        {
          label: 'Inbound',
          data: totalInbound,
          borderColor: borderColor,
          pointColor: pointColor,
          pointBackgroundColor: pointBackgroundColor,
          backgroundColor: backgroundColor
        },
        {
          label: 'Outbound',
          data: totalOutbound,
          borderColor: '#f542c2',
          pointColor: '#f542c2',
          pointBackgroundColor: '#f542c2',
          backgroundColor: '#f542c2'
        }
      ]
    },
    this.options)
  }
}
</script>

<style scoped>
</style>
