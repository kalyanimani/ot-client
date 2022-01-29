
#!/bin/bash
cd /home/ubuntu/overtone
npm start
pm2 start npm --name "OVERTONE" -- start
pm2 startup
pm2 save
pm2 restart all
