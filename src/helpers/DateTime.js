const formatRule = {
  "yy": "year",
  "mm": "month",
  "dd": "day",
  "HH": "hour",
  "MM": "minute",
  "SS": "seconds"
}

export default class DateTime {
  
  /**
  * @param {number} time Timestamp of a given time.
  */
  constructor (time) {
    this.time = new Date(time)
    this.metas = this.getDateMetas()
  }

  /**
   * Get all of the date metas.
   * @return {object}
   */
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

  /**
   * Cover the zero if a number's lenth is 1.
   * @param {number} number
   * @return {number} The result number.
   */
  coverZero (number) {
    number = number + ""
    if ( number.length < 2 ) {
      number = "0" + number
    }
    return number
  }

  /**
   *  Transform the datetime to string with given format.
   *  @param {string} format A string that made up of formatRule.
   *  @return {string} The transform result.
   */
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

  /**
   * Transfrom the datetime to timestamp.
   * @return {number} The output timestamp.
   */
  getTimestamp () {
    return this.time.getTime()
  }
}
