# Python 环境及资源


## Python 环境

使用第三方的包管理系统和环境管理系统 `conda`，通过 `Anaconda` 官网下载安装，安装完成后 WindowsPowerShell 由于权限原因无法直接初始化 `conda`，可运行如下命令：

```cmd
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine
```

参考：<https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.3>

## conda 的使用

- 更新 conda：`conda update -n base conda`
- 创建一个新环境：`conda create --name myenv python=3.11.2 numpy=1.23.5`
- 复制一个环境：#环境复制命令：`conda create -n traget_env_name --clone source_env_name`
- 删除一个环境：`conda remove -n myenv --all`
- 切换环境：激活新环境：`conda activate myenv`，退出当前环境：`conda deactivate`
- 列出当前所有环境：`conda env list`
- 查看当前环境下的信息：`conda info --envs`
- 列出可安装的包：`conda search xxxxx`，可以附加字符串筛选命令：`findstr` 或 `grep`
- 安装包：`conda install package_name=version_number`
- 安装不存在的包：`pip install xxxxx`
- 导出环境：`conda env export --name myenv > environment.yml`
- 导入环境：`conda env create -f environments.yml`
- 导出所有环境的脚本如下：

``` bash
for env in $(conda env list | cut -d" " -f1); do 
   if [[ ${env:0:1} == "#" ]] ; then continue; fi;
   conda env export -n $env > ${env}.yml
done
```

