# CSS 资源


## 文本与段落

- 加载本地字体，通常按照从特殊到一般

```css
font-family: Arial, 'Microsoft Yahei', sans-serif;
```

- 加载 web 字体

```css
@font-face {
  font-family: 'webfont';
  src: url('webfont.woff');
}

font-family: 'webfont', Arial, 'Microsoft Yahei', sans-serif;
```

- 颜色

```css
color: #077f3c;
```

- 大小

```css
font-size: 28px;
```

- 字符间距

```css
letter-spacing: 4px;
```

- 文本方向

```css
writing-mode: vertical-rl;
text-orientation: mixed;
```

- 文本样式

```css
text-decoration: underline line-through;
```

- 行间距

```css
line-height: 36px;
```

- 缩进

```css
text-indent: 2em;
```

- 折行

```css
white-space: nowrap;
```

- 省略

```css
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```

- 对齐

```css
text-align: justify;
```

- 设置背景颜色

```css
background-color: #8be5ac;
```

- 加载背景图片

```css
background-image: url(./bg.jpg);
```

- 调整背景尺寸

```css
background-size: 50px;
```

- 调整背景填充

```css
background-repeat: no-repeat;
```

- 调整背景位置

雪碧图通常使用该属性实现

```css
background-position: center center;
```

- 调整背景拉伸

```css
background-size: contain; /* 充满容器，可能会留白 */
background-size: cover; /* 充满容器，可能会裁剪 */
```

## 外发光悬空阴影

```css
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
```

![外发光悬空阴影](https://cdn.jsdelivr.net/gh/fengrui358/img@main/qqfMpqS.png)

## HSL

定义 HSL 颜色

- **色相（H）** 是色彩的基本属性，就是平常所说的颜色名称，如红色、黄色等。
- **饱和度（S）** 是指色彩的纯度，越高色彩越纯，低则逐渐变灰，取 0-100% 的数值。
- **亮度（L）** ，取 0-100%，增加亮度，颜色会向白色变化；减少亮度，颜色会向黑色变化。

<https://www.runoob.com/cssref/func-hsl.html>

> 参考：<https://www.bilibili.com/video/BV1654y1m76w?p=1&share_medium=iphone&share_plat=ios&share_source=COPY&share_tag=s_i&timestamp=1598287257&unique_k=KP2sHN>

