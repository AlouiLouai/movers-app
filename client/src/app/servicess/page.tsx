"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, Package, Clock, Star, Quote } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Car Delivery",
    shortDescription: "Fast and secure delivery of vehicles to your destination.",
    fullDescription:
      "Whether it’s a sedan, SUV, or luxury car, our expert drivers ensure your vehicle arrives safely and on time. Includes real-time tracking and insurance coverage.",
    price: "Starting at $100",
    features: ["Door-to-door service", "GPS tracking", "Full insurance"],
  },
  {
    icon: Package,
    title: "Package Transport",
    shortDescription: "Move small to medium packages with ease and reliability.",
    fullDescription:
      "Perfect for personal items, business goods, or gifts. We handle packages up to 50 lbs with care, offering flexible pickup and drop-off options.",
    price: "Starting at $20",
    features: ["Flexible scheduling", "Secure handling", "Affordable rates"],
  },
  {
    icon: Clock,
    title: "Same-Day Service",
    shortDescription: "Urgent deliveries completed within hours.",
    fullDescription:
      "Need it there today? Our same-day service guarantees delivery within hours, ideal for emergencies or last-minute needs. Priority booking available.",
    price: "Starting at $150",
    features: ["Rush delivery", "Priority support", "Real-time updates"],
  },
];

const testimonials = [
  {
    name: "Sarah L.",
    text: "The car delivery service was flawless—my vehicle arrived ahead of schedule and in perfect condition!",
    rating: 5,
  },
  {
    name: "Tom R.",
    text: "Same-day package transport saved my business meeting. Super reliable and fast.",
    rating: 4.5,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 text-gray-900 font-[family-name:var(--font-geist-sans)]">
      <main className="relative container mx-auto px-4 sm:px-8 lg:px-16 py-12">
        {/* Hero Banner */}
        <section className="relative text-center py-20 mb-12 animate-fade-in-up">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-100 via-transparent to-transparent opacity-50 -z-10" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600">
            Delivery Solutions Tailored for You
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            From cars to packages, we offer fast, secure, and reliable delivery services designed to meet your every need.
          </p>
          <Button className="mt-8 group inline-flex items-center px-8 py-4 text-xl font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Explore Services
            <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </section>

        {/* Services Grid */}
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center justify-center mb-4">
                <service.icon className="h-14 w-14 text-teal-600 group-hover:scale-110 transition-transform" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-center">{service.title}</h2>
              <p className="mt-2 text-gray-600 text-center">{service.shortDescription}</p>
              <p className="mt-4 text-sm text-gray-500">{service.fullDescription}</p>
              <ul className="mt-4 text-sm text-gray-600 list-disc list-inside">
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <p className="mt-4 text-lg font-semibold text-teal-600 text-center">{service.price}</p>
              <Button
                variant="outline"
                className="mt-6 w-full inline-flex items-center px-4 py-2 text-lg font-semibold text-teal-600 border-teal-600 hover:bg-teal-50 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          ))}
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What Our Customers Say</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Quote className="h-8 w-8 text-teal-600 mb-4" />
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold text-gray-800">{testimonial.name}</span>
                  <span className="flex items-center text-yellow-500">
                    {Array(Math.floor(testimonial.rating)).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                    {testimonial.rating % 1 !== 0 && <Star className="h-5 w-5 fill-current opacity-50" />}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">How do I book a service?</h3>
              <p className="mt-2 text-gray-600">
                Simply choose your service, click "Learn More," and follow the booking steps. You’ll get a confirmation instantly!
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">What areas do you cover?</h3>
              <p className="mt-2 text-gray-600">
                We operate nationwide with a network of trusted drivers. Enter your location during booking to confirm availability.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Is my delivery insured?</h3>
              <p className="mt-2 text-gray-600">
                Yes, all deliveries come with standard insurance. Optional upgrades are available for high-value items.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Move?</h2>
          <p className="text-lg text-gray-600 mb-6">Start your delivery journey with us today.</p>
          <Button className="group inline-flex items-center px-8 py-4 text-xl font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Get Started Today
            <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </section>
      </main>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}