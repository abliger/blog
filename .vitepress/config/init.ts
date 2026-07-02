async function getBilibiliZhuifanInfo() {
    const data = await fetch(
        'https://api.bilibili.com/x/space/bangumi/follow/list?vmid=16062076&type=1&pn=1&ps=24',
        {
            headers: {
                //cookie: envConfig.bilibiliCookie,
            },
        },
    )
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            return data.data.list
        })
    return data
}

export const info = {
    zhuifan: await getBilibiliZhuifanInfo(),
}
