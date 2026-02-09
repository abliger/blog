# mqtt 协议

MQTT 是一个轻量的发布订阅模式消息传输协议，专门针对低带宽和不稳定网络环境的物联网应用设计。

特点:
1. 开放消息协议，简单易实现
2. 发布订阅模式，一对多消息发布
3. 基于 TCP/IP 网络连接
4. 1 字节固定报头，2 字节心跳报文，报文结构紧凑
6. 消息 QoS 支持，可靠传输保证


## MQTT 基于主题(Topic)消息路由

MQTT 协议基于主题(Topic)进行消息路由，主题(Topic)类似 URL 路径，例如:

```txt
chat/room/1
sensor/10/temperature
sensor/+/temperature
$SYS/broker/metrics/packets/received
$SYS/broker/metrics/#
```
主题(Topic)通过'/'分割层级，支持'+', '#'通配符:

'+': 表示通配一个层级，例如`a/+`，匹配`a/x, a/y`

'#': 表示通配多个层级，例如`a/#`，匹配`a/x, a/b/c/d`

## MQTT 消息 QoS

MQTT 发布消息 QoS 保证不是端到端的，是客户端与服务器之间的。订阅者收到 MQTT 消息的 QoS 级别，最终取决于发布消息的 QoS 和主题订阅的 QoS。

|发布消息的 QoS	|主题订阅的 QoS	|接收消息的 QoS|
|---|---|---|
|0	|0|	0|
|0	|1|	0|
|0	|2|	0|
|1	|0|	0|
|1	|1|	1|
|1	|2|	1|
|2	|0|	0|
|2	|1|	1|
|2	|2|	2|

qos 0 只发送一次不保证送到
qos 1 保证收到,但不保证只发送一次
qos 2 保证只发送一次且能收到

## 使用程序链接 mqtt 服务器

注意: 链接 mqtt 使用账号密码保证链接的私密性.而**clientId需要保证在服务器中的唯一性**.

```js
const mqtt = require('mqtt');

// MQTT服务器的地址
const url = 'mqtt://broker.example.com:1883';

// 创建客户端实例，传递clientId, username和password
const client = mqtt.connect(url, {
    clientId: 'my-client-id',
    username: 'my-username',
    password: 'my-password'
});

// 连接成功回调
client.on('connect', function () {
    console.log('Connected to MQTT broker');
    // 你可以在这里订阅主题或者发布消息
    client.subscribe('some/topic', function (err) {
        if (err) {
            console.error('Subscription error:', err);
        } else {
            console.log('Subscribed to topic');
        }
    });
});

// 连接错误回调
client.on('error', function (error) {
    console.error('Connection error:', error);
});

// 收到消息的回调
client.on('message', function (topic, message) {
    // 消息格式通常是Buffer，需要转换为字符串（或其它格式）来处理
    console.log(topic, message.toString());
});
```

## MQTT V3.1.1 协议报文

报文结构
固定报头(Fixed header)
可变报头(Variable header)
报文有效载荷(Payload)

固定报头

```txt
+----------+-----+-----+-----+-----+-----+-----+-----+-----+
| Bit      |  7  |  6  |  5  |  4  |  3  |  2  |  1  |  0  |
+----------+-----+-----+-----+-----+-----+-----+-----+-----+
| byte1    |   MQTT Packet type    |         Flags         |
+----------+-----------------------+-----------------------+
| byte2... |   Remaining Length                            |
+----------+-----------------------------------------------+
```

## mqtt 服务和链接程序

1. [emqx](https://docs.emqx.com/zh/emqx/v1.0/getstarted.html)
2. Mosquitto
3. VerneMq
4. RabbitMq 插件支持
5. ActiveMq
6. RocketMQ
### 链接程序

1. [MQTTX](https://mqttx.app/zh)
