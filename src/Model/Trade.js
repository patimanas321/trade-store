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
    return new Date(this._maturityDate);
  }

  get createdDate () {
    return new Date(this._createdDate);
  }

  get expired () {
    return this.maturityDate > new Date();
  }
}

export default Trade;
