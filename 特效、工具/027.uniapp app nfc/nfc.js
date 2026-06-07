var waiting
var readyWriteData = false
var readyRead = false

function readData(){
  readyRead = true;
  waiting = plus.nativeUI.showWaiting("请将NFC标签靠近！");
}
function handle_nfc_data1() {
  NdefRecord = plus.android.importClass('android.nfc.NdefRecord')
  NdefMessage = plus.android.importClass('android.nfc.NdefMessage')
  var main = plus.android.runtimeMainActivity()
  var intent = main.getIntent()
  console.log('action type:' + intent.getAction())
  if ('android.nfc.action.TECH_DISCOVERED' == intent.getAction()) {
    if (readyWriteData) {
      __write(intent)
      readyWriteData = false
    } else if (readyRead) {
      __read(intent)
      readyRead = false
    }
  }
}

function parseNfcId(v) {
  // 将字符串转换为数组
  const byteArray = v.split(',').map(num => {
    // 将负数转换为正数（加上 256）
    const byte = parseInt(num, 10)
    return byte < 0 ? byte + 256 : byte
  })

  // 转换为十六进制字符串
  const hexString = byteArray.map(byte => {
    return byte.toString(16).padStart(2, '0')
  }).join('')

  return hexString
}

function handle_nfc_data() {
  waiting.setTitle('请勿移开标签\n正在读取数据...')
  var main = plus.android.runtimeMainActivity()
  var runtimeIntent = main.getIntent()
  var b = runtimeIntent.getExtras()
  plus.android.importClass(b)
  var set = b.keySet()
  plus.android.importClass(set)
  var sb
  var i = set.iterator()
  plus.android.importClass(i)
  var hasNest = i.hasNext()
  var NfcA = plus.android.importClass('android.nfc.tech.NfcA')
  var IsoDep = plus.android.importClass('android.nfc.tech.IsoDep')
  var Tag = plus.android.importClass('android.nfc.Tag')
  while (hasNest) {
    var key = i.next()
    var v = b.get(key)
    if (v instanceof NfcA) {
      var atqa = v.getAtqa()
      var sak = v.getSak()
      var tag = g.getTag()
      plus.android.importClass(tag)
      var techList = tag.getTechList()
      console.log('NfcA Atqa=' + atqa + ';Sak=' + sak + ';techList=' + techList)
    } else if (v instanceof IsoDep) {
      var tag = g.getTag()
      plus.android.importClass(tag)
      var techList = tag.getTechList()
      console.log('IsoDep techList=' + techList)
    } else if (v instanceof Tag) {
      var tag = v
      var techList = tag.getTechList()
      console.log('Tag techList=' + techList)
    }
    console.log(key + ';v=' + v)
    // v就是数据
    if (key === 'android.nfc.extra.ID') {
      var topWebview = plus.webview.getTopWebview()
      var launchWebview = plus.webview.getLaunchWebview()
      var cwPage = null
      // 最顶层的ID与主页ID一致时 代表为系统主页
      if (topWebview.id === launchWebview.id) {
        // 系统主页时，取当前选中的页面事件
        cwPage = plus.webview.getWebviewById(subpages[activeTabIndex].id);
      } else { // 非主页时 取顶层webview对象
        cwPage = plus.webview.getTopWebview()
      }
      var nfcId = parseNfcId(v.reverse().toString()).toUpperCase()
      // var nfcId = parseNfcId(v.toString()).toUpperCase()
      // console.log(nfcId, 'nfcId')
      // alert('id: ' + nfcId)
      var params = {'nfcId': nfcId}
      mui.fire(cwPage, 'nfcId', params);
    }
    sb = key + '=' + v + '\n'
    hasNest = i.hasNext()
    console.log('hasNest=' + hasNest)
  }
  plus.nativeUI.closeWaiting()
}
function showToast(msg) {
  plus.nativeUI.toast(msg)
}

