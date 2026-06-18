import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getRecommendations } from '@/lib/recommendations';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

const SYSTEM_PROMPT = `
당신은 반영구 메이크업 전문 AI입니다.
얼굴 사진을 분석하고 반드시 아래 JSON 형식으로만 응답하세요.
설명 없이 JSON만 출력하세요.
{
 "face_shape": "oval 또는 round 또는 square 또는 heart 또는 long",
 "face_confidence": 0에서 100 사이 숫자,
 "current_eyebrow": "현재 눈썹 상태 한 줄",
 "lip_shape": "입술 형태 한 줄",
 "skin_tone": "warm 또는 cool 또는 neutral",
 "special_notes": "특이사항 또는 null"
}`;

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json(
                { error: '이미지가 없습니다' }, { status: 400 }
            );
        }

        // 이미지 → base64 변환
        const bytes = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString('base64');
        const mimeType = file.type as 'image/jpeg' | 'image/png' | 'image/webp';

        // Gemini 2.5 Flash 호출
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const result = await model.generateContent([
            SYSTEM_PROMPT,
            { inlineData: { data: base64, mimeType } },
        ]);

        const text = result.response.text().trim();
        // ```json ... ``` 마크다운 감싸개 제거
        const clean = text.replace(/```json|```/g, '').trim();
        const analysis = JSON.parse(clean);

        // 얼굴형 기반 추천 가져오기
        const recommendations = getRecommendations(analysis.face_shape);

        return NextResponse.json({ analysis, recommendations });

    } catch (error) {
        console.error('분석 오류:', error);
        return NextResponse.json(
            { error: '분석 중 오류가 발생했습니다' }, { status: 500 }
        );
    }
}