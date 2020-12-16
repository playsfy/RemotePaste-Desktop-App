var connection;

connect();

function connect() {

  connection = new WebSocket('ws://clipup.herokuapp.com');

  connection.onopen = () => {
    console.log('connected');
    version.innerText = vrsn;
    /*connection.send(JSON.stringify({
       userid: "SXR42DS"
    }));*/
  };

  connection.onclose = error => {
    console.log('Socket is closed. Reconnect will be attempted in 1 second.', error.reason);
    setTimeout(function() {
      connect();
      version.innerText = 'Reconnecting';
    }, 1000);
  };

  connection.onerror = error => {
    console.error('failed to connect', error);
  };

  connection.onmessage = event => {
    console.log('received', event.data.toString());
    var current = new Date();
    document.getElementById("log").value += '\n' + current.toLocaleString() + '\t' + event.data.toString();

    setClipboard(event.data);
    document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
  };
}

function setClipboard(data) {

  var copyText = data

  var sampleEditor = document.createElement('textarea');
  document.body.appendChild(sampleEditor);
  sampleEditor.value = event.data.toString();
  sampleEditor.focus();
  sampleEditor.select();
  document.execCommand('copy');
  document.body.removeChild(sampleEditor);
}

function getClipboard() {    
  var el = document.createElement('textarea');
  document.body.appendChild(el);
  el.focus();
  document.execCommand('paste');
  var value = el.value;
  document.body.removeChild(el)
  return value;
}

const clipboardListener = require('clipboard-event');

var oldclip;

clipboardListener.startListening();

clipboardListener.on('change', () => {
  console.log('Clipboard changed');
  var clipx = getClipboard();

  if( clipx != oldclip){
    connection.send(clipx);
    oldclip = clipx;
  }
  //document.getElementById("log").value += '\n' + current.toLocaleString() + '\t' + getClipboard();
});
    

/* setInterval(function(){ 

  console.log(getClipboard());

  var newtext = document.getElementById("log").value;

  //document.getElementById("log").value = "";

  document.getElementById("log").value += '\n' + getClipboard();

}, 3000);*/



/*document.addEventListener('copy', function(e){
  //e.clipboardData.setData('text/plain', 'foo');
  
 //e.preventDefault(); // default behaviour is to copy any selected text
});*/

/*document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  let message = document.querySelector('#message').value;
  connection.send(message);
  document.querySelector('#message').value = '';
});*/