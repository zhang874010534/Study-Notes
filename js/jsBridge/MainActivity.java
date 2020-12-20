package com.example.myapplication;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.EditText;

import java.sql.Date;

public class MainActivity extends AppCompatActivity {
    private WebView webView;
    private Button refreshBtn;
    private Button showBtn;
    private EditText editText;
    private MainActivity self=this;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        webView=findViewById(R.id.webView);
        refreshBtn=findViewById(R.id.refreshBtn);
        showBtn=findViewById(R.id.showBtn);
        editText=findViewById(R.id.editText);
        webView.loadUrl("http://192.168.1.9:8080/?time="+ new java.util.Date().getTime());
        webView.getSettings().setJavaScriptEnabled(true);// 使用js的能力
        // 方法1
//        webView.setWebChromeClient(new WebChromeClient(){
//            @Override
//            public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
//                if(!message.startsWith("jsbridge")){
//                    return super.onJsAlert(view, url, message, result);
//                }
//
//                String text=message.substring(message.indexOf("=")+1);
//                self.showNativeDialog(text);
//                result.confirm();
//                return  true;
//            }
//        });// 一个客户端，用来展示类似弹窗的东西
        // 方法2  android 4.2+
        webView.setWebChromeClient(new WebChromeClient());
        webView.addJavascriptInterface(new NativeBridge(this),"NativeBridge");

        showBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String inputValue=editText.getText().toString();
                self.showWebDialog(inputValue);
            }
        });
        refreshBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                webView.loadUrl("http://192.168.1.4:8082/?time="+ new java.util.Date().getTime());
            }
        });
    }
    private  void showWebDialog ( String text){
        String isCode=String.format("window.showWebDialog('%s')",text);
        webView.evaluateJavascript(isCode,null);
    }
//    private  void showNativeDialog( String text){
//        new AlertDialog.Builder(this).setMessage(text).create().show();
//    }

    class NativeBridge {
        private Context ctx;
        NativeBridge(Context ctx){
            this.ctx=ctx;
        }
        @JavascriptInterface
        public void showNativeDialog( String text){
            new AlertDialog.Builder(ctx).setMessage(text).create().show();
        }
    }
}