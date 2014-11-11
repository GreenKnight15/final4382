var port = process.env.PORT;
var host = process.env.IP;

module.exports = {
    url: 'mongodb://' + host + '/' + port
};