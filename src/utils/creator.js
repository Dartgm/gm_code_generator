const inquirer = require("inquirer");
const { fetchRepoList,fetchTagList } = require("./request")
const downLoadGitRepo=require('download-git-repo') // 不支持promise
const {wrapLoading}=require('./waiting')
const util=require('util')
const path=require('path')
class Creator{
    constructor(projectName,targetDir){ // new 的时候会调用构造函数
        this.name=projectName
        this.target=targetDir
        // 这样这个方法就是一个promise方法了
        this.downLoadGitRepo=util.promisify(downLoadGitRepo)
    }
    async fetchRepo(){
        // 获取失败重新获取
        let repos=await wrapLoading(fetchRepoList,'waiting fetch template')
        if(!repos)return;
        repos=repos.map(item=>item.name)
        let repo=await inquirer.prompt({
            name: 'repo',
            type: 'list',
            choices: repos,
            message: 'please choice a template to create project'
        })
        return repo.repo
    }
    async fetchTag(repo){
        let tags=await wrapLoading(fetchTagList,'waiting fetch tag',repo)
        if(!tags)return;
        tags=tags.map(item=>item.name)
        let tag=await inquirer.prompt({
            name: 'repo',
            type: 'list',
            choices: tags,
            message: 'please choice a tag to create project'
        })
        console.log(JSON.stringify(tag))
        return tag
    }
    async download(repo,tag){
        // 1.需要先拼接出下载的路径
        let requestUrl=`dartgm/${repo}/${tag.repo?'#'+tag.repo:''}`
        // 2. 把资源下载到某个路径下面去
        // 可以使用ejs handleError去渲染模板 最后生成结果 再写入
        await this.downLoadGitRepo(requestUrl,path.resolve(process.cwd(),`${repo}@${tag.repo}`))
        return this.target
    }
    async create(){
        // 真实开始创建了
        // 1. 先去拉取当前组织下的模板
        let repo=await this.fetchRepo()
        // 2. 通过模板找到版本号
        let tag=await this.fetchTag(repo)
        // 3. 下载
        let downloadUrl=await this.download(repo,tag)
        // 4. 根据用户选择的技术进行编译
    }
}
module.exports=Creator