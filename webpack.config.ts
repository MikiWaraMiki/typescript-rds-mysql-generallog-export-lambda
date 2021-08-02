import * as webpack from 'webpack'
import { resolve } from 'path'
import { sync } from 'glob'

const SRC_PATH = resolve(__dirname, './src/')
const ENTRY_NAME = 'index.ts'
const BUILD_PATH = resolve(__dirname, './dist')
const BUILD_VARIANT = process.env.NODE_ENV

const resolveEntry = (): webpack.Entry => {
  const entries: { [key: string]: string } = {}
  const targets: string[] = sync(`${SRC_PATH}/${ENTRY_NAME}`)
  const pathRegex = new RegExp(`${SRC_PATH}/${ENTRY_NAME}`)
  targets.forEach((value: string) => {
    let key: string = ''
    switch (BUILD_VARIANT) {
      case 'production':
        key = value.replace(pathRegex, 'index')
        break
      case 'development':
        key = value.replace(pathRegex, 'index')
        break
    }
    entries[key] = value
  })

  return entries
}

const config: webpack.Configuration = {
  target: 'node',
  mode: BUILD_VARIANT === 'production' ? 'production' : 'development',
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src'),
    },
    extensions: ['.ts', '.js'],
  },
  entry: resolveEntry(),
  output: {
    filename: 'app.js',
    path: BUILD_PATH,
    library: 'lambdaHandler',
    libraryTarget: 'umd',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
      },
    ],
  },
}

export default config
