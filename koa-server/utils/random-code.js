
/**
 * 生成随机字母+数字组成的验证码
 * @module getValidateString
 * @type {string}
 */
   const getRandomInt = ( min , max )=>{
        return  min + parseInt( Math.random() * (max - min + 1));
    }

    const getValidateString = () =>{
        var min,max;
        var res = "";
        for(var i = 0 ; i < 4 ; i ++){
            switch(getRandomInt( 1 , 3 )){
                case 1 :
                    min = 48;
                    max = 57;
                    break;
                case 2 :
                    min = 65;
                    max = 90;
                    break;
                case 3 :
                    min = 97;
                    max = 122;
                    break;
            }
            var randomInt = getRandomInt(min , max);
            res += String.fromCharCode(randomInt);
        }
        return  res;
    }


module.exports= getValidateString