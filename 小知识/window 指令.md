可能是romove directory

rd /? 查看帮助

rd /s/q node_modules 删除



#### PowerShell 批量重命名文件夹补零

Get-ChildItem -Directory | ForEach-Object {
    if ($_.Name -match '^(\d+)(\..+)$') {
        $newName = "{0:D3}{1}" -f [int]$matches[1], $matches[2]
        if ($_.Name -ne $newName) {
            git mv $_.Name $newName
        }
    }
}

```js
3.xxx  ->  003.xxx
4.xxx  ->  004.xxx
30.xxx ->  030.xxx
```



