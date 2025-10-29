import { useEffect, useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { getExperiences } from '../services/api'

function MainPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const searchParams = new URLSearchParams(location.search)
  const searchQuery = searchParams.get('search') || ''

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true)
        const data = await getExperiences()
        setExperiences(data.data || [])
      } catch (err) {
        console.error('Failed to fetch experiences:', err)
        setError('Failed to load experiences. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  const filteredExperiences = useMemo(() => {
    if (!searchQuery.trim()) {
      return experiences
    }

    const query = searchQuery.toLowerCase()
    return experiences.filter((exp) => {
      return (
        exp.title.toLowerCase().includes(query) ||
        exp.location.toLowerCase().includes(query) ||
        exp.category.toLowerCase().includes(query) ||
        exp.description.toLowerCase().includes(query)
      )
    })
  }, [experiences, searchQuery])

  const clearSearch = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading experiences...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-12 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Experiences</h1>
            {searchQuery && (
              <p className="text-gray-600 mt-2">
                {filteredExperiences.length} result{filteredExperiences.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            )}
          </div>
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>

      {filteredExperiences.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No experiences found matching "{searchQuery}"</p>
          <p className="text-gray-500 mt-2">Try searching with different keywords</p>
          <button
            onClick={clearSearch}
            className="mt-4 px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500"
          >
            View All Experiences
          </button>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredExperiences.map((exp) => (
            <Card
              key={exp._id}
              id={exp._id}
              title={exp.title}
              location={exp.location}
              description={exp.description}
              price={exp.price}
              image={exp.image}
            />
          ))}
        </section>
      )}
    </main>
  )
}

export default MainPage