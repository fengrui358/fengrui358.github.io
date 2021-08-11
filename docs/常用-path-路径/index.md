# 常用 Path 路径


* **正三角形(左)：**&lt;Path Data="M40,0 L0,30 40,60 z" Stretch="Uniform"/&gt;
* **正三角形(上)：**&lt;Path Data="M0,40 L30,0 60,40 z" Stretch="Uniform"/&gt;
* **正三角形(右)：**&lt;Path Data="M0,0 L40,30 0,60 z" Stretch="Uniform"/&gt;
* **正三角形(下)：**&lt;Path Data="M0,0 L30,40 60,0 z" Stretch="Uniform"/&gt;
* **矩形：**&lt;Path Data="M0,0 L1,0 L1,1 L0,1 z" Stretch="Uniform"/&gt;
* **圆形：**&lt;Path Data="M100,50 C100,77.614237 77.614237,100 50,100 C22.385763,100 0,77.614237 0,50 C0,22.385763 22.385763,0 50,0 C77.614237,0 100,22.385763 100,50 z" Stretch="Uniform"/&gt;
* **箭头(左)：**&lt;Path Data="M40,0 L0,30 40,60" Stretch="Uniform"/&gt;
* **箭头(上)：**&lt;Path Data="M0,40 L30,0 60,40" Stretch="Uniform"/&gt;
* **箭头(右)：**&lt;Path Data="M0,0 L40,30 0,60" Stretch="Uniform"/&gt;
* **箭头(下)：**&lt;Path Data="M0,0 L30,40 60,0" Stretch="Uniform"/&gt;

`Stretch` 默认使用 `Uniform`，在这种参数下矩形为正方形、圆形为正圆形，如果修改 `Stretch` 为 `Fill`，则根据容器高宽进行自由拉伸。

