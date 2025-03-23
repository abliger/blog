# JNDI

JNDI(Java Naming and Directory Interface,Java命名和目录接口)是[SUN公司](https://baike.baidu.com/item/SUN公司 "SUN公司")提供的一种标准的Java命名系统接口，JNDI提供统一的[客户端](https://baike.baidu.com/item/客户端/101081 "客户端")API，通过不同的访问提供者接口JNDI服务供应接口(SPI)的实现，由管理者将JNDI API映射为特定的命名服务和目录系统，使得Java[应用程序](https://baike.baidu.com/item/应用程序/5985445 "应用程序")可以和这些命名服务和[目录服务](https://baike.baidu.com/item/目录服务/10413830 "目录服务")之间进行交互。[目录服务](https://baike.baidu.com/item/目录服务/10413830 "目录服务")是命名服务的一种自然扩展。两者之间的关键差别是目录服务中[对象](https://baike.baidu.com/item/对象/17158 "对象")不但可以有名称还可以有属性（例如，用户有email地址），而命名服务中[对象](https://baike.baidu.com/item/对象/17158 "对象")没有属性 \[1]   。

集群JNDI实现了高可靠性JNDI，通过服务器的集群，保证了JNDI的负载平衡和错误恢复。在全局共享的方式下，集群中的一个[应用服务器](https://baike.baidu.com/item/应用服务器/4971773 "应用服务器")保证本地JNDI树的独立性，并拥有全局的JNDI树。每个[应用服务器](https://baike.baidu.com/item/应用服务器/4971773 "应用服务器")在把部署的服务[对象](https://baike.baidu.com/item/对象/17158 "对象")绑定到自己本地的JNDI树的同时，还绑定到一个共享的全局JNDI树，实现全局JNDI和自身JNDI的联系。

JNDI(Java Naming and Directory Interface)是一个[应用程序](https://baike.baidu.com/item/应用程序 "应用程序")设计的API，为开发人员提供了查找和访问各种命名和[目录服务](https://baike.baidu.com/item/目录服务/10413830 "目录服务")的通用、统一的接口，类似JDBC都是构建在抽象层上。现在JNDI已经成为J2EE的标准之一，所有的J2EE容器都必须提供一个JNDI的服务。

JNDI可访问的现有的目录及服务有：

DNS、XNam 、Novell[目录服务](https://baike.baidu.com/item/目录服务 "目录服务")、LDAP(Lightweight Directory Access Protocol[轻型目录访问协议](https://baike.baidu.com/item/轻型目录访问协议/10493115 "轻型目录访问协议"))、 CORBA[对象](https://baike.baidu.com/item/对象/17158 "对象")服务、文件系统、Windows XP/2000/NT/Me/9x的[注册表](https://baike.baidu.com/item/注册表/101856 "注册表")、RMI、DSML v1\&v2、NIS。
