const context = {}


module.exports = {
    
    apiSucess(data='',msg='ok',code = 200) {
        this.body = {msg,data}
        this.status = code
    },

    apiFail(data = '', msg = 'fail', code = 400) {
        this.body = { msg, data };
        this.status = code;
    },
    
}