#!/bin/sh

ionic cordova build android --prod --release -- -- --keystore=growu.keystore  \
            --alias=growu
