# Timer 的性能优势


Xamarin Android 项目在编译时会从 google 的服务器下载缺失的 m2repository 相关文件，虽然不明白这是干什么的，但是情况就是 Andorid SDK Manager 不会去下载这个东西，然后在 VS 里编译某些项目时会去下载某些版本的 m2repository 文件。

由于墙的关系这个肯定是下载不下来的，所以只能通过迅雷穿墙下载，然后拷贝到指定的目录，这个目录就是它报错的提示里的一个文件夹，路径类似于：_C:\Users\Administrator\AppData\Local\Xamarin\zips_，下载的路径可以从国内的镜像网站找，也可以根据报错提示从 google 的网站下，官方的下载路径类似于：<https://dl-ssl.google.com/android/repository/android_m2repository_r10.zip>

下载完毕后需要放入上面的指定文件夹，还要修改文件的名字，对应关系如下（**截止至 23.3.0 版**）：

**Android：**

- 23.3.0 ------ [android_m2repository_r29.zip](https://dl-ssl.google.com/android/repository/android_m2repository_r29.zip) ----------------- 2A3A8A6D6826EF6CC653030E7D695C41.zip
- 23.2.1 ------ [android_m2repository_r28.zip](https://dl-ssl.google.com/android/repository/android_m2repository_r28.zip) ----------------- 17BE247580748F1EDB72E9F374AA0223.zip
- 23.1.1.1 ------ [android_m2repository_r25.zip](https://dl-ssl.google.com/android/repository/android_m2repository_r25.zip) ----------------- 0B3F1796C97C707339FB13AE8507AF50.zip
- 23.1.1 ------ [android_m2repository_r25.zip](https://dl-ssl.google.com/android/repository/android_m2repository_r25.zip) ----------------- 0B3F1796C97C707339FB13AE8507AF50.zip
- 23.0.1.3 ------ [android_m2repository_r22.zip](https://dl-ssl.google.com/android/repository/android_m2repository_r22.zip) ----------------- 96659D653BDE0FAEDB818170891F2BB0.zip
- 23.0.1.1 ------ [android_m2repository_r20.zip](https://dl-ssl.google.com/android/repository/android_m2repository_r20.zip) ----------------- 650E58DF02DB1A832386FA4A2DE46B1A.zip
- 22.2.1 ------ [android_m2repository_r16.zip](https://dl-ssl.google.com/android/repository/android_m2repository_r16.zip) ----------------- 0595E577D19D31708195A83087881EE6.zip
- 22.2.0 ------ [android_m2repository_r15.zip](https://dl-ssl.google.com/android/repository/android_m2repository_r15.zip) ----------------- F9D66CC0ADC0C3787F4DAE6D494E6BC7.zip
- 22.1.1.1 ------ [android_m2repository_r14.zip](https://dl-ssl.google.com/android/repository/android_m2repository_r14.zip) ----------------- AB24E1C26FC70B44683752D37075AC06.zip
- 22.0.0 ------ [android_m2repository_r12.zip](https://dl-ssl.google.com/android/repository/android_m2repository_r12.zip) ----------------- 806FD8EEF161DCEA979C128F27BE5867.zip
- 21.0.3 ------ [android_m2repository_r10.zip](https://dl-ssl.google.com/android/repository/android_m2repository_r10.zip) ----------------- 1FD832DCC1792D8ACA07FAC3259FC5A9.zip
- 19.0.1 ------ [support_r19.0.1.zip](https://dl-ssl.google.com/android/repository/support_r19.0.1.zip) ----------------- CED55A39D1283BB9DC217CAE987067E0.zip

**Google：**

- 8.4 ------ [google_m2repository_r24.zip](https://dl-ssl.google.com/android/repository/google_m2repository_r24.zip) ----------------- CAA441D76F04E0D57C4110F8A00CDA7A.zip

以上有缺失和错误的欢迎补充，给出一个完整包的下载地址：
<http://pan.baidu.com/s/1boOwuZ1>

