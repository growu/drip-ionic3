#!/bin/sh

cordova-hcp build
npm run ionic:build –prod
scp -r www/* root@115.29.163.138:/var/www/web/public/www/
