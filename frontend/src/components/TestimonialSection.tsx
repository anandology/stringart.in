import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Mother of two",
    content: "My kids (8 and 12) absolutely love creating string art! It's amazing how they're learning about angles and symmetry while having so much fun. The templates are perfect for beginners.",
    rating: 5,
    image: "👩‍💼"
  },
  {
    name: "Rajesh Kumar",
    role: "Art teacher",
    content: "I use these kits in my classroom to teach geometry concepts. Students are engaged and excited to learn math through art. The quality of templates is excellent!",
    rating: 5,
    image: "👨‍🏫"
  },
  {
    name: "Meera Patel",
    role: "Craft enthusiast",
    content: "Started as a hobby but now I'm creating beautiful pieces for my home. The progression from simple to complex patterns is well thought out. Highly recommend!",
    rating: 5,
    image: "👩‍🎨"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
          <p className="text-xl text-gray-600">Join thousands of families discovering the joy of string art</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="text-3xl mr-4">{testimonial.image}</div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
