const path=require('path')
const fs=require('fs-extra')
var Inquirer = require('inquirer');
const Creator =require('../utils/creator')
module.exports=async function(projectName,options){
    // 创建项目
    const cwd=process.cwd()
    const targetDir=path.join(cwd,projectName)
    if(fs.existsSync(targetDir)){
        if(options.force){
            await fs.remove(targetDir)
        }else{
            // 确定用户是否要覆盖
            let {action}=Inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: 'Target directory already exists Pick an action',
                    choices: [
                        {
                            name: 'Overwrite',
                            value: 'overwrite'
                        },
                        {
                            name: 'Cancel',
                            value: 'cancel'
                        }
                    ]
                }
            ])
            if(!action){
                return
            }else if(action==='overwrite'){
                console.log("\r\nRemoving....")
                await fs.remove(targetDir)
            }
        }
    }
    // 创建项目
    const creator=new Creator(projectName,targetDir)
    creator.create() // 开始创建项目
}