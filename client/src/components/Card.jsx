import { useNavigate } from 'react-router-dom'

const Card = ({
	id,
	image,
	title = 'Nandi Hills Sunrise',
	location = 'Bangalore',
	description = 'Curated small-group experience. Certified guide. Safety first with gear included.',
	price = 899,
}) => {
	const navigate = useNavigate()

	const handleViewDetails = () => {
		navigate(`/details/${id}`)
	}

	return (
		<article className="max-w-xs bg-white rounded-2xl shadow-md overflow-hidden">
			{image ? (
				<img src={image} alt={title} className="w-full h-48 object-cover" />
					) : (
					<div className="w-full h-48 bg-linear-to-r from-yellow-200 via-orange-200 to-yellow-300" />
				)}

			<div className="p-4">
				<div className="flex items-start justify-between gap-4">
					<h3 className="text-lg font-semibold text-gray-800">{title}</h3>
					<span className="ml-auto inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-md">{location}</span>
				</div>

				<p className="mt-3 text-sm text-gray-500 leading-relaxed">{description}</p>

				<div className="mt-4 flex items-center justify-between">
					<div className='flex justify-center items-center gap-2'>
						<p className="text-xs text-gray-500">From</p>
						<p className="text-lg font-semibold text-gray-900">₹{price}</p>
					</div>

					<button
						onClick={handleViewDetails}
						className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm px-2.5 py-1 rounded-md shadow-sm"
					>
						View Details
					</button>
				</div>
			</div>
		</article>
	)
}

export default Card
