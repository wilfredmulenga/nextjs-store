import Link from 'next/link'
import {connect} from 'react-redux';
import {wrapper} from '../components/store';
import Navbar from '../components/Navbar'
import { convertPrice } from '../helpers'
import Typography from '@material-ui/core/Typography'

const Home = ({ posts, currencyRates, baseCurrency }) => {
  return <div>
    <Navbar/>
  {
    posts && posts.map((item) => {
      const { image: imageUrl, description, price, title, category, id } = item
      return (
        <Link key={id} href={`/product/${id}`}> 
        <div style={{ width: '400px' }}>
          <Typography variant="h5">{title}</Typography>
          <p>{convertPrice({price, currencyRates, baseCurrency})}</p>
          <img src={imageUrl} alt={title} style={{ width: '400px', height: '300px' }}/>
        </div>
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
