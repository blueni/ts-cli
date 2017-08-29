import * as readline from 'readline'

type ReadLine = readline.ReadLine

export default class ReadlineHelper{
    rl: ReadLine

    constructor( rl: ReadLine ){
        this.rl = rl
    }

    newline(): void{
        this.rl.write( '\n' )
    }

    question( question: string, callback: ( answer: string ) => void ): Promise<undefined>{
        return new Promise( resolve => {
            this.rl.question( question, ( answer: string ) => {
                callback( answer )
                resolve()
            })
        })
    }

    select( question: string, options: string[] ): Promise<number>{
        let rl  = this.rl
        let { output, input } = rl
        let len = options.length
        let lastItem = ''
        let current = 0

        rl.write( `${question}(${'上下方向键选择，enter键确定'.cyan})` )
        this.newline()

        const _getStrLength = ( str: string ): number => {            
            return str.replace( /[\u4e00-\u9fa5]/g, ' ' ).length
        }

        const _list = ( num: number = 0 ): void => {
            if( lastItem ){
                readline.moveCursor( output, -_getStrLength( lastItem ), -len )
                readline.clearScreenDown( output )
            }
            
            lastItem = ''
            options.forEach( ( item, index ) => {
                item = '> ' + item
                item = index == num ? item.green : item
                rl.write( item + '\n' )
                lastItem = item
            })
        }

        _list()
        
        return new Promise( resolve => {
            input.on( 'keypress', function _handleKeypress( ch: any, key: any ){
                switch( <string>key.name ){
                    case 'up': 
                        current = current > 0 ? current - 1 : 0 
                        _list( current )
                        break
                    
                    case 'down':
                        current = current < len - 1 ? current + 1 : current
                        _list( current )
                        break

                    case 'return':
                    case 'enter':
                        resolve( current )
                }                
            })
        })
    }


}