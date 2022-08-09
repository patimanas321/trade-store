class Trade {
  constructor (rawData) {
    this.id = rawData?.id;
    this.version = rawData?.version;
    this.bookingId = rawData?.bookingId;
    this.counterPartyId = rawData?.counterPartyId;
    this._maturityDate = rawData?.maturityDate;
    this._createdDate = rawData?.createdDate;
    this.version = rawData?.version;
  }

  get maturityDate () {
    const date = new Date(this._maturityDate);
    date.setHours(0, 0, 0, 0);

    return date;
  }

  get createdDate () {
    const date = new Date(this._createdDate);
    date.setHours(0, 0, 0, 0);

    return date;
  }

  get expired () {
    return this.maturityDate > new Date();
  }
}

export default Trade;
