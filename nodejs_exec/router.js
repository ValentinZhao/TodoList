function route(handler, pathname, res, req) {
    console.log('About to route a request for ' + pathname + '!');
    if(typeof handler[pathname] === 'function'){
        console.log('execute handler[' + pathname + ']!');
        handler[pathname](res, req);
    } else {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });
        res.write("404 NOT FOUND!!");
        res.end();
    }
}

exports.route = route;