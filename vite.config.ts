import {defineConfig} from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

// ts-prune-ignore-next
export default defineConfig({
    plugins:[tsconfigPaths()],
    test:{
        environmentMatchGlobs: [
            ['src/http/test/**','prisma']
        ]
    }
});