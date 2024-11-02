import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 4200,
    },
    plugins: [
        react(),
        vitePluginImp({
            libList: [
                {
                    libName: "antd",
                    style: (name) => `antd/es/${name}/style/index`, // Import style chỉ khi cần thiết
                },
            ],
        }),
    ],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true, // cho phép antd xử lý Less
                modifyVars: {
                    // Tùy chỉnh biến Less của antd tại đây
                    "@primary-color": "#1DA57A",
                    "@screen-sm": "576px",
                    "@layout-body-background": "#f0f2f5", // Màu nền mặc định
                    "@screen-md-min": "768px", // Breakpoint cho màn hình medium
                    "@heading-color": "rgba(0, 0, 0, 0.85)", // Màu tiêu đề
                    "@font-size-base": "14px", // Kích thước font cơ bản
                    "@text-color-secondary": "rgba(0, 0, 0, 0.45)", // Màu chữ thứ cấp
                },
                paths: ["./node_modules"],
            },
        },
    },
});
