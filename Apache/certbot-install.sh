#!/bin/sh

sudo certbot --authenticator standalone --installer apache -d eztv.geekbocks.com --pre-hook "service apache2 stop" --post-hook "service apache2 start"
