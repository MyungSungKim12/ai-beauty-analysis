'use client';

import { AnalysisResponse } from '@/lib/types';

const FACE_SHAPE_KO: Record<string, string> = {
    oval: '타원형', round: '둥근형', square: '각진형',
    heart: '역삼각형', long: '긴형',
};

export default function AnalysisResult({ data }: { data: AnalysisResponse }) {
    const { analysis, recommendations } = data;

    return (
        <div className="mt-8 space-y-6">
            {/* 얼굴형 결과 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">분석 결과</p>
                <div className="flex items-center gap-3">
          <span className="text-2xl font-semibold text-gray-800">
            {FACE_SHAPE_KO[analysis.face_shape] ?? analysis.face_shape}
          </span>
                    <span className="text-xs bg-pink-50 text-pink-500 px-2 py-1 rounded-full">
            확신도 {analysis.face_confidence}%
          </span>
                </div>
                {analysis.special_notes && (
                    <p className="text-xs text-gray-400 mt-2">{analysis.special_notes}</p>
                )}
            </div>

            {/* 눈썹 추천 */}
            <div>
                <h2 className="text-sm font-medium text-gray-700 mb-3">눈썹 스타일 추천</h2>
                <div className="space-y-2">
                    {recommendations.eyebrows.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                            <div>
                                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                <p className="text-xs text-gray-400">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 입술 추천 */}
            <div>
                <h2 className="text-sm font-medium text-gray-700 mb-3">입술 컬러 추천</h2>
                <div className="space-y-2">
                    {recommendations.lips.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                            <div>
                                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                <p className="text-xs text-gray-400">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 전문가 팁 */}
            <div className="bg-pink-50 rounded-2xl p-4 text-sm text-pink-700">
                <span className="font-medium">💡 전문가 팁</span><br/>
                {recommendations.tip}
            </div>
        </div>
    );
}