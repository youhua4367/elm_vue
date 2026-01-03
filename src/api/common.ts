import request from "@/utils/request.ts";
import type { ApiResponse } from "@/types/api.ts";

/**
 * 上传文件
 * @param file 文件对象
 */
export const uploadFileService = (file: File): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    
    return request.post("/user/common/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};
