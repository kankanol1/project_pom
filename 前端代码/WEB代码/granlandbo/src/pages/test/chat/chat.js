var Chat = {};
Chat.socket = null;
Chat.connect = (function(host){
  if ('WebSocket' in window) {
    Chat.socket = new WebSocket(host);
  } else if ('MozWebSocket' in window) {
    Chat.socket = new MozWebSocket(host);
  } else {
    Console.log('Error: WebSocket is not supported by this browser.');
    return;
  }
  //websocket连接打开时
  Chat.socket.onopen = function () {
    document.getElementById('chat').onkeydown = function(event) {
      if (event.keyCode == 13) {
        Chat.sendMessage();
        event.returnValue = false;
        event.preventDefault();
      }
    };
  };
  //websocket连接关闭时
  Chat.socket.onclose = function () {
    document.getElementById('chat').onkeydown = null;
  };
  //websocket连接有消息时
  Chat.socket.onmessage = function (message) {
    var data = eval('(' + message.data + ')');
    //data即为后台发送的数据，在此根据数据内容进行判断属于Chat.info | Chat.self | Chat.other
  }

});
//初始化
Chat.initialize = function() {
  if (window.location.protocol == 'http:') {
    Chat.connect('ws://' + window.location.host + '/websocket/chat');
  } else {
    Chat.connect('wss://' + window.location.host + '/websocket/chat');
  }
};
//发送的方法
Chat.sendMessage = (function() {
  var message = document.getElementById('chat').value;
  if (message != '') {
    var data = {
      'from':'',
      'to':'',
      'groupId':'',
      'type':'',
      'message':message
    }//from,to,type为后期私聊，群里
    var msg = JSON.stringify(data);
    Chat.socket.send(msg);
    document.getElementById('chat').value = '';
  }
});

var Console = {};//聊天主窗体
//负责展现系统提示，例如 小明进入
Console.info = (function(message) {
  var h = '<div style="text-align:center;color:#aca;margin:5px auto;">'+ message +'</div>';
  $('#center').append(h);
});
//负责展现自己发送的消息，显示在右边
Console.self=(function(data){
  var h = '';
  //将data解析为html片段
  $('#center').append(h);
});
//负责展现其他人发送的消息，显示在左边
Console.other=(function(data){
  var h = '';
  //将data解析为html片段
  $('#center').append(h);
});

Chat.initialize();
