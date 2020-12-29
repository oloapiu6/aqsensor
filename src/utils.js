const calculatePm25AQI = (concentration) => {
        const pm25_breakpoints = [[0.0, 12.0], [12.1, 35.4], [35.5, 55.4], [55.5, 150.4], [150.5, 250.4], [250.5, 350.4], [350.5, 500.4]]
        const AQI_breakpoints = [[0, 50], [51, 100], [101, 150], [151, 200], [201, 300], [301, 400], [401, 500]]
        const colors = ['#52c41a', '#fadb14', '#fa8c16', '#f5222d', '#722ed1', '#613400', '#613400', '#613400']

        const concentrationRounded = Math.round(concentration * 10) / 10
          let conc_lo = pm25_breakpoints[pm25_breakpoints.length-1][0]
          let conc_hi = pm25_breakpoints[pm25_breakpoints.length-1][1]
          let AQI_lo = AQI_breakpoints[AQI_breakpoints.length-1][0]
          let AQI_hi = AQI_breakpoints[AQI_breakpoints.length-1][1]

          let counter = 0
          for (let pm25_break of pm25_breakpoints) {
            if ((concentrationRounded >= pm25_break[0]) & (concentrationRounded <= pm25_break[1])) {
              conc_lo = pm25_break[0]
              conc_hi = pm25_break[1]
              AQI_lo = AQI_breakpoints[counter][0]
              AQI_hi = AQI_breakpoints[counter][1]
              break
            }
            counter = counter + 1
          }
          let slope = (AQI_hi - AQI_lo)/(conc_hi - conc_lo)
          let AQI = slope * (concentrationRounded - conc_lo) + AQI_lo
          let color = colors[counter]
          return [Math.round(AQI), color]
}

export default calculatePm25AQI