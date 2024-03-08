import Carousel from "components/Carousel/Carousel"
import Layout from "components/Layout/Layout"

const Home = () => {
    return <Layout>
        <div>home</div>
        <br />
        <br />
        <br />
        <Carousel settings={{ arrows: true, dots: true, autoplay: true, autoplaySpeed: 3000, infinite: true, speed: 500 }}>
            <div ><h1 style={{ backgroundColor: 'aliceblue' }}>hello</h1></div>
            <div style={{ backgroundColor: 'green' }}><h1>hello2</h1></div>
            <div style={{ backgroundColor: 'aliceblue' }}><h1>hello3</h1></div>
        </Carousel>
    </Layout>
}

export default Home