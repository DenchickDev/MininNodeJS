const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(`
            <h1>Form</h1>
            <form method="post" action="/">
                <input name="title" type="text">
                <button type="submit">Send</button>
            </form>
        `)
    }  else if (req.method === 'POST') {
        const body = [];
console.log('1');
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',

        })
        req.on('data', data => {
            body.push(Buffer.from(data));
            console.log('2');
        });

        req.on('end', () => {
            const message = body.toString().split('=')[1]
            console.log('3');
        res.end(`
            <h1>Ваше сообщение: ${message}</h1>
        `);

        })

    }
});

server.listen(3000, () => {
    console.log('Server is running...');
});