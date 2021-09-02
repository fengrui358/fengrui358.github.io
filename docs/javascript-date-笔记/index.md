# Javascript Date 笔记


Javascript 最常用的时间库 [moment](https://github.com/moment/moment)

## 初始化 moment

- 从 Date 初始化

``` javascript
let nowDate = new Date();
console.log('1.1 从 date 初始化：', nowDate, moment(nowDate));
```

- 直接初始化

``` javascript
let nowMoment = moment();
console.log('1.2 直接初始化：', nowMoment);
```

- 从字符串初始化

``` javascript
const ISO8601_String = (new Date(1987, 8, 15 , 16, 15, 45)).toISOString();
console.log('1.3 从字符串初始化：', ISO8601_String, moment(ISO8601_String), new Date(Date.parse(ISO8601_String)))
```

## 格式化

- Format 格式化输出

``` javascript
console.log('2.1 Format 格式化输出：', nowMoment.format())
```

- Format 默认格式化

``` javascript
moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss:SSSS'
console.log('2.2 Format 默认格式化输出：', nowMoment.format())
```

- UTC Format 格式化输出

``` javascript
console.log('2.3 Format 格式化输出：', nowMoment.utc().format())
```

- UTC Format 默认格式化

``` javascript
moment.defaultFormatUtc = 'YYYY-MM-DD HH:mm:ss:SSSS'
console.log('2.4 UTC Format 默认格式化输出：', nowMoment.utc().format())
```

## Unix 时间戳

### 原生获取时间戳

``` javascript
console.log('3.1 原生获取时间戳：', nowDate.getTime(), new Date(nowDate.getTime()))
```

### moment 获取时间戳

``` javascript
console.log('3.1 moment 获取时间戳：', nowMoment.unix(), moment.unix(nowMoment.unix()), moment(nowDate.getTime()))
```

## 时区

使用 [Moment Timezone](https://github.com/moment/moment-timezone)

### 猜测当前时区

``` javascript
console.log('4.1 获取当前时区：', moment.tz.guess(), moment.utc())
```

## 时间临界值

### 获取当天最后一刻

``` javascript
console.log('5.1 获取当天最后一刻', moment().endOf('day'))
```

### 获取本周最后一刻

``` javascript
console.log('5.2 获取本周最后一刻', moment().endOf('week').startOf('day'))
```

### 获取本月第一天

``` javascript
console.log('5.3 获取本月第一天', moment().startOf('month'))
```

### 获取明年第一天

``` javascript
console.log('5.4 获取明年第一天', moment().year(moment().year() + 1).startOf('year'))
```

## 时长

### 原生时长差值

``` javascript
const d1 = new Date(1987, 8, 15, 16, 15, 45)
const d2 = new Date(1987, 8, 15, 17, 13, 45)
console.log('6.1 原生时长差值（单位 ms）：', d2.getTime() - d1.getTime(), d1.getTime() - d2.getTime())
```

### moment 时长差值减

``` javascript
console.log('6.3 moment 时长差值减：', duration.subtract(moment.duration(5, 'minute')).asMinutes())
```

