<script>
import { Bar } from 'vue-chartjs'
export default {
  name: 'BarChartMonth',
  extends: Bar,
  props: {
    label: {
      type: String
    },
    chartData: {
      type: Array
    },
    chartData2: {
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
    const months = this.chartData.map(d => d.date1).reverse()
    const totals = this.chartData.map(d => d.total1).reverse()
    const totals2 = this.chartData2.map(d => d.total2).reverse()
    const { borderColor, pointColor, pointBackgroundColor, backgroundColor } = this.chartColors
    this.renderChart({
      labels: months,
      datasets: [{
        label: '1233',
        data: totals,
        borderColor: '#077147',
        pointColor: '#0E1528',
        pointBackgroundColor: '#AFD8AC',
        backgroundColor: '#74A51F'
      },
      {
        label: '456',
        data: totals2,
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
