import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 lg:pt-20">
        <ContactHero />
        
        {/* Contact Content */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Contact Info - Takes 2 columns */}
              <div className="lg:col-span-2">
                <ContactInfo />
              </div>
              
              {/* Contact Form - Takes 3 columns */}
              <div className="lg:col-span-3">
                <div className="glass-effect rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
