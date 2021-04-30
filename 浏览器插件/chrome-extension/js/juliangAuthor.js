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


const juliangAuthorURL = 'https://star.toutiao.com/ad/creator/author/douyin';
if ((window.location.origin + window.location.pathname).indexOf(juliangAuthorURL) != -1) {
    document.addEventListener('DOMContentLoaded', function () {
      let bunan = document.createElement('div');
      bunan.setAttribute('id', 'bunan');
      bunan.innerHTML = `
        <div class="author-wrapper">
          <div class="author-content" v-show="wrapperFlag">
            <button @click="sendData" class="send-button-juliang">拿头像</button>
          </div>
          <div class="trigger-button-juliang">
           <button @click="trigger" class="">{{wrapperFlag ? '隐藏' : '显示'}}</button>
          </div>
        </div>
      `;
      document.body.appendChild(bunan);
      let bunanApp = new Vue({
          el: '#bunan',
          data: {
            wrapperFlag:true,
          },
          mounted() {
              // 获取数据并发送
              // this.sendData();
          },
          methods: {
              sendData() {
                axios({
                  method:'post',
                  url:'https://api.demo.com',
                  data:{
                    link : location.href,
                    avatar: document.querySelector('.author-info .user-avatar .user-avatar-image').src
                  }
                })
                  .then( (res)=> {
                    if (res.data.state == 1) {
                      let notification = new Notification(window.location.href,{
                        body:'请求成功',
                        icon:'../image/bunan_logo.png'
                      });
                      alert('请求成功')
                      // this.responseMsg = '发送成功'
                    }else{
                      this.responseMsg = res.data.result.errmsg
                    }
                  })
                  .catch((res)=>{
                    console.log(res,'catch')
                    // this.responseMsg = res.data.result.errmsg
                  }) 
              },
              trigger(){
                this.wrapperFlag = !this.wrapperFlag;
              }
          }
      });
    });
}