// document.addEventListener('DOMContentLoaded',function(){
//   setTimeout(() => {
//     var kw = document.querySelectorAll('.task-overview-item .item-value')[2];
//     console.log(kw)
//     console.log(kw.innerText)
//   }, 3000);
// })
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   console.log(111)
//   if (message.method === 'juliang') {
//     alert('juliang');
//   }
// });
const URL = 'https://star.toutiao.com/ad/creator/video/detail';
if (window.location.origin + window.location.pathname == URL) {
    localStorage.setItem('redirectUrl', location.href);
    document.addEventListener('DOMContentLoaded', function () {
      let bunan = document.createElement('div');
      bunan.setAttribute('id', 'bunan');
      bunan.innerHTML = `
    <div class="countdown-wrapper">
      <div class="title">{{message}}</div>
      <div class="time">
        {{hour.toString().padStart(2,"0") + ':' + minutes.toString().padStart(2,"0") + ':' + seconds.toString().padStart(2,"0")}}
      </div>
      <div class="response-msg">{{responseMsg}}</div>
    </div>
    `;
      document.body.appendChild(bunan);
      let bunanApp = new Vue({
          el: '#bunan',
          data: {
              message: 'Hello World!',
              hour: '00',
              minutes: '00',
              seconds: '00',
              responseMsg:''
          },
          mounted() {
              // 获取数据并发送
              this.sendData();
              // 开始巨量定时器 爬数据
              this.startCountdown();
          },
          methods: {
              sendData() {
                  setTimeout(() => {
                      let juliangCanGetData = window.sessionStorage.getItem(
                          'juliangCanGetData'
                      );
                      console.log('发送请求开始');
                      let dom = document.querySelectorAll(
                          '.data-cards .data-item .value'
                      );
                      // 如果数据拿不到
                      if(dom.length == 0){
                        var notification = new Notification(window.location.search,{
                          body:'出问题了出问题了',
                          icon:'../image/bunan_logo.png'
                        });
                        this.login();
                        return ;
                      }
                      if (juliangCanGetData == 'true') {
                          let playbackQuantity = dom[0].innerText.replace(
                              ',',
                              ''
                          );
                          let praise = dom[1].innerText.replace(
                              ',',
                              ''
                          );
                          let commentQuantity = dom[2].innerText.replace(
                              ',',
                              ''
                          );
                          let shareTheAmount = dom[3].innerText.replace(
                              ',',
                              ''
                          );
                          axios({
                            method:'post',
                            url:'https://api.demo.com',
                            params:{
                              link : location.href,
                              data:{
                                playbackQuantity,
                                praise,
                                commentQuantity,
                                shareTheAmount
                              },
                              time: formatTime(new Date()).slice(0,16)
                            }
                          })
                            .then( (res)=> {
                              if (res.data.state == 1) {
                                this.responseMsg = '发送成功'
                              }else{
                                this.responseMsg = res.data.result.errmsg
                              }
                            })
                            .catch((res)=>{
                              console.log(res,'catch')
                              this.responseMsg = res.data.result.errmsg
                            })
                          console.log(playbackQuantity);
                          window.sessionStorage.setItem(
                              'juliangCanGetData',
                              false
                          );
                      }
                  }, 60000);
              },
              startCountdown() {
                  let nextDate = new Date(Date.now() + 1000 * 60 * 60);
                  nextDate.setMinutes(00);
                  nextDate.setSeconds(00);
                  let time = setInterval(() => {
                      let interval = nextDate.getTime() - Date.now();
                      let surplus = 0;
                      this.hour = Math.floor(interval / 1000 / 60 / 60);
                      surplus = interval % (1000 * 60 * 60);
                      this.minutes = Math.floor(surplus / 1000 / 60);
                      surplus = interval % (1000 * 60);
                      this.seconds = Math.floor(surplus / 1000);
                      if(this.hour == 0 && this.minutes == 0 && this.seconds == 0){
                        window.sessionStorage.setItem(
                          'juliangCanGetData',
                          true
                        );
                        clearInterval(time);
                        location.reload();
                        console.log('reload')
                      }
                      // if (this.seconds == 0) {
                      //   window.localStorage.setItem(
                      //     'juliangCanGetData',
                      //     true
                      //   );
                      //   clearInterval(time);
                      //   location.reload();  
                      // }
                  }, 1000);
              },
              login(){
                console.log('login')
                if(window.location.origin + window.location.pathname == 'https://star.toutiao.com/login'){
                  let dom = document.querySelector('.id-item-container');
                  dom.click();
                }
                if(window.location.origin + window.location.pathname == 'https://e.toutiao.com/account/page/service/login'){
                  let dom = document.querySelectorAll('.google-design input')
                  setTimeout(() => {
                    console.log(dom[0])
                    dom[0].focus();
                  }, 6000);
                  setTimeout(()=>{
                    dom[0].value = 'penglanlan@kibey.com';
                  },10000)
                  setTimeout(() => {
                    dom[1].focus();
                  }, 14000);
                  setTimeout(()=>{
                    dom[1].value = 'kibey2019';
                  },18000)
                  setTimeout(() => {
                    let button = document.querySelector('.account-center-action-button');
                    button.focus();
                    button.click();
    
                  }, 21000);
                  setTimeout(() => {
                    if(window.location.origin + window.location.pathname == 'https://e.toutiao.com/account/page/service/login'){
                      this.login();
                    }
                  }, 240000);
                }
                if(window.location.origin + window.location.pathname == 'https://star.toutiao.com/ad/index'){
                  window.location.href = localStorage.getItem('redirectUrl');
                }
                
              }
          }
      });
    });
}
// 十分钟刷一次
// setInterval(() => {
//   location.reload();
// }, 1000 * 60 * 10);
