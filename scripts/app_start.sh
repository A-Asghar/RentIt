#!/bin/bash
cd /home/ec2-user/server
node server.js
cd client
npm start
pm2 start npm --name "rentitapp" -- start
pm2 startup
pm2 save
pm2 restart all
