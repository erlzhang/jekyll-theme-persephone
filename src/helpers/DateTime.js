const formatRule = {
  "yy": "year",
  "mm": "month",
  "dd": "day",
  "HH": "hour",
  "MM": "minute",
  "SS": "seconds"
}

export default class DateTime {
  constructor (time=null) {
    this.time = new Date(time) || new Date()
    this.metas = this.getDateMetas()
  }

  getDateMetas () {
    return {
      year: this.time.getFullYear(),
      month: this.time.getMonth() + 1,
      day: this.time.getDate(),
      hour: this.time.getHours(),
      minute: this.time.getMinutes(),
      seconds: this.time.getSeconds()
    }
  }

  coverZero (number) {
    number = number + ""
    if ( number.length < 2 ) {
      number = "0" + number
    }
    return number
  }

  parse (format) {
    for ( let f in formatRule ) {
      var meta = this.metas[ formatRule[f] ]
      if ( formatRule[f] != "year" ) {
        meta = this.coverZero(meta)
      }
      format = format.replace(f, meta)
    }
    return format
  }

  getTimestamp () {
    return this.time.getTime()
  }
}
