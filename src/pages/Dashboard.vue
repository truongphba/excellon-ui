<template>
  <q-page class="q-py-sm q-pl-sm">
    <div style="margin-bottom: 15px">
        <q-card  style="display: inline-block; margin-right: 15px">
          <q-card-section :class="$q.dark.isActive?'green_dark':'bg-green-8'" class="text-white" style="padding-right: 50px">
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Total Revenue</div>
                <div class="text-h5">$ 123 </div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="trending_up"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
      <q-card  style="display: inline-block; margin-right: 15px">
        <q-card-section :class="$q.dark.isActive?'green_dark':'bg-green-8'" class="text-white" style="padding-right: 50px">
          <div class="row">
            <div class="col-10">
              <div class="text-h6">Total Revenue</div>
              <div class="text-h5">$ 123 </div>
            </div>
            <div class="col-2">
              <q-icon size="62px" name="trending_up"/>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card  style="display: inline-block; margin-right: 15px">
        <q-card-section :class="$q.dark.isActive?'green_dark':'bg-green-8'" class="text-white" style="padding-right: 50px" >
          <div class="row">
            <div class="col-10">
              <div class="text-h6">Total Revenue</div>
              <div class="text-h5">$ 123 </div>
            </div>
            <div class="col-2">
              <q-icon size="62px" name="trending_up"/>
            </div>
          </div>
        </q-card-section>
      </q-card>

    </div>
    <q-card flat bordered class="q-pa-none q-ma-none" style="display: flex; justify-content: space-between;background: transparent;
    border: none;">
<!--      <q-card-section v-if="totalBySevenDay.length > 0" class="shadow-1" style="width: 49% ;background:#fff;">-->
<!--        <bar-chart-seven-day :chartData="totalBySevenDay" :options="chartOptions" :chart-colors="revenueChartColor"-->
<!--                             label="Total Cost"></bar-chart-seven-day>-->
<!--      </q-card-section>-->
      <q-card-section v-if="totalByMonth.length > 0" class="shadow-1" style="width: 49% ;background:#fff;">
        <bar-chart-month :chartData="totalByMonth" :chart-data2="totalBySevenDay" :options="chartOptions" :chart-colors="revenueChartColor"
                   label="Total Cost By Month"></bar-chart-month>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios'
// import BarChartSevenDay from 'components/chart/BarChartSevenDay'
import BarChartMonth from 'components/chart/LineChartMonth'

export default {
  name: 'Dashboard',
  components: {
    // BarChartSevenDay,
    BarChartMonth
  },
  data () {
    return {
      revenueChartColor: {
        borderColor: '#077187',
        pointColor: '#0E1428',
        pointBackgroundColor: '#AFD6AC',
        backgroundColor: '#74A57F'
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      totalBySevenDay: [],
      totalByMonth: []
    }
  },
  created () {
    this.getChartBySevenDate()
    this.getChartByMonth()
  },
  methods: {
    async getChartBySevenDate () {
      const { data } = await axios.get(process.env.API_URL + '/Chart/sevenday')
      data.data.forEach(d => {
        const date2 = d.createDate
        const total2 = d.totalCost
        this.totalBySevenDay.push({ date2, total2 })
      })
    },
    async getChartByMonth () {
      const { data } = await axios.get(process.env.API_URL + '/Chart/month')
      data.data.forEach(d => {
        const date = d.createDate
        const total = d.totalCost
        this.totalByMonth.push({ date, total })
      })
    }
  }
}
</script>
