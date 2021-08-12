# Entity Framework Core 笔记


## 教程

<https://docs.microsoft.com/en-us/ef/core/>

## Ef 命令使用

- 使用 EF CLI

安装 `dotnet tool install --global dotnet-ef`

- 使用 PMC (Package Manager Console，Visual Studio 推荐使用该方式，可以减少文件夹切换等操作)

安装 `Install-Package Microsoft.EntityFrameworkCore.Tools`

## 核心 nuget 程序集

- Microsoft.EntityFrameworkCore

- Microsoft.EntityFrameworkCore.Relational

- Microsoft.EntityFrameworkCore._`database provider`_

- Microsoft.EntityFrameworkCore.Design （设计时，用于由 model 生成数据库或者反向， 可以不随生成发布）

程序集的各版本需要一致

## 自动生成 SQL 的相关命令

| dotnet 命令                                 | PowerShell 命令                   | 作用                                                        |
| ------------------------------------------- | --------------------------------- | ----------------------------------------------------------- |
| dotnet ef migrations add InitialCreate      | Add-Migration InitialCreate       | 对当前的 EF Model 的更改，增加一个 Migration 的配置文件     |
| dotnet ef database update                   | Update-Database                   | 更新当前的 Migration 到数据库中                             |
| dotnet ef migrations remove                 | Remove-Migration                  | 删除一个最新的 Migration                                    |
| dotnet ef database update LastGoodMigartion | Update-Database LastGoodMigration | 指定一个 Migration 去更新数据库                             |
| dotnet ef migrations script                 | Script-Migration                  | 将当前的 Migrationn 生成 SQL 脚本，SQL 脚本可以直接拿来使用 |

**使用命令前需要引用 `Microsoft.EntityFrameworkCore.Tools` 这个包**

