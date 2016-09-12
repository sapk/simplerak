// rollup.config.js
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';

export default {
  entry: 'src/main.js',
  dest: 'www/bundle.js',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    vue(),
    json(),
    buble(),
    nodeResolve({ browser: true, jsnext: true, main: true}),
    commonjs(/*{
      include: 'node_modules/**',
      sourceMap: false
    }*/),
    //uglify()
  ]
}
