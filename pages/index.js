import Link from 'next/link'
import {connect} from 'react-redux';
import {wrapper} from '../components/store';
import Navbar from '../components/Navbar'
import ProductItem from '../components/ProductItem'
const Home = ({ posts, currencyRates, baseCurrency }) => {
  return <div>
    <Navbar/>
  {
    posts && posts.map((product) => {
      const { id } = product
      return (
        <Link key={id} href={`/product/${id}`} style={{ backgrounColor: 'red' }}> 
        <ProductItem productDetails={product} currencyRates={currencyRates} baseCurrency={baseCurrency} />
        </Link>
      )
    })
  }
</div>
}

export const getStaticProps = wrapper.getServerSideProps(
    async ({ store }) => {
 try {
  const res = await fetch('https://fakestoreapi.com/products?limit=10')
  const posts = await res.json()
  const fetchCurrencyRates = await fetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,GBP,JPY')
  const currencyRates  = await fetchCurrencyRates.json()
  store.dispatch({type: 'FETCH_POSTS', payload: posts });
  store.dispatch({ type: 'FETCH_CURRENCY_RATES', payload: currencyRates.rates })
 } catch (error) {
   console.log(error)
 }
    }
);

export default connect(state => state)(Home)
