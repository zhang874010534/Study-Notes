### cookie 知道吗？有哪些字段？

- 由于 HTTP 是无状态的，为了在服务端与客户端之间做状态保持，cookie 应运而生。cookie 本质是一份在服务端与客户端之间传输的文本片段，其中保存了一些客户端的状态信息，方便服务端读取并进行其他操作。
- **Name**：键名。
- **Value**：键值。
- **Domain**：能够携带该键值对的域名，开头为 `.` 则表示其子域名也可携带。
- Path：能够携带该键值对的文件路径。
- **Expires/Max-Age**：cookie 过期时间的时间戳，超时则自动删除。
- Size：cookie 大小。
- **HttpOnly**：禁止 JavaScript 对 cookie 进行读取和修改。
- **Secure**：仅允许在 HTTPS 中传输。
- SameSite：禁止某些请求中携带 cookie，值为 `None` `Lax` `Strict` 。值为 `None` 时，任何请求都可以携带该 cookie；值为 `Lax` 时，部分跨站请求无法发送该 cookie（仅 `a` `link` `GET` 请求可以携带）；值为 `Strict` 时，所有跨站请求都无法发送该 cookie，仅同站请求允许。（Chrome 80 版本前默认值都为 `None` ，80 版本后默认值变成了 `Lax` ，WWDC 2020 上 Safari 的新版本也由 `None` 改为了 `Lax` ）