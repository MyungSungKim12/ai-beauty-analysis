'use client';

import { useState } from 'react';
import FaceUploader from '@/components/FaceUploader';
import AnalysisResult from '@/components/AnalysisResult';
import { AnalysisResponse } from '@/lib/types';

export default function Home() {
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (file: File) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      setError(e.message ?? '분석 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-2">
            AI 얼굴형 분석
          </h1>
          <p className="text-center text-gray-500 text-sm mb-8">
            사진을 업로드하면 얼굴형에 맞는 눈썹·입술 스타일을 추천해드립니다
          </p>
          <FaceUploader onAnalyze={handleAnalyze} loading={loading} />
          {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
                {error}
              </div>
          )}
          {result && <AnalysisResult data={result} />}
        </div>
      </main>
  );
}