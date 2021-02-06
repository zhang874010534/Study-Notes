export const cookieFunction = {
    set(key, value, expire = '7d') {

        expire = expire.toLowerCase();
        let date = new Date();
        let num = parseInt(expire);

        if (expire.indexOf('d') !== -1) {
            date.setDate(date.getDate() + num);
        } else if (expire.indexOf('h') !== -1) {
            date.setHours(date.getHours() + num);
        } else if (expire.indexOf('m') !== -1) {
            date.setMinutes(date.getMinutes() + num);
        } else if (expire.indexOf('s') !== -1) {
            date.setSeconds(date.getSeconds() + num);
        } else {
            date.setDate(date.getDate() + num);
        }

        if (typeof value == 'object') {
            value = JSON.stringify(value);
        }

        document.cookie = key + '=' + value + ';expires=' + date.toUTCString();
    },
    get(key){
        // 匹配' '开头或者任何东西开头     key    除了;以外的0-多个(这就是我们要的)     分号或者任何东西结尾
        var reg = new RegExp('(^| )'+key+'=([^;]*)(;|$)');
        var arr = document.cookie.match(reg);
        // 会返回4项 第一项是匹配到的内容，之后的就是分组匹配到的内容 也就是捕获括号匹配到的内容 这里一共3个括号
        // 所以拿第二个括号内的内容就可以了
        return arr ? arr[2] : null;
    },
    delete(key){
        // 设置一下过期时间就行
        document.cookie=this.set(key,'','0s')
    }
};
