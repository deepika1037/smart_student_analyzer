import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, Book, Mail, ExternalLink, ChevronRight } from 'lucide-react';

const HelpPage = () => {
  const faqs = [
    { q: "How do I upload student data?", a: "Navigate to the 'Student Data' page and use the CSV upload tool. Ensure your CSV follows the required template." },
    { q: "What does 'Risk Level' mean?", a: "Risk level is calculated by our AI model. 'High Risk' indicates a student is likely to perform poorly based on current trends." },
    { q: "How do I notify parents?", a: "Enable 'Auto-Notify' in Settings. When you run a prediction, the system will automatically generate and log messages for parents." },
    { q: "Can I export reports?", a: "Yes, you can download PDF reports from the Student Dashboard or the Analysis modal in the Faculty Dashboard." }
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center text-primary mx-auto"
        >
          <HelpCircle size={40} />
        </motion.div>
        <h1 className="text-4xl font-bold tracking-tight">How can we help you?</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Find answers to common questions or get in touch with our support team.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-dark p-8 rounded-3xl border border-white/10 text-center space-y-4 hover:border-primary/50 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform">
            <Book size={24} />
          </div>
          <h3 className="font-bold text-xl">Documentation</h3>
          <p className="text-sm text-gray-400">Read our full guide on how to use the AI Predictor.</p>
          <button className="text-primary text-sm font-bold flex items-center gap-1 mx-auto">
            Read More <ExternalLink size={14} />
          </button>
        </div>

        <div className="glass-dark p-8 rounded-3xl border border-white/10 text-center space-y-4 hover:border-secondary/50 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mx-auto group-hover:scale-110 transition-transform">
            <MessageCircle size={24} />
          </div>
          <h3 className="font-bold text-xl">Community</h3>
          <p className="text-sm text-gray-400">Join our forum to discuss features and get tips.</p>
          <button className="text-secondary text-sm font-bold flex items-center gap-1 mx-auto">
            Join Now <ExternalLink size={14} />
          </button>
        </div>

        <div className="glass-dark p-8 rounded-3xl border border-white/10 text-center space-y-4 hover:border-emerald-500/50 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mx-auto group-hover:scale-110 transition-transform">
            <Mail size={24} />
          </div>
          <h3 className="font-bold text-xl">Support</h3>
          <p className="text-sm text-gray-400">Contact our team directly for technical assistance.</p>
          <button className="text-emerald-500 text-sm font-bold flex items-center gap-1 mx-auto">
            Email Us <ExternalLink size={14} />
          </button>
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <ChevronRight className="text-primary" />
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl border border-white/5"
            >
              <h4 className="font-bold mb-2 text-primary">{faq.q}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
