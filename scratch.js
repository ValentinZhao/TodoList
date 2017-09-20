class Hero {
  constructor(name) {
    this.name = name;
    this.promise = new Promise((resolve, reject) => {
      resolve();
    });
    console.log(`hi this is ${this.name}`);
  }
  
  kill(s) {
    this.promise.then((res) => {
      setTimeout(function(res) {
        if (s === 1) {
          console.log('kill 1 bug');
        } else {
          console.log('kill ' + s + ' bugs');
        }
      }, 0);
    });
    return this;
  }

  recover(num) {
    this.promise.then((res) => {
      setTimeout(function(res){
        console.log('recover ' + num + ' bloods');
      }, 0);
    });
    return this;
  }

  sleep(s) {
    this.promise.then((res) => {
      resolve();
    })
    return this;
  }
}

new Hero('Valentin').recover(20).kill(1)