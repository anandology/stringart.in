import { useState } from 'react';
import { Play, Clock, Users } from 'lucide-react';

interface GettingStartedVideoProps {
  videoUrl?: string;
  videoTitle?: string;
  videoDuration?: string;
}

const GettingStartedVideo: React.FC<GettingStartedVideoProps> = ({
  videoUrl = "https://www.youtube.com/embed/VyvIQM0nCbI",
  videoTitle = "Getting Started with String Art",
  videoDuration = "5 min"
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">See String Art in Action</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch how easy it is to create beautiful string art patterns. From setup to completion,
            see the magic of mathematics come to life through art.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Section */}
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl shadow-lg overflow-hidden">
              {isVideoPlaying ? (
                <div className="aspect-video">
                  <iframe
                    src={`${videoUrl}?autoplay=1`}
                    title={videoTitle}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center p-8">
                  <div className="text-center">
                    <div
                      className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:bg-orange-700 transition-colors cursor-pointer"
                      onClick={handlePlayClick}
                    >
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{videoTitle}</h4>
                    <p className="text-gray-600">Learn the basics in just {videoDuration}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Video Stats */}
            <div className="flex items-center justify-center space-x-6 mt-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{videoDuration}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="h-4 w-4" />
                <span className="text-sm">Beginner friendly</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div className="bg-orange-50 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn:</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">How to set up your string art workspace</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Understanding the mathematical patterns</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Step-by-step stringing technique</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Tips for perfect tension and alignment</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Finishing touches and display ideas</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg text-gray-600">Ready to start creating?</span>
                <p className="text-sm text-gray-500">Choose your kit and begin your journey</p>
              </div>
              <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-md">
                Browse Kits
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GettingStartedVideo;
