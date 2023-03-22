import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

function pathResolve(dir: string): string {
  return resolve(process.cwd(), ".", dir);
}

const images = pathResolve("src/assets/images/");
console.log(images);

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  return {
    // vite 配置
    base: "./",
    plugins: [vue()],
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve("src") + "/",
        },
        {
          find: /\/images\//,
          replacement: "src/assets/images/",
        },
      ],
    },
    devServer: {
      proxy: {
        "/api": {
          //要访问的跨域的域名
          target: "http://192.168.66.136:5003/",
          // target: 'http://101.132.156.208:5003/',
          ws: false, // 是否启用websockets
          secure: false, // 使用的是http协议则设置为false，https协议则设置为true
          //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
          changOrigin: true,
          pathRewrite: {
            "^/api": "",
          },
        },
        // 云后台api
        aemscloud: {
          target: "http://192.168.16.154:8005",
          changOrigin: true,
          pathRewrite: {
            "^/aemscloud": "",
          },
        },
      },
    },
  };
});
