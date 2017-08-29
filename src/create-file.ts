import * as fs from 'fs'
import * as path from 'path'
import util from './util'
import { Package, TsConfig } from './interfaces'

export const createFile = ( filename: string, content: any ): Promise<boolean | Error> => {
    return new Promise( (resolve, reject ) => {
        fs.writeFile( filename, content, ( err ) => {
            if( err ){
                reject( err )
            }else{
                resolve( true )
            }
        })
    })
}

export const createPackage = ( pkg: Package ): Promise<boolean | Error> => {
    let content = util.createConfig( pkg )
    return createFile( path.join( process.cwd(), 'package.json' ), content )
}

export const createTsconfig = ( cfg: TsConfig ): Promise<boolean | Error> => {
    let content = util.createConfig( cfg )
    return createFile( path.join( process.cwd(), 'tsconfig.json' ), content )
}

export const createGulpfile = ( type: 'node' | 'browser' ): Promise<boolean | Error> => {
    let content
    if( type == 'node' ){
        content = fs.readFileSync( path.join( __dirname, '../src', 'gulp-for-node.js' ) )
    }else{
        content = fs.readFileSync( path.join( __dirname, '../src', 'gulp-for-browser.js' ) )
    }
    return createFile( path.join( process.cwd(), 'gulpfile.js' ), content )
}