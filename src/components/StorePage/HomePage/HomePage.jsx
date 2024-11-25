import Hero from "./Hero";
import Content from './Content'
import ListProduct from "./ListProduct";
import PromotionList from "./PromotionList";
// import { React } from 'react'
import Footer from "./Footer/Footer";


function HomePage() {

    return (
        <div className="bg-white">
            <Hero />
            <Content />
            <ListProduct />
            {/* <AlertSection /> */}
            <PromotionList />
            <Footer />
        </div>


    );
}

export default HomePage;