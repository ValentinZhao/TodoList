function onConnect(wss){
    wss.on('connection', function(ws){
        console.log('[SERVER] connected!');
        ws.on('message', function(msg){
            console.log('[SERVER] Received:' + msg);
            ws.send('ECHO:' + msg, (err) => {
                if(err){
                    console.log('[SERVER] error:' + err);
                }
            });
        })
    });
}

exports.onConnect = onConnect;