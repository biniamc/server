const fs = require('fs');
const crypto = require('crypto');

module.exports = {

    getToken(length){
        return crypto.randomBytes(Math.ceil(length)).toString('hex').slice(0, length);
    },
    saveCredential(token, data){

        console.log("saving");
        try {
            let creds = this.getCredentials();
            creds[token] = data;
            fs. writeFileSync( './Extra/credentials.json' , JSON.stringify(creds));
        } catch( err) {
            throw err;
        }

    },
    getCredentials(){

        try {
            return JSON.parse(fs.readFileSync( './Extra/credentials.json' , { encoding: 'utf8' }));
        } catch( err) {
            throw err;
        }

        //D:/projects/CSCMSserver/Extra/
    },
    deleteCredentials(token){

        try {

            let creds = this.getCredentials();
            delete creds[token];
            fs. writeFileSync( 'credentials.json' , JSON.stringify(creds));

        } catch( err) {
            throw err;
        }

    },
    checkAuth(token){

        try{

            let creds = this.getCredentials();
            return creds[token];

        }catch( err) {
            throw err;
        }

    }

};

//console.log(obj.getCredentials());
