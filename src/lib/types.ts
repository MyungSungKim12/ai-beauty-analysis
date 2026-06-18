export type FaceShape =
    | 'oval'
    | 'round'
    | 'square'
    | 'heart'
    | 'long';

export type SkinTone = 'warm' | 'cool' | 'neutral';

export interface AnalysisResult {
    face_shape: FaceShape;
    face_confidence: number;
    current_eyebrow: string;
    lip_shape: string;
    skin_tone: SkinTone;
    special_notes: string | null;
}

export interface StyleItem {
    name: string;
    description: string;
    color: string;  // hex 컬러코드
    avoid?: string;
}

export interface Recommendations {
    eyebrows: StyleItem[];
    lips: StyleItem[];
    tip: string;
}

export interface AnalysisResponse {
    analysis: AnalysisResult;
    recommendations: Recommendations;
}