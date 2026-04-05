/**
 * svelte-mobile-ui 构建脚本
 * 输出 ESM (.mjs) / CJS (.cjs) / IIFE (.iife.js) + CSS + 类型声明
 */
import esbuild from 'esbuild'
import { compile, preprocess } from 'svelte/compiler'
import { transform } from 'esbuild'
import * as sass from 'sass'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const ENTRY = path.join(ROOT, 'index.ts')

/** esbuild 插件：编译 .svelte 文件 */
function sveltePlugin() {
    return {
        name: 'svelte',
        setup(build) {
            build.onResolve({ filter: /\.svelte$/ }, (args) => ({
                path: path.isAbsolute(args.path)
                    ? args.path
                    : path.resolve(args.resolveDir, args.path),
                namespace: 'file',
            }))

            build.onLoad({ filter: /\.svelte$/ }, async (args) => {
                const source = fs.readFileSync(args.path, 'utf-8')
                const filename = args.path

                const preprocessed = await preprocess(source, [
                    {
                        script: async ({ content, attributes }) => {
                            if (attributes.lang !== 'ts') return
                            const result = await transform(content, {
                                loader: 'ts',
                                tsconfigRaw: '{ "compilerOptions": { "verbatimModuleSyntax": true } }',
                            })
                            return { code: result.code }
                        },
                    },
                    {
                        style: ({ content, attributes }) => {
                            if (attributes.lang !== 'scss') return
                            const result = sass.compileString(content, {
                                loadPaths: [path.dirname(filename)],
                            })
                            return { code: result.css }
                        },
                    },
                ], { filename })

                const compiled = compile(preprocessed.code, {
                    filename,
                    generate: 'client',
                    css: 'injected',
                    runes: true,
                    dev: false,
                })

                // 过滤 a11y 和常见组件库警告
                for (const warning of compiled.warnings) {
                    if (warning.code?.startsWith('a11y_') || warning.code === 'state_referenced_locally') continue
                    console.warn(`[svelte] ${filename}: ${warning.message}`)
                }

                return {
                    contents: compiled.js.code,
                    loader: 'js',
                    resolveDir: path.dirname(args.path),
                }
            })
        },
    }
}

/** esbuild 插件：编译 .scss 文件 */
function scssPlugin() {
    return {
        name: 'scss',
        setup(build) {
            build.onResolve({ filter: /\.scss$/ }, (args) => ({
                path: path.isAbsolute(args.path)
                    ? args.path
                    : path.resolve(args.resolveDir, args.path),
                namespace: 'file',
            }))

            build.onLoad({ filter: /\.scss$/ }, (args) => {
                const result = sass.compile(args.path, {
                    loadPaths: [path.dirname(args.path)],
                })
                return {
                    contents: result.css,
                    loader: 'css',
                    resolveDir: path.dirname(args.path),
                }
            })
        },
    }
}

// 清空 dist 目录
if (fs.existsSync(DIST)) {
    fs.rmSync(DIST, { recursive: true })
}
fs.mkdirSync(DIST, { recursive: true })

// 公共配置
const commonOptions = {
    entryPoints: [ENTRY],
    bundle: true,
    plugins: [sveltePlugin(), scssPlugin()],
    external: ['svelte', 'svelte/*'],
    minify: true,
    target: 'esnext',
    logLevel: 'info',
}

console.log('🔨 开始构建 svelte-mobile-ui...\n')

// 1. ESM 格式
console.log('📦 构建 ESM (.mjs)...')
await esbuild.build({
    ...commonOptions,
    format: 'esm',
    outfile: path.join(DIST, 'svelte-mobile-ui.mjs'),
    splitting: false,
})

// 2. CJS 格式
console.log('📦 构建 CJS (.cjs)...')
await esbuild.build({
    ...commonOptions,
    format: 'cjs',
    outfile: path.join(DIST, 'svelte-mobile-ui.cjs'),
})

// 3. IIFE 格式 (CDN)
console.log('📦 构建 IIFE (.iife.js)...')
await esbuild.build({
    ...commonOptions,
    format: 'iife',
    globalName: 'SvelteMobileUI',
    outfile: path.join(DIST, 'svelte-mobile-ui.iife.js'),
    external: [],
})

// 4. 单独编译 CSS（全局样式）
console.log('📦 构建 CSS...')
const cssResult = sass.compile(path.join(ROOT, 'styles', 'index.scss'), {
    style: 'compressed',
    loadPaths: [path.join(ROOT, 'styles')],
})
fs.writeFileSync(path.join(DIST, 'styles.css'), cssResult.css)

// 5. 复制类型声明
console.log('📦 复制类型声明...')
const typesDir = path.join(DIST, 'types')
fs.mkdirSync(typesDir, { recursive: true })

const utilsSrc = path.join(ROOT, 'utils')
for (const file of fs.readdirSync(utilsSrc)) {
    if (file.endsWith('.ts')) {
        fs.copyFileSync(path.join(utilsSrc, file), path.join(typesDir, file))
    }
}

// 输出构建结果
console.log('\n✅ 构建完成！输出目录: dist/')
const files = fs.readdirSync(DIST).filter(f => !fs.statSync(path.join(DIST, f)).isDirectory())
for (const file of files) {
    const size = fs.statSync(path.join(DIST, file)).size
    const sizeKB = (size / 1024).toFixed(1)
    console.log(`  ${file} — ${sizeKB} KB`)
}
