import Hero from "./Hero";
import BestProducts from "./BestProducts";
import Blogs from "./Blogs";
import Brends from "./Brends";
function HomePage({ products }) {
	console.log(products);
	return (
		<>
			<Hero />
			<BestProducts products={products} />
			<Blogs products={products} />
			<Brends />
		</>
	);
}
export default HomePage;
