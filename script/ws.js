const connection = new WebSocket('ws://localhost:8020');

var current = new Date();

connection.onopen = () => {
  console.log('connected');
};

connection.onclose = () => {
  console.error('disconnected');
};

connection.onerror = error => {
  console.error('failed to connect', error);
};

connection.onmessage = event => {
  console.log('received', event.data.toString());
  document.getElementById("log").value += '\n' + current.toLocaleString() + '\t' + event.data.toString();
  //setClipboard(event.data);
};

function setClipboard(data) {

  var copyText = data

  document.addEventListener('copy', function(e){
    e.clipboardData.setData('text/plain', 'foo');  
    e.preventDefault();
  });

  document.execCommand("copy");
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

clipboardListener.startListening();

clipboardListener.on('change', () => {
  console.log('Clipboard changed');
  connection.send(getClipboard());
  //document.getElementById("log").value += '\n' + current.toLocaleString() + '\t' + getClipboard();
});
    

   /* setInterval(function(){ 

      console.log(getClipboard());

      var newtext = document.getElementById("log").value;

      //document.getElementById("log").value = "";

      document.getElementById("log").value += '\n' + getClipboard();

    }, 3000);*/



    document.addEventListener('copy', function(e){
      //e.clipboardData.setData('text/plain', 'foo');
      
     //e.preventDefault(); // default behaviour is to copy any selected text
    });

/*document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  let message = document.querySelector('#message').value;
  connection.send(message);
  document.querySelector('#message').value = '';
});*/