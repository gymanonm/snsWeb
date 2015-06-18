        var fs = require('fs'),
        util = require('util'),
        union = require('union'),
        ecstatic = require('ecstatic'),
        httpProxy = require('http-proxy'),
        corser = require('corser');

    var HTTPServer = exports.HTTPServer = function (options) {
      options = options || {};

      if (options.root) {
        this.root = options.root;
      }
      else {
        try {
          fs.lstatSync('./public');
          this.root = './public';
        }
        catch (err) {
          this.root = './';
        }
      }

      this.headers = options.headers || {};

      this.cache = options.cache || 3600; // in seconds.
      this.showDir = options.showDir !== 'false';
      this.autoIndex = options.autoIndex !== 'false';

      if (options.ext) {
        this.ext = options.ext === true
          ? 'html'
          : options.ext;
      }

      var before = options.before ? options.before.slice() : [];

      before.push(function (req, res) {
        if (options.logFn) {
          options.logFn(req, res);
        }

        res.emit('next');
      });

      if (options.cors) {
        this.headers['Access-Control-Allow-Origin'] = '*';
        this.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

        before.push(corser.create());
      }

      if (options.robots) {
        before.push(function (req, res) {
          if (req.url === '/robots.txt') {
            res.setHeader('Content-Type', 'text/plain');
            var robots = options.robots === true
              ? 'User-agent: *\nDisallow: /'
              : options.robots.replace(/\\n/, '\n');

            return res.end(robots);
          }

          res.emit('next');
        });
      }

      before.push(ecstatic({
        root: this.root,
        cache: this.cache,
        showDir: this.showDir,
        autoIndex: this.autoIndex,
        defaultExt: this.ext,
        handleError: typeof options.proxy !== 'string'
      }));

      if (typeof options.proxy === 'string') {
        var proxy = httpProxy.createProxyServer({});
        before.push(function (req, res) {
          proxy.web(req, res, {
            target: options.proxy,
            changeOrigin: true
          });
        });
      }

      var serverOptions = {
        before: before,
        headers: this.headers,
        onError: function (err, req, res) {
          if (options.logFn) {
            options.logFn(req, res, err);
          }
          res.end();
        }
      };

      if (options.https) {
        serverOptions.https = options.https;
      }

      this.server = union.createServer(serverOptions);
    };

    HTTPServer.prototype.listen = function () {
      this.server.listen.apply(this.server, arguments);
    };

    HTTPServer.prototype.close = function () {
      return this.server.close();
    };

    var createServer = function (options) {
      return new HTTPServer(options);
    };



listen('8080');


function listen(port) {
    console.log("listen on " + port);

    var options = {
    root: './app'
  };

   var host =  '0.0.0.0';

  var server = createServer(options);
  server.listen(port, host, function () {
    var canonicalHost = host === '0.0.0.0' ? '127.0.0.1' : host,
        protocol      = 'http:';
console.log("lol on " +  "server" + port);
    //log('Starting up http-server, serving '.yellow
      //+ server.root.cyan
      //+ (ssl ? (' through'.yellow + ' https'.cyan) : '')
      //+ ' on: '.yellow
     // + (protocol + '//' + host + ':' + port).cyan);

    if (typeof proxy === 'string') {
      log('Unhandled requests will be served from: ' + proxy);
    };

    //log('Hit CTRL-C to stop the server');
//    if (argv.o) {
//      opener(
//        'http' + '//' + canonicalHost + ':' + port,
//        { command: argv.o !== true ? argv.o : null }
//      );
//    }
  });
}
