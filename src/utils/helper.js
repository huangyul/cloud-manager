/**
 * @description 深拷贝实现(支持Map、Set、RegExp、Date、Function类型，支持循环引用)
 * @param {object} obj 需要深拷贝的对象
 * @returns 返回一个新对象
 */
export function deepClone(obj) {
  // 用来保存引用关系，解决循环引用问题(使用闭包私有化copyObj变量)
  // 可以weakMap弱引用来保存，这里为了兼容使用object
  const copyObj = {};

  const clone = (data) => {
    // 简单数据类型直接返回值
    if (!(data instanceof Object)) {
      return data;
    }

    const newObj = Array.isArray(data) ? [] : {};

    for (const key in data) {
      // 跳过原型上的属性（可以不跳过）
      if (!data.hasOwnProperty(key)) {
        continue;
      }

      // 简单数据类型直接返回值
      if (!(data[key] instanceof Object)) {
        newObj[key] = data[key];
        continue;
      }

      // 拷贝date对象
      if (data[key] instanceof Date) {
        newObj[key] = new Date(data[key].getTime());
        continue;
      }

      // 拷贝正则对象
      if (data[key] instanceof RegExp) {
        newObj[key] = new RegExp(data[key]);
        continue;
      }

      // 拷贝函数
      if (data[key] instanceof Function) {
        newObj[key] = new Function(`return ${data[key].toString()}`)();
        continue;
      }

      // 拷贝map
      if (data[key] instanceof Map) {
        newObj[key] = new Map();

        data[key].forEach((val, mapKey) => {
          if (!(mapKey instanceof Object) && !(val instanceof Object)) {
            newObj[key].set(mapKey, val);
          } else {
            newObj[key].set(clone(mapKey), clone(val));
          }
        });

        continue;
      }

      // 拷贝set
      if (data[key] instanceof Set) {
        newObj[key] = new Set();

        data[key].forEach((val) => {
          if (!(val instanceof Object)) {
            newObj[key].add(val);
          } else {
            newObj[key].add(clone(val));
          }
        });

        continue;
      }

      // 判断是否为循环引用
      if (copyObj[key] === data[key]) {
        newObj[key] = data[key];
        continue;
      }

      // 保存引用
      copyObj[key] = data[key];

      // 复杂数据类型，递归处理
      newObj[key] = clone(data[key]);
    }

    return newObj;
  };

  return clone(obj);
}

/**
 * 使用旧云后台的弹窗打开页面
 * @param {string} leager_id 会员id
 */
export function openMemberDetail(leager_id) {
  window.top.postMessage(
    {
      action: "popWin",
      title: "会员详情",
      url: `/#/member/member-detail?leager_id=${leager_id}`,
    },
    "*"
  );
}

/**
 * 打开云后台弹窗
 * @param {*} url
 * @param {*} title
 */
export function openIframe(url, title) {
  window.top.postMessage(
    {
      action: "popWin",
      title,
      url: `/#${url}`,
    },
    "*"
  );
}

/**
 * 获取特定时间段
 * @param {String} val 本日 | 本周 | 本月 | 本季度 | 本年
 * @param {Boolean} isC 是否补全 默认true
 * @returns
 */
export function timeSlotChange(val, isC = true) {
  let startTime, endTime;
  let now = new Date(); //当前日期
  let nowDayOfWeek = now.getDay(); //今天本周的第几天
  let nowDay = now.getDate(); //当前日
  let nowMonth = now.getMonth(); //当前月
  let nowYear = now.getFullYear(); //当前年
  let jd = Math.ceil((nowMonth + 1) / 3); //当前季度
  switch (val) {
    case "本日":
      startTime = new Date(nowYear, nowMonth, nowDay);
      endTime = new Date(nowYear, nowMonth, nowDay, 23, 59, 59);
      break;
    case "本周":
      startTime = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
      endTime = new Date(
        nowYear,
        nowMonth,
        nowDay + 7 - nowDayOfWeek,
        23,
        59,
        59
      );
      break;
    case "本月":
      startTime = new Date(nowYear, nowMonth, 1);
      endTime = new Date(nowYear, nowMonth + 1, 0, 23, 59, 59);
      break;
    case "本季度":
      startTime = new Date(nowYear, (jd - 1) * 3, 1);
      endTime = new Date(nowYear, jd * 3, 0, 23, 59, 59);
      break;
    case "本年":
      startTime = new Date(nowYear, 0, 1);
      endTime = new Date(nowYear, 11, 31, 23, 59, 59);
      break;
  }
  return [startTime, endTime];
}

export function getCTime(date) {
  var date = new Date(date);
  //年
  var year = date.getFullYear();
  //月
  var month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  //日
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  //时
  var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  //分
  var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  //秒
  var ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  var nowTime = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;

  return nowTime;
}

// 节流完整版，可选前缘节流或延迟节流
export function throttle(fn, delay, isImmediate = true) {
  // isImmediate 为 true 时使用前缘节流，首次触发会立即执行，为 false 时使用延迟节流，首次触发不会立即执行
  let last = Date.now();
  return function () {
    let now = Date.now();
    if (isImmediate) {
      fn.apply(this, arguments);
      isImmediate = !isImmediate;
    }
    if (now - last >= delay) {
      fn.apply(this, arguments);
      last = now;
    }
  };
}

// 防抖
export function debounce(fn, delay) {
  let timerId = null;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
