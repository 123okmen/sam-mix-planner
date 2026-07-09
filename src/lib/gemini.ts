import { GoogleGenerativeAI } from "@google/generative-ai";

const BASE_PLAN = `
**Dự Án Trạm Nước Sâm Mix & Mía Mix Healthy**
- **Vị trí:** Khu dân cư Conic Bình Chánh, sân bãi 60m2.
- **Vốn đầu tư:** 80 Triệu VNĐ (Chia cho 4 cổ đông).
- **Mô hình:** Vận hành ca gãy (Sáng: 6h-9h mang đi, Trưa: 12h-18h đóng cửa, Tối: 18h-22h30 Detox & Chill). Nói không với cafe, bia rượu, thuốc lá.
- **Phong cách:** Cắm trại ngoài trời (Camping), dùng cỏ nhân tạo, bàn ghế gỗ xếp dã ngoại, quầy gỗ mộc mạc, đèn LED búp chanh.
`;

export const generatePlan = async (apiKey: string, newIdeas: string) => {
  if (!apiKey) {
    throw new Error("Vui lòng nhập API Key của Gemini.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Bạn là một chuyên gia tư vấn chiến lược kinh doanh F&B. 
Dưới đây là thông tin cơ bản về dự án quán nước của chúng tôi:
${BASE_PLAN}

Các cổ đông vừa đóng góp thêm ý tưởng sau:
"${newIdeas}"

Hãy viết một bản kế hoạch kinh doanh ngắn gọn, hấp dẫn, tích hợp các ý tưởng mới này vào bản kế hoạch cơ sở một cách hợp lý. 
Sử dụng định dạng Markdown. Bao gồm các phần: 
1. Tóm tắt mô hình
2. Cập nhật chiến lược từ ý tưởng mới
3. Dự phóng rủi ro & giải pháp
Lưu ý: Viết thật chuyên nghiệp và thực tế.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Lỗi khi gọi API Gemini:", error);
    throw new Error(error.message || "Đã xảy ra lỗi khi tạo kế hoạch.");
  }
};
