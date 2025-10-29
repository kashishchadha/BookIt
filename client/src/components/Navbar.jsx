import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'

const Navbar = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')

	const handleSearch = () => {
		if (searchQuery.trim()) {
			// Navigate to home with search query
			navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
		} else {
			navigate('/')
		}
	}

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSearch()
		}
	}

	return (
		<header className="w-full">
			<div className=" mx-auto bg-white shadow-sm border border-gray-300 px-6 py-3">
				<div className="flex items-center">
					<div className="shrink-0 cursor-pointer" onClick={() => navigate('/')}>
						<img src={logo} alt="logo" className="h-10" />
					</div>

					<div className="flex-1 flex justify-end">
						<div className="w-full max-w-xl">
							<label htmlFor="nav-search" className="sr-only">Search experiences</label>
							<div className="flex items-center justify-end">
								<input
									id="nav-search"
									type="search"
									placeholder="Search by title, location, or category..."
									aria-label="Search experiences"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									onKeyPress={handleKeyPress}
									className="h-10 w-80 rounded-md focus:outline-0 bg-gray-100 placeholder-gray-500 text-sm border border-gray-200 px-4"
								/>
								<button
									type="button"
									onClick={handleSearch}
									className="ml-4 h-10 px-4 bg-yellow-400 hover:bg-yellow-500 text-black cursor-pointer rounded-md"
								>
									Search
								</button>
							</div>
						</div>
					</div>

					<div className="w-12" />
				</div>
			</div>
		</header>
	)
}

export default Navbar
