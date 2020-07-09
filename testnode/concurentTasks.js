// const express = require('express')
// const bodyParser = require('body-parser')
// const app = new express();
// const http = require('http').Server(app);
// const io = rquire('socket.io')(http)

// app.use(express.static(__dirname));
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:true})
// let {promisify} = require('util')
// let fs = require('fs')
// var promWrite = promisify(fs.writeFile)
// promWrite('smaple.txt','dd')
// .then(console.log('ff'))

// var beep = () => process.stdout.write("\x07");
// beep();
const logUpdate = require("log-update");
const toX = () => "X";

var delay = (seconds) =>
  new Promise((resovles) => {
    setTimeout(resovles, seconds * 1000);
  });

var tasks = [delay(4), delay(2), delay(1), delay(3)];

class PromiseQueue {
  constructor(promises = [], concurrentTasks = 2) {
    this.concurrentTasks = concurrentTasks;
    this.total = promises.length;
    this.todo = promises;
    this.running = [];
    this.completed = [];
  }

  graphTasks() {
    var { todo, completed, running } = this;
    logUpdate(`
      
      todo: [${todo.map(toX)}]
      
      running: [${running.map(toX)}]

      completed: [${completed.map(toX)}]


      `);
  }
  get runAnother() {
    return this.running.length < this.concurrentTasks && this.todo.length;
  }
  run() {
    while (this.runAnother) {
      var promise = this.todo.shift();
      this.running.push(promise);
      this.graphTasks();
      promise.then(() => {
        this.completed.push(this.running.shift());
        this.graphTasks();
        this.run();
      });
    }
  }
}

var delayQueue = new PromiseQueue(tasks, 2);
delayQueue.run();
