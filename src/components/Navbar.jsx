import React from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
	return (
		// outer dark frame to match screenshot
		<header className="w-full">
			<div className=" mx-auto bg-white shadow-sm border border-gray-300 px-6 py-3">
				<div className="flex items-center">
					{/* left logo */}
					<div className="shrink-0">
						<img src={logo} alt="logo" className="h-10" />
					</div>

					{/* center area: search box centered */}
					<div className="flex-1 flex justify-end">
						<div className="w-full max-w-xl">
							<label htmlFor="nav-search" className="sr-only">Search experiences</label>
							<div className="flex items-center justify-end">
								<input
									id="nav-search"
									type="search"
									placeholder="Search"
									aria-label="Search experiences"
									className="h-10 w-80 rounded-md focus:outline-0 bg-gray-100 placeholder-gray-500 text-sm border border-gray-200 px-4"
								/>
								<button
									type="button"
									className="ml-4 h-10 px-4 bg-yellow-400 hover:bg-yellow-500 text-black cursor-pointer rounded-md"
								>
									Search
								</button>
							</div>
						</div>
					</div>

					{/* right spacer (keeps logo and centered box layout consistent) */}
					<div className="w-12" />
				</div>
			</div>
		</header>
	)
}

export default Navbar
