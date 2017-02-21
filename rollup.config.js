// rollup.config.js
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
//import uglify from 'rollup-plugin-uglify';
import json from 'rollup-plugin-json';

export default {
  entry: 'src/main.js',
  dest: 'www/bundle.js',
  //sourceMap: true,
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    nodeResolve({ browser: true, jsnext: true, main: true}),
    commonjs({
      include: 'node_modules/**'
    }),
    vue(),
    json(),
    buble({ exclude: 'node_modules/**' }),
    //uglify()
  ]
}
