import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="w-full bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
        
        {/* Header with gradient text */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-700">
              Get in Touch
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Have questions about our products? Need support? We're here for you.
          </p>
        </div>

        {/* Glass morphism contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: <FiMail className="w-7 h-7" />, title: 'Email Us', content: 'support@yourstore.com', color: 'from-violet-500 to-purple-500' },
            { icon: <FiPhone className="w-7 h-7" />, title: 'Call Us', content: '+1 (555) 123-4567', color: 'from-indigo-500 to-blue-500' },
            { icon: <FiMapPin className="w-7 h-7" />, title: 'Visit Us', content: '123 Commerce St, City, State', color: 'from-purple-500 to-pink-500' }
          ].map((item, index) => (
            <div 
              key={index}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r opacity-75 blur-sm group-hover:opacity-100 transition duration-300 rounded-xl"></div>
              <div className="relative bg-white backdrop-blur-md bg-opacity-80 p-8 rounded-xl shadow-lg flex flex-col items-center transform hover:scale-105 transition duration-300 border border-gray-100">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white bg-gradient-to-r ${item.color} mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact form and map section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Form section */}
            <div className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="User Name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="user@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-300 hover:scale-105 shadow-md"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Map section */}
            <div className="relative h-96 lg:h-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90 lg:hidden"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 lg:hidden">
                <h3 className="text-2xl font-bold mb-4">Our Location</h3>
                <p className="text-center mb-8">We're conveniently located in the heart of downtown, easily accessible by public transit.</p>
                <div className="inline-flex items-center px-4 py-2 border border-white rounded-lg">
                  <FiMapPin className="mr-2" />
                  <span>Get Directions</span>
                </div>
              </div>
             
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <dl className="divide-y divide-gray-100">
              {[
                { q: "What are your customer service hours?", a: "Our customer service team is available Monday through Friday from 9 AM to 6 PM EST, and Saturday from 10 AM to 4 PM EST." },
                { q: "How quickly do you respond to inquiries?", a: "We strive to respond to all inquiries within 24 hours during business days." },
                { q: "Do you offer international shipping?", a: "Yes, we ship to over 100 countries worldwide with competitive shipping rates." },
                { q: "What is your return policy?", a: "We offer a 30-day return policy for most items. Please check our returns page for specific details." }
              ].map((item, idx) => (
                <div key={idx} className="px-6 py-6">
                  <dt className="text-lg font-medium text-gray-900">{item.q}</dt>
                  <dd className="mt-3 text-base text-gray-600">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest product updates, promotions, and exclusive offers.
            </p>
            <form className="sm:flex justify-center max-w-xl mx-auto">
              <div className="min-w-0 flex-1">
                <label htmlFor="newsletter" className="sr-only">Email address</label>
                <input
                  id="newsletter"
                  type="email"
                  className="block w-full px-4 py-3 rounded-l-lg text-base text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  className="block w-full px-4 py-3 rounded-r-lg bg-white text-base font-medium text-indigo-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:text-sm"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
