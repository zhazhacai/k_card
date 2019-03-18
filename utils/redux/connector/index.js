import { getStore, setStore } from './store';

function normalizeMap(map) {
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }));
}

function mapState(states) {
  const res = {};
  const store = getStore();
  const state = store.getState();
  states.forEach(({ key, val }) => {
    res[key] = typeof val === 'function' ? val.call(this, state) : state[val];
  });
  return res;
}

function connectComponent(states = {}) {
  states = normalizeMap(states);
  let stateMap = mapState(states)
  return function (ComponentOptions) {
    let unSubscribe = null;

    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    const methods = ComponentOptions.methods || {};
    const attached = methods.attached || ComponentOptions.attached;
    const detached = methods.detached || ComponentOptions.detached;

    methods.attached && delete methods.attached;
    methods.detached && delete methods.detached;

    const onStateChange = function () {
      const newStates = mapState(states);
      let hasChanged = false;
      Object.keys(newStates).forEach(k => {
        const newV = newStates[k];
        if (this.data[k] !== newV) {
          // 不相等
          hasChanged = true;
        }
      });
      hasChanged && this.setData(newStates);
    };

    ComponentOptions.dispatcher = stateMap.dispatcher
    ComponentOptions.data = Object.assign(ComponentOptions.data || {}, stateMap)
    ComponentOptions.attached = function () {
      const store = getStore();
      unSubscribe = store.subscribe(onStateChange.bind(this));
      onStateChange.call(this);
      attached && attached.apply(this, arguments);
    }
    ComponentOptions.detached = function () {
      unSubscribe && unSubscribe();
      unSubscribe = null;
      detached && detached.apply(this, arguments);
    }

    return ComponentOptions;
  };
}

function connectPage(states = {}) {
  states = normalizeMap(states);
  let stateMap = mapState(states);
  return function (PageOptions) {
    let unSubscribe = null;

    const onLoad = PageOptions.onLoad;
    const onUnload = PageOptions.onUnload;
    const onShow = PageOptions.onShow;
    const onHide = PageOptions.onHide;

    const onStateChange = function () {
      if (this.$hide) return;
      const newStates = mapState(states);
      let hasChanged = false;
      Object.keys(newStates).forEach(k => {
        const newV = newStates[k];
        if (this.data[k] !== newV) {
          // 不相等
          hasChanged = true;
        }
      });
      hasChanged && this.setData(newStates);
    };

    PageOptions.dispatcher = stateMap.dispatcher
    PageOptions.data = Object.assign(PageOptions.data || {}, stateMap)
    PageOptions.onLoad = function () {
      const store = getStore();
      unSubscribe = store.subscribe(onStateChange.bind(this));
      onStateChange.call(this);
      onLoad && onLoad.apply(this, arguments);
    }
    PageOptions.onUnload = function () {
      unSubscribe && unSubscribe();
      unSubscribe = null;
      onUnload && onUnload.apply(this, arguments);
    }
    PageOptions.onShow = function () {
      this.$hide = false;
      onStateChange.call(this);
      onShow && onShow.apply(this, arguments);
    }
    PageOptions.onHide = function () {
      this.$hide = true;
      onHide && onHide.apply(this, arguments);
    }

    return PageOptions
  };
}

function connectApp(states = {}) {
  states = normalizeMap(states);
  let stateMap = mapState(states);
  return function (PageOptions) {
    let unSubscribe = null;

    const onLaunch = PageOptions.onLaunch;
    const onUnload = PageOptions.onUnload;
    const onShow = PageOptions.onShow;
    const onHide = PageOptions.onHide;

    const onStateChange = function () {
      if (this.$hide) return;
      const newStates = mapState(states);
      const app = getApp()
      if (app != undefined) {
        Object.keys(newStates).forEach(k => {
          const newV = newStates[k];
          if (app.globalData[k] !== newV) {
            // 不相等
            app.globalData[k] = newV
          }
        });
      }
    };

    PageOptions.dispatcher = stateMap.dispatcher
    PageOptions.globalData = Object.assign(PageOptions.globalData || {}, stateMap)
    PageOptions.onLaunch = function () {
      const store = getStore();
      unSubscribe = store.subscribe(onStateChange.bind(this));
      onStateChange.call(this);
      onLaunch && onLaunch.apply(this, arguments);
    }
    PageOptions.onUnload = function () {
      unSubscribe && unSubscribe();
      unSubscribe = null;
      onUnload && onUnload.apply(this, arguments);
    }
    PageOptions.onShow = function () {
      this.$hide = false;
      onStateChange.call(this);
      onShow && onShow.apply(this, arguments);
    }
    PageOptions.onHide = function () {
      this.$hide = true;
      onHide && onHide.apply(this, arguments);
    }

    return PageOptions
  };
}


const connector = { connectApp, connectPage, connectComponent, setStore, getStore };

export default connector;