function __write(intent) {
  try {
    waiting.setTitle('请勿移开标签\n正在写入...')
    var text = document.getElementById('text').value
    console.log('text=' + text)
    var textBytes = plus.android.invoke(text, 'getBytes')
    // image/jpeg text/plain
    var textRecord = new NdefRecord(NdefRecord.TNF_MIME_MEDIA,
      plus.android.invoke('text/plain', 'getBytes'), plus.android.invoke('', 'getBytes'), textBytes)
    var message = new NdefMessage([textRecord])
    var Ndef = plus.android.importClass('android.nfc.tech.Ndef')
    var NdefFormatable = plus.android.importClass('android.nfc.tech.NdefFormatable')
    var tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG)
    var ndef = Ndef.get(tag)
    if (ndef != null) {
      var size = message.toByteArray().length
      console.log('size=' + size)
      ndef.connect()
      if (!ndef.isWritable()) {
        showToast('tag不允许写入')
        waiting.close()
        return
      }
      if (ndef.getMaxSize() < size) {
        showToast('文件大小超出容量')
        waiting.close()
        return
      }

      ndef.writeNdefMessage(message)
      waiting.close()
      showToast('写入数据成功.')
      return
    } else {
      var format = NdefFormatable.get(tag)
      if (format != null) {
        try {
          format.connect()
          format.format(message)
          showToast('格式化tag并且写入message')
          waiting.close()
          return
        } catch (e) {
          showToast('格式化tag失败.')
          waiting.close()
          return
        }
      } else {
        showToast('Tag不支持NDEF')
        waiting.close()
        return
      }
    }
  } catch (e) {
    console.log('error=' + e)
    waiting.close()
    alert('写入失败')
  }

}

function __read(intent) {
  waiting.setTitle('请勿移开标签\n正在读取数据...')
  var Parcelable = plus.android.importClass('android.os.Parcelable')
  var rawmsgs = intent.getParcelableArrayExtra('android.nfc.extra.TAG')
  console.log(rawmsgs, 'rawmsgs')
  records = rawmsgs[0].getRecords()
  var result = records[0].getPayload()
  var s = plus.android.newObject('java.lang.String', result)
  // document.getElementById('content').textContent = s
  console.log(s, '-0-----')
  waiting.close()
}

var nfc = {
  listenNFCStatus: function () {
    try {
      var main = plus.android.runtimeMainActivity()
      var Intent = plus.android.importClass('android.content.Intent')
      var Activity = plus.android.importClass('android.app.Activity')
      var PendingIntent = plus.android.importClass('android.app.PendingIntent')
      var IntentFilter = plus.android.importClass('android.content.IntentFilter')
      NfcAdapter = plus.android.importClass('android.nfc.NfcAdapter')
      var nfcAdapter = NfcAdapter.getDefaultAdapter(main)
      var intent = new Intent(main, main.getClass())
      intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
      var pendingIntent = PendingIntent.getActivity(main, 0, intent, 0)
      var ndef = new IntentFilter('android.nfc.action.TECH_DISCOVERED')
      ndef.addDataType('*/*')
      var intentFiltersArray = [ndef]
      var techListsArray = [
        ['android.nfc.tech.IsoDep'],
        ['android.nfc.tech.NfcA'],
        ['android.nfc.tech.NfcB'],
        ['android.nfc.tech.NfcF'],
        ['android.nfc.tech.Nfcf'],
        ['android.nfc.tech.NfcV'],
        ['android.nfc.tech.NdefFormatable'],
        ['android.nfc.tech.MifareClassi'],
        ['android.nfc.tech.MifareUltralight']
      ]
      document.addEventListener('newintent',
        function () {
          console.error('newintent')
          // 默认是读
          readData()
          setTimeout(handle_nfc_data, 1000)
        }, false)
      document.addEventListener('pause', function (e) {
        if (nfcAdapter) {
          nfcAdapter.disableForegroundDispatch(main)
          console.log('pause')
        }
      }, false)
      document.addEventListener('resume', function (e) {
        if (nfcAdapter) {
          console.log('resume')
          nfcAdapter.enableForegroundDispatch(main, pendingIntent, intentFiltersArray, techListsArray)
        }
      }, false)
      nfcAdapter.enableForegroundDispatch(main, pendingIntent, intentFiltersArray, techListsArray)
    } catch (e) {
      console.error(e)
    }
  }
}
window.scanner = scanner
