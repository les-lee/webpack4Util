function constructor(args) {
		if (!Array.isArray(args)) args = [];
		this._args = args;
		this.taps = [];
		this.interceptors = [];
		this.call = this._call;
		this.promise = this._promise;
		this.callAsync = this._callAsync;
		this._x = undefined;
	}

var option = {
  type: 'sync',
  fn: function () {
    console.log('i am a sync function')
  },
  name: 'what',
  context: '?',
  before: '?', // 这个东西会强制拿出来变成一个set 在内部使用
  state: 0, // 这个东西如果是number会直接拿出来阿
  
}
