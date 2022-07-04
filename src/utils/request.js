// 通过axios来获取
const axios=require('axios')
axios.interceptors.response.use(res=>
    res.data
)
async function fetchRepoList(){
    // 可以通过配置文件,拉取不同的仓库对应的用户下的文件
    return axios.get('https://api.github.com/orgs/dartgm/repos')
}
async function fetchTagList(repo){
    console.log(`实际获取网路请求的请求${repo}`)
    return axios.get(`https://api.github.com/repos/dartgm/${repo}/tags`)
}
module.exports ={
    fetchRepoList,
    fetchTagList
}