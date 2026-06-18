import { FaceShape, Recommendations } from './types';

const recommendationDB: Record<FaceShape, Recommendations> = {

    // 타원형
    oval: {
        eyebrows: [
            { name: '완만한 아치형', description: '자연스럽고 균형잡힌 기본 스타일', color: '#8B6914' },
            { name: '평행 직선형', description: '모던하고 세련된 인상 연출', color: '#6B4C14' },
            { name: '소프트 S자형', description: '부드럽고 여성스러운 곡선', color: '#9B7A2E' },
        ],
        lips: [
            { name: '로즈 핑크', description: '화사하고 생기있는 컬러', color: '#D4547E' },
            { name: '코럴 레드', description: '트렌디하고 활동적인 인상', color: '#D85A30' },
            { name: '누드 핑크', description: '일상 시술에 최적인 내추럴 톤', color: '#C8907A' },
        ],
        tip: '타원형은 이상적인 비율로 대부분의 스타일이 잘 어울립니다. 완만한 아치형 눈썹으로 자연스러운 아름다움을 살리는 것을 기본으로 추천드립니다.',
    },

    // 둥근형
    round: {
        eyebrows: [
            { name: '높은 각진 아치', description: '얼굴 세로감을 강조하는 효과', color: '#6B4C14' },
            { name: '상승형 꼬리', description: '샤프하고 또렷한 인상 연출', color: '#8B6914' },
            { name: '긴 직선형', description: '가로 길이로 균형감을 만들어줌', color: '#7A5C1E' },
        ],
        lips: [
            { name: '버건디', description: '세로감과 입체감을 동시에 연출', color: '#8B2252' },
            { name: '딥 로즈', description: '성숙하고 도도한 이미지', color: '#993556' },
            { name: '브릭 레드', description: '모던하고 쿨한 느낌', color: '#993C1D' },
        ],
        tip: '둥근형은 얼굴 세로 길이를 강조하는 스타일이 효과적입니다. 높은 아치 눈썹으로 눈두덩 공간을 넓혀주고, 짙은 컬러 입술로 집중도를 높입니다.',
    },

    // 각진형
    square: {
        eyebrows: [
            { name: '부드러운 S자 곡선', description: '각진 인상을 중화해주는 효과', color: '#8B6914' },
            { name: '완만한 아치형', description: '여성스럽고 부드러운 인상', color: '#9B7A2E' },
            { name: '자연 결 표현', description: '털 눈썹으로 온화한 느낌 연출', color: '#7A5C1E' },
        ],
        lips: [
            { name: '누드 베이지', description: '온화하고 내추럴한 분위기', color: '#C8A882' },
            { name: '피치 핑크', description: '부드럽고 사랑스러운 인상', color: '#E09070' },
            { name: '코럴 피치', description: '화사하고 생동감 있는 컬러', color: '#D87050' },
        ],
        tip: '각진형은 직선적인 라인을 부드럽게 중화하는 것이 핵심입니다. 직선형 눈썹은 피하고 곡선을 살린 스타일로 여성스러운 분위기를 연출합니다.',
    },

    // 역삼각형
    heart: {
        eyebrows: [
            { name: '낮고 완만한 아치', description: '넓은 이마를 줄여주는 효과', color: '#8B6914' },
            { name: '끝이 두꺼운 형태', description: '하관으로 시선을 분산시켜줌', color: '#7A5C1E' },
            { name: '수평 직선형', description: '얼굴 폭 균형을 맞춰주는 스타일', color: '#9B7A2E' },
        ],
        lips: [
            { name: '코럴 오렌지', description: '하관을 도드라지게 강조', color: '#D86030' },
            { name: '웜 레드', description: '균형감 있는 화려한 인상', color: '#C84020' },
            { name: '테라코타', description: '트렌디한 흙빛 톤', color: '#C06040' },
        ],
        tip: '역삼각형은 넓은 이마와 좁은 턱의 비율을 보정하는 게 핵심입니다. 눈썹 피크를 낮추고 입술에 포인트 컬러로 시선을 하관으로 유도합니다.',
    },

    // 긴형
    long: {
        eyebrows: [
            { name: '수평 직선형', description: '얼굴 가로감을 넓혀주는 효과', color: '#8B6914' },
            { name: '낮고 두꺼운 형태', description: '세로를 짧아 보이게 보정', color: '#7A5C1E' },
            { name: '짧고 두꺼운 스타일', description: '인상을 넓고 강하게 만들어줌', color: '#9B7A2E' },
        ],
        lips: [
            { name: '코럴 핑크', description: '가로감을 살려주는 화사한 톤', color: '#E06070' },
            { name: '밝은 로즈', description: '생기있고 발랄한 이미지', color: '#E05080' },
            { name: '피치 누드', description: '내추럴하면서 가로감 강조', color: '#D49080' },
        ],
        tip: '긴형은 얼굴 가로감을 넓혀주는 스타일이 포인트입니다. 눈썹을 수평으로 길게 그리고, 입술은 가로로 풍성하게 표현하는 것을 권장합니다.',
    },
};

export function getRecommendations(faceShape: string): Recommendations {
    const shape = faceShape as FaceShape;
    return recommendationDB[shape] ?? recommendationDB.oval;
}