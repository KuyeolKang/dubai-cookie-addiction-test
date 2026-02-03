import { useState } from "react";
import { testData } from "@/data/questions";
import { getResultByScore, Result } from "@/data/results";
import { Share2, Twitter, Facebook } from "lucide-react";

export default function PersonalityTest() {
  const [stage, setStage] = useState<"start" | "test" | "result">("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [result, setResult] = useState<Result | null>(null);

  const handleStart = () => {
    setStage("test");
    setCurrentQuestion(0);
    setTotalScore(0);
  };

  const handleAnswer = (score: number) => {
    const newScore = totalScore + score;
    setTotalScore(newScore);

    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result based on total score
      const finalResult = getResultByScore(newScore);
      setResult(finalResult);
      setStage("result");
    }
  };

  const handleRestart = () => {
    setStage("start");
    setCurrentQuestion(0);
    setTotalScore(0);
    setResult(null);
  };

  const shareToKakao = () => {
    alert("카카오톡 공유 기능은 카카오 SDK 설정이 필요합니다.");
  };

  const shareToTwitter = () => {
    const text = `나의 두바이 쿠키 중독 레벨은 "${result?.title}"! 당신도 테스트해보세요!`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const progress = ((currentQuestion + 1) / testData.questions.length) * 100;
  const currentQuestionData = testData.questions[currentQuestion];

  if (stage === "start") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center transform transition-all hover:scale-105 duration-300">
          <div className="text-6xl mb-6">🍪</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {testData.testTitle}
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            {testData.testSubtitle}
          </p>
          <button
            onClick={handleStart}
            className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            테스트 시작하기
          </button>
        </div>
      </div>
    );
  }

  if (stage === "test") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-2xl w-full">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-amber-600">
                질문 {currentQuestion + 1} / {testData.questions.length}
              </span>
              <span className="text-sm font-semibold text-amber-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8 animate-fadeIn">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-relaxed">
              {currentQuestionData.question}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.score)}
                  className="w-full bg-gray-50 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 border-2 border-gray-200 hover:border-amber-300 rounded-2xl p-5 text-left font-medium text-gray-700 hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="text-amber-600 font-bold mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "result" && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-2xl w-full">
          {/* Result Header */}
          <div className="text-center mb-8">
            <div className="text-7xl mb-4 animate-bounce">{result.emoji}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {result.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {result.description}
            </p>
          </div>

          {/* Characteristics */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🍪 당신의 특징</h3>
            <div className="space-y-3">
              {result.characteristics.map((char, index) => (
                <div
                  key={index}
                  className="flex items-start bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4"
                >
                  <span className="text-amber-500 font-bold mr-3">•</span>
                  <span className="text-gray-700">{char}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Products */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🎁 추천 상품</h3>
            <div className="space-y-4">
              {result.recommendedProducts.map((product, index) => (
                <a
                  key={index}
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <h4 className="font-bold text-gray-800 mb-2">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.reason}</p>
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다."
            </p>
          </div>

          {/* Share Buttons */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              친구들과 공유하기
            </h3>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={shareToKakao}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Share2 size={20} />
                카카오톡
              </button>
              <button
                onClick={shareToTwitter}
                className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Twitter size={20} />
                트위터
              </button>
              <button
                onClick={shareToFacebook}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Facebook size={20} />
                페이스북
              </button>
            </div>
          </div>

          {/* Restart Button */}
          <div className="text-center">
            <button
              onClick={handleRestart}
              className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              다시 테스트하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
