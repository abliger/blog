

// 使用示例
(async () => {
    try {
        const message = await launchEditor('# 请输入提交信息（以#开头的行将被忽略）\n');
        console.log('\n提交信息：\n', message.replace(/#.*\n?/g, ''));
    } catch (err) {
        console.error('发生错误:', err);
    }
})();
