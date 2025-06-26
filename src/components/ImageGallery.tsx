import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Info } from 'lucide-react'

interface Image {
  id: number
  rollNumber: string
  url: string
  name: string
}

interface ImageGalleryProps {
  images: Image[]
  showInfo: boolean
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, showInfo }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [showAdditionalImages, setShowAdditionalImages] = useState<number | null>(null)

  const handleImageClick = (imageId: number) => {
    setSelectedImage(selectedImage === imageId ? null : imageId)
    setShowAdditionalImages(null)
  }

  const handleGetInfo = (imageId: number) => {
    setShowAdditionalImages(showAdditionalImages === imageId ? null : imageId)
  }

  const getAdditionalImages = (rollNumber: string) => {
    const types = ['SSC', 'INTER', 'Aadhar', 'Caste', 'Income', 'Photo']
    return types.map(type => ({
      type,
      url: `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_${type}.jpg`
    }))
  }

  if (images.length === 0) {
    return (
      <div className="glass-dark rounded-xl p-8 border border-gray-200 dark:border-dark-700 text-center">
        <div className="text-gray-500 dark:text-gray-400">
          <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No images generated yet. Please make your selections and click "Generate Images".</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="glass-dark rounded-xl p-6 border border-gray-200 dark:border-dark-700">
        <h3 className="text-lg font-semibold mb-4">Generated Images</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {images.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  selectedImage === image.id
                    ? 'border-primary-500 shadow-lg shadow-primary-500/25'
                    : 'border-gray-200 dark:border-dark-600 hover:border-primary-400'
                }`}
                onClick={() => handleImageClick(image.id)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.rollNumber}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://images.pexels.com/photos/1000000/pexels-photo-1000000.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-semibold text-sm">{image.rollNumber}</p>
                    <p className="text-xs opacity-90">{image.name}</p>
                  </div>
                </div>

                <AnimatePresence>
                  {selectedImage === image.id && showInfo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gray-50 dark:bg-dark-800 p-3 border-t border-gray-200 dark:border-dark-600"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleGetInfo(image.id)
                        }}
                        className="w-full btn-primary text-sm py-2"
                      >
                        <Info className="w-4 h-4 mr-2" />
                        Get Additional Info
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {showAdditionalImages === image.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gray-50 dark:bg-dark-800 p-3 border-t border-gray-200 dark:border-dark-600"
                    >
                      <h4 className="text-sm font-medium mb-2">Additional Documents</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {getAdditionalImages(image.rollNumber).map((doc) => (
                          <div key={doc.type} className="text-center">
                            <img
                              src={doc.url}
                              alt={doc.type}
                              className="w-full h-16 object-cover rounded border border-gray-200 dark:border-dark-600 hover:scale-105 transition-transform cursor-pointer"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                              }}
                            />
                            <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">{doc.type}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ImageGallery