import phoneImage from "@/assets/phone-mockup.png";
// import phoneImage from '../../public/thumbnail_Hero_Phone_screenshot_improved_shadow.png'
const PhoneShowcase = () => {
	return (
		<section className="relative py-20 lg:py-32 overflow-hidden section-dark">
			<div className="container mx-auto px-4 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Text Content */}
					<div className="order-2 lg:order-1">
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
							<span className="text-foreground">Your CFO</span>
							<br />
							<span className="gradient-text">at the touch</span>
							<br />
							<span className="text-foreground">of a button</span>
						</h2>
					</div>

					{/* Phone Image */}
					<div className="order-1 lg:order-2 flex justify-center w-full">
						<div className="relative w-full flex justify-center">
							<div className="absolute inset-0 blur-3xl bg-accent/20 rounded-full" />
							<img
								src={phoneImage}
								alt="Zentavos Mobile App"
								className="relative animate-float drop-shadow-2xl w-1/2"
							// style={{ width: '67%' }}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PhoneShowcase;
