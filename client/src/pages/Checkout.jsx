import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createBooking, validatePromo } from '../services/api'

function Checkout() {
	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [promo, setPromo] = useState('')
	const [discount, setDiscount] = useState(0)
	const [promoMessage, setPromoMessage] = useState('')
	const [touchedName, setTouchedName] = useState(false)
	const [touchedEmail, setTouchedEmail] = useState(false)
	const [agree, setAgree] = useState(false)
	const [loading, setLoading] = useState(false)
	const [bookingData, setBookingData] = useState(null)

	const navigate = useNavigate()

	useEffect(() => {
		const pending = localStorage.getItem('pendingBooking')
		if (!pending) {
			navigate('/')
			return
		}
		setBookingData(JSON.parse(pending))
	}, [navigate])

	const rawSubtotal = bookingData?.subtotal || 0
	const taxesRate = 0.06

	const subtotal = useMemo(() => Math.max(0, rawSubtotal - discount), [rawSubtotal, discount])
	const taxes = useMemo(() => Math.round(subtotal * taxesRate), [subtotal])
	const total = useMemo(() => subtotal + taxes, [subtotal, taxes])

	const nameValid = fullName.trim().length > 0
	const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	const isFormValid = nameValid && emailValid && agree

	const handleApplyPromo = async () => {
		if (!promo.trim()) {
			setPromoMessage('Please enter a promo code')
			return
		}

		try {
			const result = await validatePromo({
				code: promo.trim().toUpperCase(),
				subtotal: rawSubtotal,
			})

			if (result.success) {
				setDiscount(result.data.discount)
				setPromoMessage(`✅ Promo applied: -₹${result.data.discount}`)
			}
		} catch (error) {
			setPromoMessage(error.response?.data?.message || '❌ Invalid promo code')
			setDiscount(0)
		}
	}

	const handlePayAndConfirm = async () => {
		if (!isFormValid) {
			setTouchedName(true)
			setTouchedEmail(true)
			return
		}

		try {
			setLoading(true)

			const payload = {
				...bookingData,
				customerName: fullName,
				customerEmail: email,
				subtotal,
				discount,
				taxes,
				total,
				promoCode: promo.trim() || undefined,
			}

			const result = await createBooking(payload)

			if (result.success) {
				const confirmationData = {
					refId: result.data.refId,
					...payload,
				}
				localStorage.setItem('booking', JSON.stringify(confirmationData))
				localStorage.removeItem('pendingBooking')
				navigate('/confirmation', { state: confirmationData })
			}
		} catch (error) {
			alert(error.response?.data?.message || 'Booking failed. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	if (!bookingData) {
		return null
	}

	return (
		<main className="container mx-auto px-16 py-8">
			<div className="mb-6">
				<button onClick={() => navigate(-1)} className="text-sm font-bold cursor-pointer text-gray-600 flex items-center gap-2">← Checkout</button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<section className="lg:col-span-2">
					<div className="bg-gray-100 rounded-lg p-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm text-gray-700 mb-2">Full name</label>
												<input
													value={fullName}
													onChange={(e) => setFullName(e.target.value)}
													onBlur={() => setTouchedName(true)}
													placeholder="Your name"
													className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-200"
												/>
												{touchedName && !nameValid && (
													<p className="mt-1 text-xs text-red-600">Please enter your full name</p>
												)}
							</div>

							<div>
								<label className="block text-sm text-gray-700 mb-2">Email</label>
												<input
													value={email}
													onChange={(e) => setEmail(e.target.value)}
													onBlur={() => setTouchedEmail(true)}
													placeholder="Your email"
													className="w-full px-3 py-2 bg-white rounded-md text-sm border border-gray-200"
												/>
												{touchedEmail && !emailValid && (
													<p className="mt-1 text-xs text-red-600">Please enter a valid email address</p>
												)}
							</div>
						</div>

						<div className="mt-4">
							<label className="block text-sm text-gray-700 mb-2">Promo code</label>
							<div className="flex items-center gap-3">
								<input
									value={promo}
									onChange={(e) => setPromo(e.target.value)}
									placeholder="Promo code"
									className="flex-1 px-3 py-2 bg-white rounded-md text-sm border border-gray-200"
								/>
																<button
																	onClick={handleApplyPromo}
																	className="px-4 py-2 bg-gray-800 text-white text-sm rounded-md"
																>
																	Apply
																</button>
							</div>
															{promoMessage && <p className="mt-2 text-sm text-gray-600">{promoMessage}</p>}
														</div>

						<div className="mt-4">
							<label className="inline-flex items-center gap-2 text-sm text-gray-600">
								<input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="form-checkbox" />
								<span>I agree to the terms and safety policy</span>
							</label>
						</div>
					</div>
				</section>

				<aside className="lg:col-span-1">
					<div className="bg-gray-100 rounded-lg p-6">
						<div className="text-sm text-gray-600 mb-3 flex justify-between">
							<span>Experience</span>
							<span className="font-medium">{bookingData.experienceTitle}</span>
						</div>

						<div className="text-sm text-gray-600 mb-3 flex justify-between">
							<span>Date</span>
							<span>{bookingData.date}</span>
						</div>

						<div className="text-sm text-gray-600 mb-3 flex justify-between">
							<span>Time</span>
							<span>{bookingData.time}</span>
						</div>

						<div className="text-sm text-gray-600 mb-3 flex justify-between">
							<span>Qty</span>
							<span>{bookingData.quantity}</span>
						</div>

						<div className="text-sm text-gray-600 mb-2 flex justify-between">
							<span>Subtotal</span>
							<span>₹{rawSubtotal}</span>
						</div>

						{discount > 0 && (
							<div className="text-sm text-red-600 mb-2 flex justify-between">
								<span>Discount</span>
								<span>-₹{discount}</span>
							</div>
						)}

						<div className="text-sm text-gray-600 mb-4 flex justify-between">
							<span>Taxes</span>
							<span>₹{taxes}</span>
						</div>

						<div className="flex items-center justify-between font-semibold text-gray-900 mb-4">
							<span>Total</span>
							<span>₹{total}</span>
						</div>

												<button
													disabled={!isFormValid || loading}
													onClick={handlePayAndConfirm}
													className={`w-full py-2 rounded-md font-medium ${isFormValid && !loading ? 'bg-yellow-400 hover:bg-yellow-500 text-black' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
												>
													{loading ? 'Processing...' : 'Pay and Confirm'}
												</button>
					</div>
				</aside>
			</div>
		</main>
	)
}

export default Checkout

