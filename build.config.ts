import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    entries: ['bin/index', 'lib/index'],
    clean: true,
    declaration: true,
    rollup: {
        emitCJS: true,
        esbuild: {
            minify: true,
        },
    },
})
