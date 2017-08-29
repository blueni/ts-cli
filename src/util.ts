import { StringObj } from './interfaces'

export default {
    
    createProperty( key: string, value: any, num: number = 1 ): string{
        if( !value ){
            return ''
        }
        let tab = '\t'.repeat( num )        
        if( value === true || value === false || !isNaN( value ) ){
            return `${tab}"${key}": ${value.toString()},`
        }
        return `${tab}"${key}": "${value}",`
    },
    
    createArray( key: string, arr: string[], num: number = 1 ): string{
        if( arr ){
            let tab = '\t'.repeat( num )
            let str = `${tab}"${key}": [\n`
            for( let value of arr ){
                str += `"${value}",`
            }
            str = this.rtrim( str )
            return str += `\n${tab}],`
        }
        return ''
    },

    createJson( key: string, json: StringObj, num: number = 1 ): string{
        if( json ){
            let tab = '\t'.repeat( num )
            let str = `${tab}"${key}": {\n`
            for( let key in json ){
                str += this.createProperty( key, json[key], num + 1 ) + '\n'
            }
            str = this.rtrim( str )
            return str += `\n${tab}},`
        }
        return ''
    },

    createConfig<T>( config: T ): string{
        if( !config ){
            return ''
        }
        let content = '{\n'
        for( let key in config ){
            if( typeof config[key] === 'string' ){
                content += this.createProperty( key, config[key] )
            }else if( Array.isArray( config[key] ) ){
                content += this.createArray( key, config[key] )
            }else{
                content += this.createJson( key, config[key] )
            }
            content += '\n'
        }
        content = this.rtrim( content )
        content += '\n}'
        return content.replace( /[\r\n]+/g, '\n' )
    },

    rtrim( str: string, endSymbol: string = ',' ): string{
        return str.replace( new RegExp( endSymbol + '*\\s*$', 'g' ), '' )
    },

}