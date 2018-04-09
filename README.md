# HOW TO USE IT

## PREPARATION

  clone or fork this repository and run `npm install` on both folder server and client for installing all depedencies that needed by this 'app'

  make sure you have installeed mongoDb on your computer,if you have'nt install the mongoDb check this [link](https://docs.mongodb.com/manual/installation/)

  run mongoDb on your terminal with `sudo service mongod start`

  ### RUN THE SERVER
    run your terminal on folder server and type `npm run dev`
  
  ### RUN THE CLIENT
   because this is an pwa app you should run client with `serve -s build`,
   make sure your computer has already install serve with `npm i serve -g` first
   usually this client will be run on port 5000 (localhost:5000)

   please make sure you already have folder build on client,if not... simply type `npm run build` on your terminal
  ### ALL FITURE ON THIS APP
    realtime btc,ltc,eth tracker on today Page (also you can set price limit for those coin and you will get notification when your coin price has reach your price limit)

    convert your crypto coin to some currency on exchange Page 
