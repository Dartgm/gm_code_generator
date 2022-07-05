module.exports={
    root: true,
    parser: "babel-eslint", // 需要一个解析器 解析源代码到抽象语法树
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2015
    },
    env: {
        browser: true
    },
    rules: {
        "indent":["error",4], // 缩进风格
        "quotes":"off", // 引号类型
        "no-console": "off",
        "no-debugger": "off"
    }
}