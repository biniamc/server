
module.exports = {

    prepare(data){
        return {
            header: {
                error: false,
                message: ""
            },
            data: data
        };
    },
    error(message){
        return {
            header: {
                error: true,
                message: message
            },
            data: []
        };
    }

};