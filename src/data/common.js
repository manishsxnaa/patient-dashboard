
export const getMonths = () => {
  const birthMonth = [
    {
      value: '1',
      text: 'Jan'
    },
    {
      value: '2',
      text: 'Feb'
    },
    {
      value: '3',
      text: 'Mar'
    },
    {
      value: '4',
      text: 'Apr'
    },
    {
      value: '5',
      text: 'May'
    },
    {
      value: '6',
      text: 'Jun'
    },
    {
      value: '7',
      text: 'Jul'
    },
    {
      value: '8',
      text: 'Aug'
    },
    {
      value: '9',
      text: 'Sep'
    },
    {
      value: '10',
      text: 'Oct'
    },
    {
      value: '11',
      text: 'Nov'
    },
    {
      value: '12',
      text: 'Dec'
    }
  ]

  return birthMonth
}

export const daysInMonth = (year, month) => {
  const day = new Date(Number(year), Number(month), 0).getDate()
  const dayArr = []
  for (let i = 1; i <= day; i++) {
    const dayObj = {
      value: String(i),
      text: String(i)
    }
    dayArr.push(dayObj)
  }
  return dayArr
}

export const getYears = () => {
  const date = new Date()
  const year = date.getFullYear()
  const k = 1950
  const yearArr = []
  for (let i = year; i >= k; i--) {
    const yearObj = {
      value: String(i),
      text: String(i)
    }
    yearArr.push(yearObj)
  }
  return yearArr
}