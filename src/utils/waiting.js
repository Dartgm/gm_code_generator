const ora=require('ora')
async function sleep(n){
    return new Promise((resolve,reject)=>setTimeout(resolve,n))
}

async function wrapLoading(fn,message,...args){
    const spinner=ora(message)
    spinner.start() // 开启加载
    try{
        let repos=await fn(args[0])
        spinner.succeed()
        return repos
    }catch(e){
        spinner.fail(`request failed,refetch,${args[0]} not found`)
        return wrapLoading(fn,message,...args)
    }
}
module.exports={
    sleep,
    wrapLoading
}