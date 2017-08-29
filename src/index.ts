import './colorful'
import * as fs from 'fs'
import * as readline from 'readline'
import * as path from 'path'
import { createPackage, createTsconfig, createGulpfile } from './create-file'
import { Package, TsConfig } from './interfaces'
import ReadlineHelper from './readline-helper'

const { stdout, stdin } = process

const rl = readline.createInterface({
    input: stdin,
    output: stdout
})

const rlHelper = new ReadlineHelper( rl )

let dirArr = process.cwd().replace( /[\\\/]$/, '' ).split( /[\\\/]/ )
let projectName = dirArr.pop()
let projectEnv: 'node' | 'browser'
let pkg: Package = {
    name: projectName,
    version: 'v1.0.0',
}
let tsCfg: TsConfig = {
    compilerOptions: {
        noImplicitAny: true,
        noResolve: true
    }
}

// 创建 package.json文件

console.log( '配置package.json...'.magenta )
rlHelper.newline()

rlHelper.question( `项目名称：(${pkg.name})`, ( name ) => {
    if( name ){
        pkg.name = name
    }
})
.then( () => {
    return rlHelper.question( `项目版本：(${pkg.version})`, ( version ) => {
        if( version ){
            pkg.version = version
        }    
    })
})
.then( () => {
    return rlHelper.question( '项目描述：', ( description ) => {
        pkg.description = description || ''
    })
})
.then( () => {
    return rlHelper.question( '作者：', ( author ) => {
        if( author ){
            pkg.author = author
        }    
    })
})
.then( () => {    
    rlHelper.newline()
    console.log( 'package.json文件配置完成'.magenta )
    rlHelper.newline()
})

// 创建 tsconfig.json 文件
.then( () => {
    console.log( '配置tsconfig.json...'.magenta )
    rlHelper.newline()
})
.then( () => {
    let targets = [ 'es3', 'es5', 'es6', 'es2016', 'es2017', 'exnext' ]
    return rlHelper.select( '生成js版本：', targets.map( v => v.toUpperCase() ) )
                .then( ( index ) => {
                    tsCfg.compilerOptions.target = targets[index]
                })
})
.then( () => {
    let rules = [ 'none', 'commonjs', 'amd', 'umd', 'system', 'es2015', 'exnext' ]
    return rlHelper.select( '生成js模块规范：', rules.map( v => v.toUpperCase() ) )
                .then( ( index ) => {
                    let rule = rules[index]
                    if( rule == 'commonjs' ){
                        projectEnv = 'node'
                    }
                    tsCfg.compilerOptions.module = rule
                })
})
.then( () => {
    console.log( 'tsconfig.json文件配置完成'.magenta )

    if( projectEnv == 'node' ){
        pkg.devDependencies = {
            "@types/node": "7.0.42",
            "gulp": "^3.9.1",
            "typescript": "^2.4.2",
            "gulp-typescript": "^3.2.2",
        }
    }else{
        pkg.devDependencies = {
            "gulp": "^3.9.1",
            "browserify": "^14.4.0",
            "tsify": "^3.0.1",
            "typescript": "^2.4.2",
            "vinyl-source-stream": "^1.1.0",
        }
    }

    console.log( '创建src目录...' )
    if( !fs.existsSync( path.resolve( process.cwd(), 'src' ) ) ){
        fs.mkdirSync( path.resolve( process.cwd(), 'src' ) )
    }    
})
.then( () => {            
    console.log( '创建package.json文件...' )
    return createPackage( pkg )
})
.then( () => {
    console.log( '创建tsconfig.json文件...' )
    return createTsconfig( tsCfg )
})
.then( () => {
    console.log( '创建gulpfile.js文件...' )
    return createGulpfile( projectEnv )
})
.then( () => {
    rl.close()
})
