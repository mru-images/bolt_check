import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Image, Hash, Search } from 'lucide-react'
import Layout from '../components/Layout'

const HomePage: React.FC = () => {
  const cards = [
    {
      title: 'Mystic Mountains',
      description: 'Image Selector Tool',
      href: '/selector',
      icon: Image,
      gradient: 'from-blue-500 to-purple-600',
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Enchanted Forest',
      description: 'Roll Number Generator',
      href: '/roll-number',
      icon: Hash,
      gradient: 'from-green-500 to-teal-600',
      image: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Information Portal',
      description: 'Search Database',
      href: '/search',
      icon: Search,
      gradient: 'from-purple-500 to-pink-600',
      image: 'https://images.pexels.com/photos/1366942/pexels-photo-1366942.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-4 gradient-text">
            Choose Your Path
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our powerful tools designed to enhance your academic journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {cards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={card.href} className="block group">
                  <div className="relative overflow-hidden rounded-2xl glass-dark border border-gray-200 dark:border-dark-700 hover:border-primary-500 transition-all duration-300 card-hover">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${card.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Icon className="w-12 h-12 mx-auto mb-4 drop-shadow-lg" />
                          <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                            {card.title}
                          </h3>
                          <p className="text-lg opacity-90 drop-shadow-lg">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">Explore Now</span>
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400">
            Powered by modern technology and designed for excellence
          </p>
        </motion.div>
      </div>
    </Layout>
  )
}

export default HomePage