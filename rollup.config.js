import { nodeResolve } from '@rollup/plugin-node-resolve';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';

export default {
  input: 'demo/index.html',
  output: { dir: 'dist' },
  plugins: [html(), nodeResolve()],
};
