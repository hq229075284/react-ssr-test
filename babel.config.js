module.exports={
    plugins:["@loadable/babel-plugin"],// `client` and `server` must need
    presets:[
        "@babel/preset-react",
        ["@babel/preset-env",{
            useBuiltIns:"usage",
            corejs:2,
            // modules:"auto",
            targets:{
                node:true,
                browsers:['last 2 versions']
            }
        }]
    ]
}