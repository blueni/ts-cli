export interface StringObj{
    [key: string]: string
}

export interface Package{
    name?: string
    author?: string
    version?: string
    description?: string
    main?: string
    licence?: string
    scripts?: StringObj
    dependencies?: StringObj
    devDependencies?: StringObj
    [key: string]: any
}

interface MapLike<T> {
    [index: string]: T
}

interface CompilerOptions {
    allowJs?: boolean
    allowSyntheticDefaultImports?: boolean
    allowUnreachableCode?: boolean
    allowUnusedLabels?: boolean
    alwaysStrict?: boolean
    baseUrl?: string
    charset?: string
    checkJs?: boolean
    declaration?: boolean
    declarationDir?: string
    disableSizeLimit?: boolean
    downlevelIteration?: boolean
    emitBOM?: boolean
    emitDecoratorMetadata?: boolean
    experimentalDecorators?: boolean
    forceConsistentCasingInFileNames?: boolean
    importHelpers?: boolean
    inlineSourceMap?: boolean
    inlineSources?: boolean
    isolatedModules?: boolean
    lib?: string[]
    locale?: string
    mapRoot?: string
    maxNodeModuleJsDepth?: number
    module?: string
    moduleResolution?: number
    newLine?: number
    noEmit?: boolean
    noEmitHelpers?: boolean
    noEmitOnError?: boolean
    noErrorTruncation?: boolean
    noFallthroughCasesInSwitch?: boolean
    noImplicitAny?: boolean
    noImplicitReturns?: boolean
    noImplicitThis?: boolean
    noStrictGenericChecks?: boolean
    noUnusedLocals?: boolean
    noUnusedParameters?: boolean
    noImplicitUseStrict?: boolean
    noLib?: boolean
    noResolve?: boolean
    out?: string
    outDir?: string
    outFile?: string
    paths?: MapLike<string[]>
    preserveConstEnums?: boolean
    project?: string
    reactNamespace?: string
    jsxFactory?: string
    removeComments?: boolean
    rootDir?: string
    rootDirs?: string[]
    skipLibCheck?: boolean
    skipDefaultLibCheck?: boolean
    sourceMap?: boolean
    sourceRoot?: string
    strict?: boolean
    strictNullChecks?: boolean
    suppressExcessPropertyErrors?: boolean
    suppressImplicitAnyIndexErrors?: boolean
    target?: string
    traceResolution?: boolean
    types?: string[]
    typeRoots?: string[]
    [option: string]: any
}

export interface TsConfig{
    files?: string[]
    compilerOptions?: CompilerOptions
    [option: string]: any
}