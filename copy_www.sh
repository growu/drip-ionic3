#!/bin/sh

cordova-hcp build
scp -r www/* root@115.29.163.138:/var/www/web/public/www/
