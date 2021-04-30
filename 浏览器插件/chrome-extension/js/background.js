chrome.contextMenus.create({
  title:"bunan巨量",
  type:'radio',
  onclick:function(){
    alert(222)
    chrome.runtime.sendMessage({
      method: 'juliang'
    }, function(response) {
      alert(33)
    });
  },
  documentUrlPatterns:["https://*.toutiao.com/*"]
})

// chrome.notifications.create(null,{
//   type:"basic",
//   iconUrl:'../image/bunan_logo.png',
//   title:"Hi there!",
//   message:'开始啦'
// })

// chrome.contextMenus.create({
//   title:"bqqunan巨量",
//   type:"radio",
//   onclick:function(){
//     alert(21)
//     chrome.tabs.executeScript(null, {file: './juliang.js'});
//   },
//   documentUrlPatterns:["https://*.toutiao.com/*"]
// })