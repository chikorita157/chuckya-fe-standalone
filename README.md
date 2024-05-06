# Chuckya (standalone frontend)

This is a somewhat hacky fork of Chuckya that adds standalone support (based on https://iceshrimp.dev/iceshrimp/masto-fe-standalone) (meaning your browser can OAuth against an arbitrary instance). It's currently tested to work (for the most part) with Iceshrimp and Iceshrimp.NET.

To set this up yourself, clone the repo into e.g. `/home/user/masto-fe-standalone` and run `yarn && yarn build:production`.

Then configure nginx for a subdomain like this:

```
map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
}

server {
        include sites/example.com/inc/ssl.conf;
        server_name masto.example.com;

        location / {
                root /home/user/masto-fe-standalone/public/;
                index index.html;
                try_files $uri /index.html;
        }
}
```

And open `https://masto.example.com` in your browser, type in your instance domain, press the button & follow the OAuth flow.

Should anything break, open `https://masto.example.com/logout.html` or clear local storage manually.
