'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

interface Props {
    onAnalyze: (file: File) => void;
    loading: boolean;
}

export default function FaceUploader({ onAnalyze, loading }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [pasteHint, setPasteHint] = useState(false);

    const handleFile = useCallback((file: File) => {
        if (!file.type.startsWith('image/')) return;
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        setPasteHint(false);
    }, []);

    // 클립보드 붙여넣기 (Ctrl+V)
    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            const items = e.clipboardData?.items;
            if (!items) return;
            for (const item of Array.from(items)) {
                if (item.type.startsWith('image/')) {
                    const file = item.getAsFile();
                    if (file) handleFile(file);
                    break;
                }
            }
        };
        window.addEventListener('paste', handlePaste);
        return () => window.removeEventListener('paste', handlePaste);
    }, [handleFile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    const handleReset = () => {
        setPreview(null);
        setSelectedFile(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <div className="space-y-4">
            {/* 개인정보 안내 */}
            <div className="text-xs text-gray-400 bg-gray-100 rounded-lg p-3 text-center">
                업로드된 이미지는 분석 후 즉시 삭제되며 저장되지 않습니다
            </div>

            {/* 업로드 영역 */}
            <div
                onClick={() => !preview && inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onMouseEnter={() => !preview && setPasteHint(true)}
                onMouseLeave={() => setPasteHint(false)}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all relative"
            >
                {preview ? (
                    <div className="relative">
                        <img src={preview} alt="미리보기" className="mx-auto max-h-64 rounded-lg object-cover" />
                        <button
                            onClick={(e) => { e.stopPropagation(); handleReset(); }}
                            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm hover:bg-opacity-70"
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="text-4xl mb-3">📷</div>
                        <p className="text-gray-500 text-sm">클릭하거나 드래그해서 올려주세요</p>
                        <p className="text-gray-400 text-xs mt-1">
                            {pasteHint
                                ? '📋 Ctrl+V 로 클립보드 이미지 붙여넣기도 됩니다'
                                : 'JPG · PNG · WEBP 지원 · Ctrl+V 붙여넣기 가능'}
                        </p>
                    </div>
                )}
            </div>

            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />

            {/* 분석 버튼 */}
            <button
                onClick={() => selectedFile && onAnalyze(selectedFile)}
                disabled={!selectedFile || loading}
                className="w-full py-3 rounded-xl font-medium text-white bg-pink-500 hover:bg-pink-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
            >
                {loading ? '분석 중...' : '얼굴형 분석하기'}
            </button>
        </div>
    );
}