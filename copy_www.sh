#!/bin/sh

#npm run ionic:build –-prod
ionic build --prod
cordova-hcp build
sudo qshell -d qupload 10 qshell_upload.conf
#scp -r www/* root@115.29.163.138:/var/www/web/public/www/
