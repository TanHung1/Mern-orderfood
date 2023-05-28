module.exports = {
    mutipleMongooseToObject: function (mongooses)
    {
        return mongooses.map(mongooses => mongooses.toObject());
    },

    mongooesToObject: function (mongooses)
    {
        return mongooses ? mongooses.toObject() : mongooses;
    }
};