# VPS 自建服务器

> - [2024年5月RackNerd优惠码、最新促销活动整理，年付不到10美元的便宜VPS - VPS GO](https://www.vpsgo.com/racknerd-coupons.html)

根据您提供的IP地址，这些服务器位于美国的亚特兰大、纽约、达拉斯、圣何塞以及阿什本。从地理位置上讲，这些城市都位于美国的东海岸或西海岸，距离中国都相当远。然而，如果我们从相对距离来看：

1. **亚特兰大 (Atlanta)** - IP: 107.173.164.160
2. **纽约 (New York)** - IP: 192.3.81.8
3. **达拉斯 (Dallas, TX)** - IP: 198.23.249.100
4. **圣何塞 (San Jose, CA)** - IP: 192.210.207.88
5. **阿什本 (Ashburn)** - IP: 107.173.166.10

从美国东海岸到西海岸，这些城市大致按照从东向西的顺序排列。然而，距离中国的远近并不是单纯由地理位置决定的，还涉及到网络路由和海底光缆的布局。

在这些选项中，阿什本（Ashburn）位于美国东海岸，靠近大西洋，理论上通过海底光缆到中国的路由可能更短一些。然而，这并不意味着阿什本的服务器就一定是离中国最近的，因为网络路由是复杂的，实际的网络延迟还取决于很多其他因素，比如服务器的网络连接质量、经过的网络节点数量、以及不同服务提供商的网络优化等。

如果需要确定哪个服务器对中国地区的用户来说响应速度最快，最直接的方法是进行实际的网络测试，比如使用ping命令测试到各个服务器的延迟时间。通常，延迟（ping时间）越低，表明服务器与中国地区的网络连接越好。不过，请注意，即使某个服务器在测试中的延迟较低，也不保证在所有时间和所有用户那里都能保持最佳性能，因为网络状况会不断变化。

为了获得更准确的信息，您可以使用专业的网络测试工具或服务，或者咨询各个VPS提供商，了解他们针对中国市场的优化情况和推荐。

![image-20240516213200708](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405162132867.png)

## 1、VPS 主机购买

> SSH 登录
>
> 注意：如果购买之后无法通过 ssh 登录，使用控制面板登录！虽然会分配一个控制面板的用户名和密码，如果之前已经有并且初始化，还是只能使用之前的那个用户名和密码！！！
>
> 通过 VNC 登录之后，更新安装包，然后下载更新 `sshd-server`！！！之后可能才能 ping 通，使用 ssh 连接！！！

服务器密码，

```
107.174.181.186
`6r6pxH1Qyu5kT2NPH1`

API key: 7a2d97549bd6b32b5b848e91ecd892f40c28f
email: 162226508@qq.com

/root/cert/racknerd.blainet.top.cer
/root/cert/racknerd.blainet.top.key
```



第一次连接很容易，但是重装之后，每次连接都要输入密码！

```bash
sudo echo "复制的 .pub 公钥内容" >> ~/.ssh/authorized_keys  # 如果没有该文件，会自动创建

ssh 127.0.0.1
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDiPyR0sfp+i5VrTSwbocXXi+2oDWdfo7hZasgqPneA79S+Y8Npv+6xSdedV3pzG7wmjv0jEucJaaOP71Gq7ZnNF/jtxVlauSDjCzz8JDUfWGDEPO5Z/2YOJbg6UXwoHsF1ogffZK6rtQWZgJuqfqCig6acn2WRIcCnZB6JCRNcf/1SLtZitA57kcb1mQb5uF4urNrT/dj89OTNus7x+SBwzfB92ZkbBR4PwcZFYvRdQTZO0sn6VI3YM8HfA4/xobrgXKeox5K8yKmifnZdQOdwjcorls7gpPYULsDG94SLWNF6zHP/SW8M32MDwKwMWMU55Mbbvp1NUd+7hcnzGUsVfPA0GIILXfvkbNVt5PKCOkljxgogxrqy3SQufc+ijsfMCGFA/XsXbin9viz6+akXr9GIeFluieT1pPW84bG9TXMx0YRUZy7henZHHAwW8eh0ek3UJ29/RjC9nLpC5/W5fFXFt27u3Ei0WqTE1IcnWLUAwdzgXtudZZQU6+H5zi0= BLAINET-ASUS" >> ~/.ssh/authorized_keys
```



如果仍然无法登录，删除客户端的 `~/.ssh/know_host*`，然后重新连接！

```bash
(base) PS C:\Users\blxie> ssh root@107.174.181.186 -p 22
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
SHA256:XWMo0Wp1qvUetmd00k4Rg2jAAEJZrjXXsAf7xzfMgE0.
Please contact your system administrator.
Add correct host key in C:\\Users\\blxie/.ssh/known_hosts to get rid of this message.
Offending RSA key in C:\\Users\\blxie/.ssh/known_hosts:1
Host key for 107.174.181.186 has changed and you have requested strict checking.
Host key verification failed.
```

![image-20230521035722926](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405151913139.png)





## 2、域名购买和解析

> - https://www.namesilo.com/account_domain_manage_dns.php

### 购买域名……

同上！

如果 namesilo 需要邮箱验证，但是一直收不到验证码，检查是否是被加入黑名单，被拦截了，

![image-20240518145642434](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405181456594.png)





### 配置域名

**方式1：自动配置**

![image-20240814230620778](C:\Users\blxie\AppData\Roaming\Typora\typora-user-images\image-20240814230620778.png)

```
anirban.ns.cloudflare.com
uma.ns.cloudflare.com
```



**方式2：手动配置，没有成功，不推荐使用！（不良林视频介绍的方法）**

![image-20230521111024742](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405151913152.png)

如果使用参考的自定义的 `DNS` 解析，需要自己设定解析规则，如下，

![image-20230521111315015](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405151913784.png)

如果之前全都已经删除，可以使用下面的 `Create a new Template` 创建新的，注意是 `3603` 的 `TTL`。

详细的设置如下，首先设置 `VPS` 的泛域名解析，

![image-20230521111708658](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405151913725.png)

另外增添一个 `7207` 的 `TTL`，

![image-20230521111957335](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405151912125.png)

==注意：上述域名解析设置之后，不会立即生效，教程中说明生效时间在 10-30 分钟内，耐心等待即可！==

`VPS` 泛域名解析成功，

![image-20230521112456958](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405151912869.png)



域名解析成功之后，对 `VPS` 服务器进行节点搭建的配置，即软件的安装！





## 3、cloudflare 注册配置





## 4、安装搭建

> - [X-UI面板进阶使用：更快、更安全、更稳定 - FranzKafka Blog (coderfan.net)](https://coderfan.net/x-ui-usage-enhancment-for-better-enhancement.html) 值得看！
>- [使用x-ui面板构建vless+reality节点-玩转Internet (caq98i.top)](https://caq98i.top/article/?page=96)
> - [在x-ui上部署Vless / Trojan Reality节点 | MisakaNo の 小破站](https://blog.misaka.rest/2023/04/08/x-ui-reality/)

一键安装命令，

```bash
107.174.181.186
pass: FUWy655wcKQq2F3oc4

apt update && apt upgrade -y
apt install curl net-tools socat -y
bash <(curl -Ls https://raw.githubusercontent.com/FranzKafkaYu/x-ui/master/install.sh)
```

**1）x-ui 设置，**

```shell
[INF] 当前面板信息[current panel info]:
面板版本[version]: 0.3.4.4:20230717
用户名[username]:
密码[userpasswd]:
监听端口[port]:
根路径[basePath]: /
```



**2）网页登录，**

```bash
http://107.174.181.186:9916/
```

第一次登录成功进入后，会随机生成一个账户

将其修改为自定义的账户名 ``，保存，重启！

![image-20230829124943661](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405151912481.png)



重新输入网址，

```bash
http://107.174.181.186:9916/blainetx/xui/setting
```



修改 xray 核心版本，更新到最新版！

![image-20230829125247992](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405151912801.png)



**3）申请证书密钥 + CloudFlare**

```bash
x-ui
	16. 一键申请SSL证书(acme申请)
	选择2
[INF] acme安装成功
[DEG] 请设置域名:
Input your domain here:racknerd.blainet.top
[DEG] 你的域名设置为:racknerd.blainet.top,正在进行域名合法性校验...
[INF] 域名合法性校验通过...
[DEG] 请设置API密钥:
Input your key here:7a2d97549bd6b32b5b848e91ecd892f40c28f
[DEG] 你的API密钥为:7a2d97549bd6b32b5b848e91ecd892f40c28f
[DEG] 请设置注册邮箱:
Input your email here:162226508@qq.com
[DEG] 你的注册邮箱为:162226508@qq.com

-----END CERTIFICATE-----
[Tue 29 Aug 2023 12:57:03 AM EDT] Your cert is in: /root/.acme.sh/racknerd.blainet.top_ecc/racknerd.blainet.top.cer
[Tue 29 Aug 2023 12:57:03 AM EDT] Your cert key is in: /root/.acme.sh/racknerd.blainet.top_ecc/racknerd.blainet.top.key
[Tue 29 Aug 2023 12:57:03 AM EDT] The intermediate CA cert is in: /root/.acme.sh/racknerd.blainet.top_ecc/ca.cer
[Tue 29 Aug 2023 12:57:03 AM EDT] And the full chain certs is there: /root/.acme.sh/racknerd.blainet.top_ecc/fullchain.cer
[INF] 证书签发成功,安装中...
[Tue 29 Aug 2023 12:57:03 AM EDT] The domain 'racknerd.blainet.top' seems to have a ECC cert already, lets use ecc cert.
[Tue 29 Aug 2023 12:57:03 AM EDT] Installing cert to: /root/cert/racknerd.blainet.top.cer
[Tue 29 Aug 2023 12:57:03 AM EDT] Installing CA to: /root/cert/ca.cer
[Tue 29 Aug 2023 12:57:03 AM EDT] Installing key to: /root/cert/racknerd.blainet.top.key
[Tue 29 Aug 2023 12:57:03 AM EDT] Installing full chain to: /root/cert/fullchain.cer
[INF] 证书安装成功,开启自动更新...
[Tue 29 Aug 2023 12:57:03 AM EDT] Already uptodate!
[Tue 29 Aug 2023 12:57:04 AM EDT] Upgrade success!
[INF] 证书已安装且已开启自动更新,具体信息如下
total 28K
drwxr-xr-x 2 root root 4.0K Aug 29 00:57 .
drwx------ 4 root root 4.0K Aug 29 00:55 ..
-rw-r--r-- 1 root root 3.7K Aug 29 00:57 ca.cer
-rw-r--r-- 1 root root 5.2K Aug 29 00:57 fullchain.cer
-rw-r--r-- 1 root root 1.6K Aug 29 00:57 racknerd.blainet.top.cer
-rw------- 1 root root  227 Aug 29 00:57 racknerd.blainet.top.key
root@racknerd-7ef59c:~#
```



**4）将以上密钥路径添加到网页端的控制面板中**

```bash
/root/cert/racknerd.blainet.top.cer
/root/cert/racknerd.blainet.top.cer
```

![image-20230829125940435](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405151912258.png)

保存配置，重启面板！

到此，就切换为 `https` 了，由于套用了 `CF`，不能通过域名直接访问！



**5）创建节点**

- vless + reality

![image-20230829130419612](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405151912837.png)



**6）使用 Warp 解锁 ChatGPT**

> - https://www.youtube.com/watch?v=b9Qeaiq2_oU
> - https://iweec.com/800.html

直接一键安装 `warp`，

```bash
# go 语言实现
wget -N https://raw.githubusercontent.com/fscarmen/warp/main/warp-go.sh && bash warp-go.sh
# wget -N https://raw.githubusercontent.com/fscarmen/warp/main/menu.sh && bash menu.sh
```

默认都选择 `IPV4` 即可！

不用重启 x-ui，安装配置后立即生效！



## 优选 IP

> - [Releases · XIU2/CloudflareSpeedTest (github.com)](https://github.com/XIU2/CloudflareSpeedTest/releases)

使用 CF，vless+tls+ws，优选 IP，





## 注意事项

### 端口

> - [Cloudflare支持的 HTTP端口及HTTPS端口 | 堕落的鱼 (duoluodeyu.com)](https://www.duoluodeyu.com/2554.html)

只要启用了 `CDN` 代理，如果使用 `CDN` 的端口，默认的 `https` 端口就只能设置为 `443/2053/2083/2087/2096/8443`



开放端口脚本 `port.sh`，如果使用的是 `reality` 协议，使用自动生成的端口名即可，即没有套用 CDN，CDN需要和 `tls-ws` 协议配合使用！

```bash
iptables -I INPUT -p tcp --dport 18742 -j ACCEPT
```

```bash
iptables -I INPUT -p tcp --dport $1 -j ACCEPT
netstat -tunl
```



### 证书

方法二仍然需要证书申请！

如果提示超过次数，不能申请了，使用子域名进行申请！

==`xray` 核心升级到最新版本！==









## 搭建案例

![image-20240525102648160](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405251026452.png)

**直接看：https://github.com/FranzKafkaYu/x-ui/wiki/%E8%8A%82%E7%82%B9%E9%85%8D%E7%BD%AE**

比较推荐的节点组合：

- Vless+reality+xtls-rprx-vision
- Vless+tls+xtls-rprx-vision
- Vmess+tls+ws(CDN)：注意，使用该方案时，还需要将域名进行手动修改：`racknerd.blainet.top`
- Vmess+tls+grpc
- Trojan+tls+grpc

个人首推使用xtls-rprx-vision的组合。



### reality + tls

> - 该方式端口随机，脚本会自动开放端口，也可以自定义端口
>
> - 最好不要使用 `xtls` 协议！





### 非常时期：cf + ws + tls

> - 注意端口只能指定为 443/8443...
> - 只要是使用了 CDN，都需要将协议改为 `ws`，ws 代表 `web socket`
>
> 纠正下错误，443 默认套用 tls，所以不设置 tls 也没关系，但是设置下还是更加安全！
>



> 参考链接：
>
> - [节点搭建系列(8)：如何不花钱提升你的节点速度？使用CF的免费CDN服务提升节点速度，bbr拥塞控制优化链路速度，CDN的原理、CF优选IP的原理，vless+ws+tls+web+cdn节点组合搭建 - YouTube](https://www.youtube.com/watch?v=Azj8-1rdF-o)

套用 CF，vless+tls+ws，但是手动将 IP 设置为 VPS IP，~~不安全~~，不推荐！



套用 CF，vless+tls+ws，使用代理的域名！



使用 CF，vless+tls+ws，优选 IP，



![image-20230518171321403](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405151912915.png)





## 相关错误（使用不了等问题）

测试有速度，但就是访问不了网站：https://v2xtls.org/%e8%bf%91%e6%9c%9f%e4%b8%80%e4%ba%9b%e7%8e%b0%e8%b1%a1%e7%9a%84%e6%8f%90%e7%a4%ba/

重新创建新的 基于 ws 的节点！



### 使用不了谷歌学术/ChatGPT

> - [P3TERX/warp.sh: Cloudflare WARP Installer | WARP 一键安装脚本](https://github.com/P3TERX/warp.sh)
> - [Cloudflare WARP 一键安装脚本 使用教程 - P3TERX ZONE](https://p3terx.com/archives/cloudflare-warp-configuration-script.html)

开启双栈（IPv4/IPv6）warp，

```bash
bash <(curl -fsSL git.io/warp.sh) d
```

不用重启啥的，运行之后直接立马生效！

最终效果，

![image-20240118144131925](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405151912060.png)



但是存在一个问题：套用 warp 之后，网速下降了很多！这个问题需要解决！！！

- 使用 cloudflare 优选可能会是一个方案？

- 套了warp之后v2rayn测试速度可能是0，但是实际使用的YouTube网速在正常范围内！

  ![image-20240119140045697](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405151912366.png)

- 延迟正常，可以正常使用就行~

  ![image-20240119140020676](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405151912853.png)







## 优化 VPS: Hysteria2

> - 视频教程：https://www.youtube.com/watch?v=CXj-ID33MhU
> - 文字教程：https://bulianglin.com/archives/hysteria2.html

> 第一步：服务端相关操作设置

安装脚本，

```bash
# 一键安装 Hysteria2
bash <(curl -fsSL https://get.hy2.sh/)

# 生成自签证书
# openssl req -x509 -nodes -newkey ec:<(openssl ecparam -name prime256v1) -keyout /etc/hysteria/server.key -out /etc/hysteria/server.crt -subj "/CN=bing.com" -days 36500 && sudo chown hysteria /etc/hysteria/server.key && sudo chown hysteria /etc/hysteria/server.crt

openssl req -x509 -nodes -newkey ec:<(openssl ecparam -name prime256v1) -keyout /etc/hysteria/server.key -out /etc/hysteria/server.crt -subj "/CN=bing.com" -days 36500 && chown hysteria /etc/hysteria/server.key && chown hysteria /etc/hysteria/server.crt
```



添加以下配置文件（直接在命令行执行就行），

```bash
cat << EOF > /etc/hysteria/config.yaml
listen: :443 # 监听端口

# 使用CA证书
acme:
  domains:
    - racknerd.blainet.top # 你的域名，需要先解析到服务器ip
  email: test@blainet.top

#使用自签证书
#tls:
#  cert: /etc/hysteria/server.crt
#  key: /etc/hysteria/server.key

auth:
  type: password
  password: 123456 # 设置认证密码

masquerade:
  type: proxy
  proxy:
    url: https://bing.com # 伪装网址
    rewriteHost: true
EOF
```



继续执行以下命令（start/restart 命令），

```bash
# 启动Hysteria2
systemctl start hysteria-server.service
# 重启Hysteria2
systemctl restart hysteria-server.service
# 查看Hysteria2状态
systemctl status hysteria-server.service
#停止Hysteria2
systemctl stop hysteria-server.service
#设置开机自启
systemctl enable hysteria-server.service
#查看日志
journalctl -u hysteria-server.service
```

出现 `server up and running` 就表示成功了！



> 第二步：Windows 客户端配置

下载 `zz` 开头的 v2rayn: [zz_v2rayN-With-Core-SelfContained.7z](https://github.hscsec.cn/2dust/v2rayN/releases/download/6.24/zz_v2rayN-With-Core-SelfContained.7z)

下载 Hysteria2：[hysteria-windows-amd64.exe](https://github.com/apernet/hysteria/releases/download/app%2Fv2.0.2/hysteria-windows-amd64.exe)

将下载的 `hysteria-windows-amd64.exe` 替换掉 `zz/bin` 中的源文件，



客户端配置文件，将其复制到一个新建的配置文件中 `hysteria2.txt`，

```yaml
server: 107.174.181.186:443 # ip:port
auth: 123456 # passwd

bandwidth:
  up: 20 mbps #
  down: 60 mbps #

tls:
  sni: racknerd.blainet.top # ca证书域名
  insecure: false # 使用自签时需要改成true

socks5:
  listen: 127.0.0.1:1080
http:
  listen: 127.0.0.1:8080
```



在 `v2rayn` 中新增一个自定义配置的服务器，

![image-20230917190434184](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405151912767.png)

完毕~

实际操作下来并没有感觉有多大提升，可能是哪里没有操作正确。





# 代理使用

## 浏览器插件：SwitchyOmega

```yaml
https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt

# 选择 域名通配符/域名正则
*zlibrary*|*github*|*typoraio*|*snip*|*monica*
.*openai\.com|.*arxiv\.org
```

![image-20230905090319781](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405151911355.png)



您可以在 SwitchyOmega 的“自动切换”模式下添加多个切换条件。例如，如果您想要过滤 openai.com, arxiv.com, github.com 等网站，您可以添加一个新的切换条件，选择**域名正则**，然后在“条件”字段中输入`.*openai\.com|.*arxiv\.org|.*github\.com|bing.com`，并选择您想要使用的代理服务器。

> Learn more: [1. github.com](https://github.com/FelisCatus/SwitchyOmega/wiki/SwitchyOmega-conditions-format) [2. github.com](https://github.com/FelisCatus/SwitchyOmega/wiki/RuleListUsage) [3. github.com](https://github.com/FelisCatus/SwitchyOmega/issues/71)







## 终端代理

- 环境变量中进行配置
- `pwsh --- powershell` 设置

在 Windows 终端中设置代理，可以使用 `set` 命令或者在终端配置文件中进行设置。以下是两种常见的方法：

### 方法一：使用 set 命令设置代理

1. 打开 Windows 终端。

2. 使用以下命令设置 HTTP 代理：

   ```
   set http_proxy=http://proxy-server-ip:port
   ```

   将 `proxy-server-ip` 替换为代理服务器的 IP 地址，将 `port` 替换为代理服务器的端口号。

3. 使用以下命令设置 HTTPS 代理：

   ```
   set https_proxy=http://proxy-server-ip:port
   ```

   同样，将 `proxy-server-ip` 替换为代理服务器的 IP 地址，将 `port` 替换为代理服务器的端口号。

4. 如果代理服务器需要身份验证，可以使用以下命令设置用户名和密码：

   ```
   set http_proxy=http://username:password@proxy-server-ip:port
   set https_proxy=http://username:password@proxy-server-ip:port
   ```

   将 `username` 和 `password` 替换为代理服务器的用户名和密码。



### 方法二：在终端配置文件中设置代理

1. 打开 Windows 终端。

2. 找到终端的配置文件，可以是 `~/.bashrc`、`~/.bash_profile` 或者 `~/.zshrc`（根据你使用的终端类型而定）。

3. 使用文本编辑器打开配置文件，并添加以下内容：

   ```
   export http_proxy=http://proxy-server-ip:port
   export https_proxy=http://proxy-server-ip:port
   ```

   将 `proxy-server-ip` 替换为代理服务器的 IP 地址，将 `port` 替换为代理服务器的端口号。

4. 如果代理服务器需要身份验证，可以添加以下内容：

   ```
   export http_proxy=http://username:password@proxy-server-ip:port
   export https_proxy=http://username:password@proxy-server-ip:port
   ```

   将 `username` 和 `password` 替换为代理服务器的用户名和密码。

5. 保存配置文件并重新启动终端，或者执行以下命令使配置文件生效：

   ```
   source ~/.bashrc
   ```

   如果你的配置文件是其他名称，相应地修改命令。

这样设置后，Windows 终端会通过代理服务器进行网络请求。请确保代理服务器的地址和端口号正确，并根据需要进行身份验证的设置。



> Windows 下，powershell 终端设置

```powershell
# 临时设置终端代理，一般设置 http 代理即可
$env:HTTP_PROXY = "http://127.0.0.1:7890"
$env:HTTP_PROXY = "http://127.0.0.1:10809"
```





## WARP 搭建使用

> - [免费无限流量，配置Cloudflare warp+/zero truse从此告别机场 - YouTube](https://www.youtube.com/watch?v=YJjQnwSgIoY)
> - [配置Warp无限流量上网 (clarkfree.com)](https://www.clarkfree.com/archives/1685536644603)
> - [1.1.1.1 — The free app that makes your Internet faster.](https://1.1.1.1/)





## WireGuard

> - [Installation - WireGuard](https://www.wireguard.com/install/)
> - [WireGuard for Windows Downloads](https://download.wireguard.com/windows-client/)  如果没有网络，在这里下载 `amd64.exe` 格式







## Clash for Windows

> - [[Bug]: 关闭system proxy后，依然消耗节点流量 · Issue #3364 · Fndroid/clash_for_windows_pkg](https://github.com/Fndroid/clash_for_windows_pkg/issues/3364)
>
>   解决方案，
>
>   1. 关闭 `General -- Allow LAN/TUN`
>
>   2. 删除 `~/.local/clash` 文件夹，重新导入配置文件
>
>   提示，
>
>   - 可通过 `Connections` 查看具体是哪些连接在使用流量
>   - 可通过 `Logs` 查看连接详细信息



### 转为 Clash 订阅

> - 订阅转换工具下载：[Releases · tindy2013/subconverter (github.com)](https://github.com/tindy2013/subconverter/releases)
> - 在线订阅转换：[ACL4SSR 在线订阅转换 (acl4ssr-sub.github.io)](https://acl4ssr-sub.github.io/)
> - 官方文档：[tindy2013/subconverter: Utility to convert between various subscription format (github.com)](https://github.com/tindy2013/subconverter/tree/master)
> - clash节点转换v2ray：[解决订阅转换节点被盗用和无法转换大量节点，本地订阅转换教程，v2ray转clash，clash转v2ray，各种格式通用转换，节点格式转换，方便快捷 - YouTube](https://www.youtube.com/watch?v=UxvjT_nHLo4)
> - 本地转换：[本地节点订阅转换，杜绝在线转换节点信息被盗取 - 科学上网 技术分享 (bulianglin.com)](https://bulianglin.com/archives/51.html)



目前来看，只支持 `vmess` 格式的节点，并不支持 `vless` 格式的订阅连接！

操作方式，

（1）运行 `subconverter.exe` 程序

（2）打开 `https://acl4ssr-sub.github.io/` 转换网站，选择 `本地转换 25500`

![image-20230905094357324](https://raw.githubusercontent.com/blxie/mkdpic/main/vpn/202405151911924.png)





### 免费节点

 免费节点验证于 2023-03-27 ，

https://git.io/emzclash

https://tt.vg/freeclash

https://sub.sharecentre.online/sub

https://sub.pmsub.me/clash.yaml

https://sub.cloudflare.quest





