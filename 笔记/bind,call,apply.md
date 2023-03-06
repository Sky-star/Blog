# apply,bind,call 方法的共同点

    它们三个都是改变this指向的方法

# 不同点

## apply

- 第二个参数传入以数组的形式传入

```js
fn.apply(obj, [1, 2])
```

- 只会临时改变 this 指向一次

## call

- 第二个参数以逗号分隔传入

```js
fn.call(obj, 1, 2)
```

- 只会临时改变 this 指向一次

## bind

- 调用后会将改变 this 的方法返回出来, 并不会立即调用，相当于复制了一份函数出来
- 参数可以多次传入

```js
const bindFn = fn.bind(obj)
bindFn(1, 2) // this 指向obj
fn(1, 2) // this 指向 window
```
