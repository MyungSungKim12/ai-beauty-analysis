import { createClient } from '@supabase/supabase-js';

// 클라이언트 컴포넌트용 (브라우저에서 사용)
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 서버 API Route용 (서버에서만 사용 — service_role)
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 분석 결과 저장 함수
export async function saveAnalysisResult(data: {
    customer_name?: string;
    phone?: string;
    face_shape: string;
    confidence?: number;
    skin_tone?: string;
    eyebrow_recs: object;
    lip_recs: object;
    raw_analysis: object;
    notes?: string;
}) {
    const { data: result, error } = await supabaseAdmin
        .from('analysis_results')
        .insert(data)
        .select()
        .single();

    if (error) throw error;
    return result;
}