import { useState } from 'react';
import { useEffect } from 'react';
import InternshipCard from '../components/InternshipCard';
import InternshipDetail from '../components/InternshipDetail';
import { Search, Filter, MapPin, Briefcase, Globe, Clock, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// const MOCK_INTERNSHIPS = [
//   {
//     id: 1,
//     title: 'Frontend Developer Intern',
//     company: 'Google',
//     location: 'Remote',
//     duration: '3 Months',
//     stipend: '₹20,000 / Month',
//     type: 'Remote',
//     category: 'Development',
//     postedDate: '2 days ago',
//     description: 'We are looking for a passionate Frontend Developer Intern to join our team. You will be working on building responsive UI components using React and Tailwind CSS.',
//     requirements: ['Proficiency in React', 'Building responsive UI components', 'Proficiency in React'],
//     responsibilities: ['UI build', 'React'],
//     logo: 'https://picsum.photos/seed/google/100/100',
//   },
//   {
//     id: 2,
//     title: 'UI/UX Design Intern',
//     company: 'Figma',
//     location: 'Bangalore',
//     duration: '6 Months',
//     stipend: '₹25,000 / Month',
//     type: 'On-site',
//     category: 'Design',
//     postedDate: '5 days ago',
//     description: 'Join our design team to create beautiful and intuitive user experiences. You will work closely with product managers and developers.',
//     requirements: ['Proficiency in Figma', 'Understanding of design principles'],
//     responsibilities: ['Designing mockups', 'User research'],
//     logo: 'https://picsum.photos/seed/figma/100/100',
//   },
//   {
//     id: 3,
//     title: 'Full Stack Developer',
//     company: 'Meta',
//     location: 'Remote',
//     duration: '4 Months',
//     stipend: '₹30,000 / Month',
//     type: 'Remote',
//     category: 'Development',
//     postedDate: '1 week ago',
//     description: 'We are looking for a Full Stack Developer Intern to work on both frontend and backend systems.',
//     requirements: ['Node.js', 'React', 'MongoDB'],
//     responsibilities: ['Full stack development'],
//     logo: 'https://picsum.photos/seed/meta/100/100',
//   },
//   {
//     id: 4,
//     title: 'Product Management Intern',
//     company: 'Microsoft',
//     location: 'Hyderabad',
//     duration: '3 Months',
//     stipend: '₹22,000 / Month',
//     type: 'Hybrid',
//     category: 'Business',
//     postedDate: '3 days ago',
//     description: 'Work with our product team to define features and roadmap for our next-gen products.',
//     requirements: ['Analytical skills', 'Communication skills'],
//     responsibilities: ['Product roadmap'],
//     logo: 'https://picsum.photos/seed/microsoft/100/100',
//   },
//   {
//     id: 5,
//     title: 'Software Development Intern',
//     company: 'SkillNest Tech',
//     location: 'Delhi',
//     duration: '1 Month',
//     stipend: '₹5,000',
//     type: 'Remote',
//     category: 'Development',
//     postedDate: '1 day ago',
//     description: 'Help us build the future of internship platforms.',
//     requirements: ['React', 'Javascript'],
//     responsibilities: ['UI build', 'React'],
//     logo: 'https://picsum.photos/seed/sn/100/100',
//   },
//   {
//     id: 6,
//     title: 'Data Science Intern',
//     company: 'DataWise AI',
//     location: 'San Francisco',
//     duration: '4 Months',
//     stipend: '₹25,000 / Month',
//     type: 'Remote',
//     category: 'Technology',
//     postedDate: '1 week ago',
//     description: 'Analyze large datasets and build predictive models to drive business decisions.',
//     requirements: ['Python', 'SQL', 'Machine Learning'],
//     responsibilities: ['Data analysis', 'Model building'],
//     logo: 'https://picsum.photos/seed/data/100/100',
//   }
// ];

export default function BrowseInternships({ isDark }) {
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Technology', 'Design', 'Development', 'Business'];

  // Real data fetching
  const [internships, setInternships] = useState([]);

  // For now, we are not applying any filters to the fetched internships.
  const filteredInternships = internships;

  useEffect(() => {
    fetch("http://localhost:5000/api/internships")
      .then((res) => res.json())
      .then((data) => setInternships(data))
      .catch((err) => console.log(err));
  }, []);

  const handleApply = async (internship) => {
    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:5000/api/applications/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          internshipId: internship._id,
        }),
      });

      // 🔥 LOCAL STORAGE SAVE (IMPORTANT)
      const existing = JSON.parse(localStorage.getItem("applications")) || [];

      const newApp = {
        id: Date.now(),
        title: internship.title,
        company: internship.company,
        status: "Pending",
        appliedOn: new Date().toLocaleDateString(),
        // 🔥 FORCE IMAGE (FIX)
      logo: internship.logo || `https://picsum.photos/seed/${internship.title}/100/100`
      };

      localStorage.setItem("applications", JSON.stringify([newApp, ...existing]));

      alert("Applied Successfully 🚀");

    } catch (err) {
      console.log(err);
    }
  };

  // const filteredInternships = MOCK_INTERNSHIPS.filter(internship => {
  //   const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
  //                         internship.company.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesCategory = activeCategory === 'All' || internship.category.includes(activeCategory);
  //   return matchesSearch && matchesCategory;
  // });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
            Explore Internships
          </h1>
          <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>
            Discover your next career opportunity with AI-powered guidance.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className={`flex-1 flex items-center gap-3 px-6 py-4 rounded-3xl border transition-all ${isDark ? 'bg-dark-slate border-slate-800 focus-within:border-royal-indigo' : 'bg-white border-gray-100 shadow-sm focus-within:border-primary-blue'
            }`}>
            <Search size={22} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search for roles, companies, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-lg w-full text-slate-400"
            />
          </div>
          <button className={`flex items-center gap-2 px-8 py-4 rounded-3xl font-bold border transition-all ${isDark ? 'bg-dark-slate border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50 shadow-sm'
            }`}>
            <Filter size={20} />
            Filters
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${activeCategory === cat
                ? (isDark ? 'bg-royal-indigo text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-primary-blue text-white shadow-lg shadow-primary-blue/20')
                : (isDark ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200')
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedInternship ? (
          <InternshipDetail
            key="detail"
            internship={selectedInternship}
            onBack={() => setSelectedInternship(null)}
            isDark={isDark}
          />
        ) : filteredInternships.length > 0 ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredInternships.map((internship) => (
              // <InternshipCard 
              //   key={internship.id} 
              //   internship={internship} 
              //   onClick={() => setSelectedInternship(internship)}
              //   isDark={isDark}
              // />
              <InternshipCard
                key={internship._id}
                internship={internship}
                onClick={() => setSelectedInternship(internship)}
                onApply={handleApply}   // ✅ YE HONA CHAHIYE
                isDark={isDark}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
              <Search size={40} className="text-slate-500" />
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>No internships found</h3>
            <p className="text-slate-500">Try adjusting your search or category filters.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
